import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import SmoothLoader from '../components/SmoothLoader';
import RevealOnScroll from '../components/RevealOnScroll';
import FloatingParticles from '../components/FloatingParticles';

const CourseBuilder = () => {
  const [topic, setTopic] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [totalWeeks, setTotalWeeks] = useState(4);
  const [level, setLevel] = useState('beginner');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic || !goal) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data: roadmap } = await api.post('/ai/roadmap', {
        topic,
        hoursPerDay,
        totalWeeks,
        level,
        goal
      });

      const { data: course } = await api.post('/course', {
        title: roadmap.title,
        topic,
        description: roadmap.description,
        level,
        goal,
        totalWeeks: roadmap.totalWeeks,
        hoursPerDay,
        modules: roadmap.modules
      });

      toast.success('Course created successfully!');
      navigate(`/course/${course._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 relative">
      <FloatingParticles count={15} />
      <RevealOnScroll direction="scale">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <RevealOnScroll direction="down" delay={0.2}>
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="text-indigo-600" size={32} />
              <h1 className="text-3xl font-outfit font-bold">Build Your Learning Path</h1>
            </div>
          </RevealOnScroll>

          <form onSubmit={handleSubmit} className="space-y-6">
            <RevealOnScroll direction="left" delay={0.3}>
              <div>
                <label className="block text-lg font-medium mb-2">What do you want to learn?</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Machine Learning, Web Development, Python"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-lg"
                  required
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.4}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium mb-2">Hours per day</label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    min="1"
                    max="12"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">Total weeks</label>
                  <input
                    type="number"
                    value={totalWeeks}
                    onChange={(e) => setTotalWeeks(Number(e.target.value))}
                    min="1"
                    max="52"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-lg"
                    required
                  />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.5}>
              <div>
                <label className="block text-lg font-medium mb-2">Skill Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['beginner', 'intermediate', 'advanced'].map(lvl => (
                    <motion.button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-3 rounded-lg font-semibold transition ${
                        level === lvl
                          ? 'bg-accent text-bg-primary'
                          : 'bg-white border border-gray-200 hover:border-accent'
                      }`}
                    >
                      {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={0.6}>
              <div>
                <label className="block text-lg font-medium mb-2">What's your goal?</label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Get a job as a developer, Build a personal project, Pass a certification"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-lg min-h-[100px]"
                  required
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="scale" delay={0.7}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <SmoothLoader size="sm" />
                    <span>Generating Your Roadmap...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles size={24} />
                    <span>Generate Roadmap</span>
                  </>
                )}
              </button>
            </RevealOnScroll>
          </form>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default CourseBuilder;
