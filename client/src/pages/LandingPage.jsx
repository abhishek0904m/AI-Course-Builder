import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Target, Zap, Youtube } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import ParallaxSection from '../components/ParallaxSection';
import FloatingParticles from '../components/FloatingParticles';

const LandingPage = () => {
  const features = [
    { icon: Brain, title: 'AI Roadmap Generator', desc: 'Get personalized learning paths' },
    { icon: Target, title: 'Concept Teaching', desc: 'Master topics step by step' },
    { icon: Zap, title: 'Smart Quizzes', desc: 'Test your knowledge' },
    { icon: Youtube, title: 'Video Resources', desc: 'Curated YouTube content' }
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingParticles count={30} />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
        >
          Learn Anything with{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Power
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Create personalized learning roadmaps, get AI explanations, and track your progress
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/register" className="btn-primary">
            Get Started Free
          </Link>
          <Link to="#features" className="btn-secondary">
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <RevealOnScroll direction="up">
          <h2 className="text-4xl font-outfit font-bold text-center mb-12 text-gray-900">
            Features
          </h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={idx * 0.1}>
              <div className="glass-card p-6 text-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="text-white" size={24} />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <ParallaxSection speed={-0.3}>
        <section className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
          <RevealOnScroll direction="scale">
            <h2 className="text-4xl font-outfit font-bold text-center mb-12 text-gray-900">
              How It <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Topic', desc: 'Tell us what you want to learn' },
              { step: '2', title: 'Get Roadmap', desc: 'AI generates your learning path' },
              { step: '3', title: 'Learn & Quiz', desc: 'Study and track your progress' }
            ].map((item, idx) => (
              <RevealOnScroll key={idx} direction="up" delay={idx * 0.2}>
                <div className="text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-outfit font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p className="text-xl font-outfit font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Course Builder
          </p>
          <p>&copy; 2026 AI Course Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
