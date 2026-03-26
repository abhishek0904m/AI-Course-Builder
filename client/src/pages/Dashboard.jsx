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
        <div className="glass-card p-6 mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2 text-gray-900">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
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
            <div className="glass-card p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Quick Actions */}
      <RevealOnScroll direction="up">
        <div className="glass-card p-6 mb-8">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>
            <Link to="/build" className="btn-primary flex items-center space-x-2">
              <Plus size={20} />
              <span>New Course</span>
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      {/* My Courses */}
      <div className="mb-8">
        <RevealOnScroll direction="right">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-outfit font-bold">My Courses</h2>
            
            <div className="flex space-x-2">
              {['all', 'in_progress', 'completed', 'not_started'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === f ? 'bg-accent text-bg-primary' : 'bg-white text-gray-600 hover:bg-white-hover'
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
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No courses yet. Start your learning journey!</p>
              <Link to="/build" className="btn-primary inline-block">
                Create Your First Course
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
