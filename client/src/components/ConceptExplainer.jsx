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
            <BookOpen className="text-indigo-600" size={32} />
          </motion.div>
          <h2 className="text-4xl font-outfit font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            {topic.name}
          </h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleBookmark} 
          className="text-indigo-600 hover:text-indigo-600-hover transition-colors"
        >
          <Star size={28} fill={bookmarked ? 'currentColor' : 'none'} />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="markdown-content mb-8 p-8 bg-white rounded-2xl shadow-sm"
      >
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => (
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-6 text-gray-900 border-b-2 border-accent pb-3" 
                {...props} 
              />
            ),
            h2: ({node, ...props}) => (
              <motion.h2 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-semibold mb-4 mt-8 text-gray-800" 
                {...props} 
              />
            ),
            h3: ({node, ...props}) => (
              <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-700" {...props} />
            ),
            p: ({node, ...props}) => (
              <p className="mb-4 text-gray-600 leading-relaxed text-lg" {...props} />
            ),
            ul: ({node, ...props}) => (
              <ul className="list-disc list-inside mb-6 space-y-2 text-gray-600" {...props} />
            ),
            ol: ({node, ...props}) => (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-600" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="ml-4 leading-relaxed" {...props} />
            ),
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className="bg-indigo-50 px-2 py-1 rounded text-indigo-600 font-mono text-sm" {...props} />
                : <code className="block bg-gradient-to-br from-gray-600 to-gray-500 text-white p-6 rounded-xl overflow-x-auto font-mono text-sm mb-6 shadow-inner" {...props} />,
            pre: ({node, ...props}) => (
              <pre className="bg-gradient-to-br from-gray-600 to-gray-500 p-6 rounded-xl overflow-x-auto mb-6 shadow-lg" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-gray-600 mb-6 bg-indigo-50 rounded-r-lg" {...props} />
            ),
            a: ({node, ...props}) => (
              <a className="text-indigo-600 hover:text-indigo-600-hover underline transition-colors" {...props} />
            ),
            strong: ({node, ...props}) => (
              <strong className="font-semibold text-gray-900" {...props} />
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
        className="bg-white rounded-2xl shadow-sm p-6 mb-8"
      >
        <h3 className="text-2xl font-outfit font-semibold mb-4 text-gray-800 flex items-center">
          <span className="mr-2">📝</span> My Notes
        </h3>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
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
          className="btn-secondary"
        >
          ← Back to Roadmap
        </motion.button>
        <div className="space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuiz(true)} 
            className="btn-primary"
          >
            Take Quiz →
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext} 
            className="btn-secondary"
          >
            Next Concept →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConceptExplainer;
