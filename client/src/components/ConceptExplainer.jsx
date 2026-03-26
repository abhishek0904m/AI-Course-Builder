import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, BookOpen, Star } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import YouTubeReferences from './YouTubeReferences';
import QuizSection from './QuizSection';

const ConceptExplainer = ({ course, topic, onBack, onNext, onUpdate }) => {
  const [explanation, setExplanation] = useState(topic.explanation || '');
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [notes, setNotes] = useState(topic.notes || '');
  const [bookmarked, setBookmarked] = useState(topic.bookmarked || false);

  useEffect(() => {
    if (!topic.explanation) {
      fetchExplanation();
    }
  }, [topic.id]);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/explain', {
        topic: course.topic,
        conceptName: topic.name,
        level: course.level
      });
      setExplanation(data.explanation);
      
      await api.put(`/course/${course._id}/topic`, {
        courseId: course._id,
        topicId: topic.id,
        explanation: data.explanation,
        status: 'in_progress'
      });
      
      onUpdate();
    } catch (error) {
      toast.error('Failed to load explanation');
    } finally {
      setLoading(false);
    }
  };

  const handleNotesChange = async (value) => {
    setNotes(value);
    
    clearTimeout(window.notesTimeout);
    window.notesTimeout = setTimeout(async () => {
      try {
        await api.put(`/course/${course._id}/topic`, {
          courseId: course._id,
          topicId: topic.id,
          notes: value
        });
        toast.success('Notes saved');
      } catch (error) {
        toast.error('Failed to save notes');
      }
    }, 2000);
  };

  const toggleBookmark = async () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    
    try {
      await api.put(`/course/${course._id}/topic`, {
        courseId: course._id,
        topicId: topic.id,
        bookmarked: newBookmarked
      });
      toast.success(newBookmarked ? 'Bookmarked' : 'Removed bookmark');
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  if (showQuiz) {
    return (
      <QuizSection
        course={course}
        topic={topic}
        onBack={() => setShowQuiz(false)}
        onComplete={onNext}
        onUpdate={onUpdate}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen className="text-[#F59E0B]" size={32} />
          </motion.div>
          <h2 className="text-4xl font-outfit font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
            {topic.name}
          </h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleBookmark} 
          className="text-[#F59E0B] hover:text-[#D97706] transition-colors"
        >
          <Star size={28} fill={bookmarked ? 'currentColor' : 'none'} />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="markdown-content mb-8 p-10 bg-white border border-[#E2E8F0] rounded-3xl shadow-sm"
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => (
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-8 text-[#0F172A] border-b border-[#E2E8F0] pb-4" 
                {...props} 
              />
            ),
            h2: ({node, ...props}) => (
              <motion.h2 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold mb-6 mt-10 text-[#0F172A] flex items-center" 
                {...props} 
              />
            ),
            h3: ({node, ...props}) => (
               <h3 className="text-2xl font-bold mb-4 mt-8 text-[#0F172A]" {...props} />
            ),
            p: ({node, ...props}) => (
               <p className="mb-6 text-[#475569] leading-relaxed text-lg" {...props} />
            ),
            ul: ({node, ...props}) => (
               <ul className="list-disc list-inside mb-8 space-y-3 text-[#475569]" {...props} />
            ),
            ol: ({node, ...props}) => (
               <ol className="list-decimal list-inside mb-8 space-y-3 text-[#475569]" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="ml-4 leading-relaxed" {...props} />
            ),
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className="bg-[#F1F5F9] px-2 py-1 rounded text-[#F59E0B] font-mono text-sm border border-[#E2E8F0]" {...props} />
                : <div className="relative group my-8">
                    <pre className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 rounded-2xl overflow-x-auto font-mono text-sm shadow-inner text-[#0F172A]" {...props} />
                  </div>,
            pre: ({node, ...props}) => (
              <pre className="bg-[#F1F5F9] border border-[#E2E8F0] p-6 rounded-2xl overflow-x-auto mb-8 shadow-inner text-[#0F172A]" {...props} />
            ),
            blockquote: ({node, ...props}) => (
               <blockquote className="border-l-4 border-[#F59E0B] pl-8 py-4 italic text-[#475569] mb-8 bg-[#F8FAFC] rounded-r-2xl" {...props} />
            ),
            a: ({node, ...props}) => (
              <a className="text-[#F59E0B] hover:text-[#D97706] underline transition-colors" {...props} />
            ),
            strong: ({node, ...props}) => (
               <strong className="font-bold text-[#0F172A]" {...props} />
            ),
            hr: ({node, ...props}) => (
              <hr className="border-gray-200 my-8" {...props} />
            ),
          }}
        >
          {explanation}
        </ReactMarkdown>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-8 mb-8"
      >
        <h3 className="text-2xl font-outfit font-bold mb-6 text-[#0F172A] flex items-center">
          <span className="mr-3">📝</span> Personal Codex
        </h3>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Jot down your insights..."
          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 text-[#0F172A] min-h-[180px] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all placeholder-[#94A3B8]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <YouTubeReferences course={course} topic={topic} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between mt-8"
      >
        <motion.button 
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack} 
          className="px-8 py-3 bg-white border border-[#E2E8F0] text-[#475569] rounded-xl font-bold hover:text-[#0F172A] hover:border-[#F59E0B]/50 transition-all shadow-sm"
        >
          ← Roadmap
        </motion.button>
        <div className="space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuiz(true)} 
            className="px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-xl font-bold shadow-lg transition-all"
          >
            Initiate Quiz →
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext} 
            className="px-8 py-3 bg-white border border-[#E2E8F0] text-[#F59E0B] rounded-xl font-bold hover:bg-[#F59E0B]/5 hover:border-[#F59E0B] transition-all shadow-sm"
          >
            Advance →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConceptExplainer;
