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
      className="bg-white rounded-2xl shadow-md p-6 card-3d"
    >
      <h3 className="text-xl font-outfit font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{course.totalWeeks} weeks</span>
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp size={16} />
          <span className="capitalize">{course.level}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="text-indigo-600 font-semibold">{course.progress}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <Link to={`/course/${course._id}`} className="btn-primary w-full block text-center">
        Continue Learning
      </Link>
    </motion.div>
  );
};

export default CourseCard;
