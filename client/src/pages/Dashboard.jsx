import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, Target, Flame, Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import SmoothLoader from '../components/SmoothLoader';
import RevealOnScroll from '../components/RevealOnScroll';
import FloatingParticles from '../components/FloatingParticles';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/course');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalCourses: courses.length,
    conceptsCompleted: courses.reduce((acc, course) => {
      return acc + course.modules.reduce((sum, mod) => {
        return sum + mod.topics.filter(t => t.status === 'completed').length;
      }, 0);
    }, 0),
    quizzesTaken: 0,
    streak: user?.streak || 0
  };

  const filteredCourses = courses
    .filter(course => {
      if (filter === 'in_progress') return course.progress > 0 && course.progress < 100;
      if (filter === 'completed') return course.progress === 100;
      if (filter === 'not_started') return course.progress === 0;
      return true;
    })
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmoothLoader size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <FloatingParticles count={30} />
      {/* Welcome Banner */}
      <RevealOnScroll direction="down">
        <div className="bg-[#161F32] border border-[#1E293B] p-8 rounded-2xl mb-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-outfit font-bold mb-2 text-[#F9FAFB]">
            Welcome back, <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-[#D1D5DB]">Continue your elite learning journey</p>
        </div>
      </RevealOnScroll>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: BookOpen, label: 'Courses', value: stats.totalCourses, color: 'from-indigo-500 to-purple-500' },
          { icon: Target, label: 'Completed', value: stats.conceptsCompleted, color: 'from-green-500 to-emerald-500' },
          { icon: Award, label: 'Quizzes', value: stats.quizzesTaken, color: 'from-yellow-500 to-orange-500' },
          { icon: Flame, label: 'Streak', value: `${stats.streak}d`, color: 'from-red-500 to-pink-500' }
        ].map((stat, idx) => (
          <RevealOnScroll key={idx} direction="scale" delay={idx * 0.1}>
            <div className="bg-[#161F32] border border-[#1E293B] p-6 rounded-2xl text-center hover:border-[#F59E0B]/30 transition-all duration-300 group">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <p className="text-2xl font-bold text-[#F9FAFB]">{stat.value}</p>
              <p className="text-[#D1D5DB] text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Quick Actions */}
      <RevealOnScroll direction="up">
        <div className="bg-[#161F32] border border-[#1E293B] p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A1122] border border-[#1E293B] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-[#F9FAFB] placeholder-[#9CA3AF]"
              />
            </div>
            <Link to="/build" className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg">
              <Plus size={20} />
              <span>Create New Course</span>
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      {/* My Courses */}
      <div className="mb-8">
        <RevealOnScroll direction="right">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <h2 className="text-3xl font-outfit font-bold text-[#F9FAFB]">My Courses</h2>
            
            <div className="flex flex-wrap justify-center gap-2">
              {['all', 'in_progress', 'completed', 'not_started'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    filter === f 
                      ? 'bg-[#F59E0B] text-[#0A1122] shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                      : 'bg-[#161F32] text-[#9CA3AF] border border-[#1E293B] hover:border-[#F59E0B]/50'
                  }`}
                >
                  {f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {filteredCourses.length === 0 ? (
          <RevealOnScroll direction="scale">
            <div className="bg-[#161F32] border border-[#1E293B] rounded-2xl p-16 text-center border-dashed">
              <div className="w-20 h-20 bg-[#0A1122] rounded-full flex items-center justify-center mx-auto mb-6">
                 <Plus className="text-[#F59E0B]" size={32} />
              </div>
              <p className="text-[#D1D5DB] text-xl mb-8">Your journey is waiting to begin.</p>
              <Link to="/build" className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg">
                Forge Your First Path
              </Link>
            </div>
          </RevealOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, idx) => (
              <RevealOnScroll key={course._id} direction="up" delay={idx * 0.1}>
                <CourseCard course={course} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
