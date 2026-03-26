import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      className="bg-[#161F32] border border-[#1E293B] rounded-2xl p-6 hover:border-[#F59E0B]/30 transition-all duration-300"
    >
      <h3 className="text-xl font-outfit font-bold mb-2 text-[#F9FAFB]">{course.title}</h3>
      <p className="text-[#D1D5DB] text-sm mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
      
      <div className="flex items-center space-x-4 text-sm text-[#D1D5DB] mb-6">
        <div className="flex items-center space-x-1.5">
          <Clock size={16} className="text-[#F59E0B]" />
          <span>{course.totalWeeks} weeks</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <TrendingUp size={16} className="text-[#F59E0B]" />
          <span className="capitalize">{course.level}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#D1D5DB]">Progress</span>
          <span className="text-[#F59E0B] font-bold">{course.progress}%</span>
        </div>
        <div className="w-full bg-[#0A1122] rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <Link to={`/course/${course._id}`} className="w-full block bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] py-3 rounded-xl font-bold transition-all duration-300 text-center shadow-lg">
        Open Course
      </Link>
    </motion.div>
  );
};

export default CourseCard;
