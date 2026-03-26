// Sidebar component - can be used for future features like AI chat assistant
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 z-50 overflow-y-auto"
      >
        {children}
      </motion.div>
    </>
  );
};

export default Sidebar;
