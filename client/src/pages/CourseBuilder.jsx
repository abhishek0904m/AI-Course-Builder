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
        <div className="bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-10 backdrop-blur-xl">
          <RevealOnScroll direction="down" delay={0.2}>
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-14 h-14 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="text-[#F59E0B]" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-outfit font-bold text-[#0F172A]">Forge Learning Path</h1>
                <p className="text-[#475569]">Let AI architect your mastery journey</p>
              </div>
            </div>
          </RevealOnScroll>

          <form onSubmit={handleSubmit} className="space-y-6">
            <RevealOnScroll direction="left" delay={0.3}>
              <div>
                <label className="block text-lg font-medium mb-3 text-[#0F172A]">What is your destination?</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quantum Computing, Neural Networks, Advanced UI Design"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-lg text-[#0F172A] placeholder-[#9CA3AF] transition-all"
                  required
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.4}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-3 text-[#0F172A]">Intensity (Hrs/Day)</label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    min="1"
                    max="12"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-lg text-[#0F172A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3 text-[#0F172A]">Duration (Weeks)</label>
                  <input
                    type="number"
                    value={totalWeeks}
                    onChange={(e) => setTotalWeeks(Number(e.target.value))}
                    min="1"
                    max="52"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-lg text-[#0F172A]"
                    required
                  />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.5}>
              <div>
                <label className="block text-lg font-medium mb-3 text-[#0F172A]">Mastery Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['beginner', 'intermediate', 'advanced'].map(lvl => (
                    <motion.button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-4 rounded-xl font-bold transition-all duration-300 ${
                        level === lvl
                          ? 'bg-[#F59E0B] text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#F59E0B]/50'
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
                <label className="block text-lg font-medium mb-3 text-[#0F172A]">What is your primary goal?</label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Become a Senior Architect, Build a billion-dollar startup core, Master the fundamentals"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-lg text-[#0F172A] placeholder-[#9CA3AF] min-h-[120px]"
                  required
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="scale" delay={0.7}>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white text-xl py-5 rounded-2xl font-black transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] disabled:opacity-50 flex items-center justify-center space-x-3 group"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <SmoothLoader size="sm" />
                    <span className="animate-pulse">Architecting Your Journey...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
                    <span>GENERATE PATH</span>
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
