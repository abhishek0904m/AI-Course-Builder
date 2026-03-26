// Progress Tracker component
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const ProgressTracker = ({ modules }) => {
  const totalTopics = modules.reduce((acc, mod) => acc + mod.topics.length, 0);
  const completedTopics = modules.reduce((acc, mod) => {
    return acc + mod.topics.filter(t => t.status === 'completed').length;
  }, 0);
  const progress = Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-outfit font-semibold mb-4">Progress Overview</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Overall Progress</span>
          <span className="text-indigo-600 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-3">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-accent h-3 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Topics</span>
          <span className="font-semibold">{totalTopics}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Completed</span>
          <span className="font-semibold text-success">{completedTopics}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Remaining</span>
          <span className="font-semibold">{totalTopics - completedTopics}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
