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
      className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#F59E0B]/30 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <h3 className="text-xl font-outfit font-bold mb-2 text-[#0F172A]">{course.title}</h3>
      <p className="text-[#475569] text-sm mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
      
      <div className="flex items-center space-x-4 text-sm text-[#475569] mb-6">
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
          <span className="text-[#475569]">Progress</span>
          <span className="text-[#F59E0B] font-bold">{course.progress}%</span>
        </div>
        <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <Link to={`/course/${course._id}`} className="w-full block bg-[#F59E0B] hover:bg-[#D97706] text-white py-3 rounded-xl font-bold transition-all duration-300 text-center shadow-lg">
        Open Course
      </Link>
    </motion.div>
  );
};

export default CourseCard;
