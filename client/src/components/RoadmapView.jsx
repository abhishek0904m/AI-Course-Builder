import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const RoadmapView = ({ modules, onTopicClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-success" size={24} />;
      case 'in_progress':
        return <Clock className="text-indigo-600" size={24} />;
      default:
        return <Circle className="text-gray-600" size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success';
      case 'in_progress':
        return 'border-accent';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {modules.map((module, moduleIdx) => (
        <RevealOnScroll key={moduleIdx} direction="left" delay={moduleIdx * 0.1}>
          <div>
            <h3 className="text-xl font-outfit font-semibold mb-4">
              Week {module.week}: {module.title}
            </h3>
            
            <div className="space-y-4">
              {module.topics.map((topic, topicIdx) => (
                <RevealOnScroll key={topic.id} direction="right" delay={topicIdx * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`bg-white rounded-2xl shadow-md p-4 cursor-pointer border-l-4 ${getStatusColor(topic.status)} card-3d`}
                    onClick={() => onTopicClick(topic)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{getStatusIcon(topic.status)}</div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{topic.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{topic.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-3 text-sm">
                          <span className="px-2 py-1 bg-white-hover rounded text-indigo-600">
                            {topic.difficulty}
                          </span>
                          <span className="text-gray-600">
                            {topic.estimatedHours}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
};

export default RoadmapView;
