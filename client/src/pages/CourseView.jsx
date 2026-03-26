import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
          className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h1 className="text-4xl font-outfit font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{course.description}</p>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="px-3 py-1 bg-accent text-bg-primary rounded-full font-semibold">
              {course.level}
            </span>
            <span className="text-gray-600">{course.totalWeeks} weeks</span>
            <span className="text-gray-600">{course.hoursPerDay}h/day</span>
            <span className="text-indigo-600 font-semibold">{course.progress}% Complete</span>
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
