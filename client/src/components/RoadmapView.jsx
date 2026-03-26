import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const RoadmapView = ({ modules, onTopicClick }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-[#10B981]" size={24} />;
      case 'in_progress':
        return <Clock className="text-[#F59E0B]" size={24} />;
      default:
        return <Circle className="text-[#94A3B8]" size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-[#10B981]';
      case 'in_progress':
        return 'border-[#F59E0B]';
      default:
        return 'border-[#E2E8F0]';
    }
  };

  return (
    <div className="space-y-8">
      {modules.map((module, moduleIdx) => (
        <RevealOnScroll key={moduleIdx} direction="left" delay={moduleIdx * 0.1}>
          <div className="relative pl-8 border-l-2 border-[#E2E8F0] pb-8 last:pb-0">
             <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#E2E8F0] border-4 border-[#F8FAFC]" />
            <h3 className="text-2xl font-outfit font-bold mb-6 text-[#0F172A]">
              Week {module.week}: <span className="text-[#F59E0B]">{module.title}</span>
            </h3>
            
            <div className="space-y-4">
              {module.topics.map((topic, topicIdx) => (
                <RevealOnScroll key={topic.id} direction="right" delay={topicIdx * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.01, x: 5 }}
                    className={`bg-white rounded-2xl border border-[#E2E8F0] p-5 cursor-pointer border-l-4 ${getStatusColor(topic.status)} hover:shadow-md transition-all duration-300 group`}
                    onClick={() => onTopicClick(topic)}
                  >
                    <div className="flex items-start space-x-5">
                      <div className="mt-1">{getStatusIcon(topic.status)}</div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-[#0F172A] group-hover:text-[#F59E0B] transition-colors">{topic.name}</h4>
                        <p className="text-[#475569] text-sm mt-2 leading-relaxed">{topic.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-4 text-xs font-bold uppercase tracking-widest">
                          <span className="px-3 py-1 bg-[#F1F5F9] rounded-lg text-[#F59E0B] border border-[#E2E8F0]">
                            {topic.difficulty}
                          </span>
                          <span className="text-[#475569] flex items-center">
                            <Clock size={14} className="mr-1" /> {topic.estimatedHours} Hours
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
