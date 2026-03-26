import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import RoadmapView from '../components/RoadmapView';
import ConceptExplainer from '../components/ConceptExplainer';
import SmoothLoader from '../components/SmoothLoader';

const CourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [view, setView] = useState('roadmap');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/course/${id}`);
      setCourse(data);
    } catch (error) {
      toast.error('Failed to load course');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setView('concept');
  };

  const handleBack = () => {
    setView('roadmap');
    setSelectedTopic(null);
  };

  const handleNext = () => {
    if (!course) return;
    
    let found = false;
    let nextTopic = null;

    for (const module of course.modules) {
      for (const topic of module.topics) {
        if (found) {
          nextTopic = topic;
          break;
        }
        if (topic.id === selectedTopic.id) {
          found = true;
        }
      }
      if (nextTopic) break;
    }

    if (nextTopic) {
      setSelectedTopic(nextTopic);
    } else {
      toast.success('Course completed! 🎉');
      setView('roadmap');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmoothLoader size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-[#475569] hover:text-[#F59E0B] transition-all mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Return to Hall</span>
        </button>

        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-10 mb-10 shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
          
          <h1 className="text-4xl font-outfit font-black mb-4 text-[#0F172A] leading-tight">{course.title}</h1>
          <p className="text-[#475569] text-xl mb-8 leading-relaxed max-w-4xl">{course.description}</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <span className="px-4 py-1.5 bg-[#F59E0B] text-white rounded-full font-black text-sm uppercase tracking-tighter shadow-lg">
              {course.level}
            </span>
            <div className="flex items-center space-x-2 text-[#475569] font-bold text-sm">
              <Clock size={18} className="text-[#F59E0B]" />
              <span>{course.totalWeeks} WEEKS</span>
            </div>
            <div className="h-4 w-[1px] bg-[#E2E8F0]" />
            <div className="flex items-center space-x-2 text-[#F59E0B] font-black text-sm">
              <span>{course.progress}% ASCENDED</span>
            </div>
          </div>
        </div>

        {view === 'roadmap' ? (
          <RoadmapView modules={course.modules} onTopicClick={handleTopicClick} />
        ) : (
          <ConceptExplainer
            course={course}
            topic={selectedTopic}
            onBack={handleBack}
            onNext={handleNext}
            onUpdate={fetchCourse}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CourseView;
