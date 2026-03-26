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
          className="text-5xl lg:text-7xl font-bold mb-6 text-[#F9FAFB] tracking-tight"
        >
          Learn Anything with{' '}
          <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
            AI Precision
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Generate comprehensive learning roadmaps, deep-dive into concepts with multi-model AI, and track your expertise journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link to="/register" className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:-translate-y-1">
            Build Your First Course
          </Link>
          <Link to="#features" className="border-2 border-[#1E293B] hover:border-[#F59E0B] text-[#F9FAFB] hover:text-[#F59E0B] px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1">
            See Features
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <RevealOnScroll direction="up">
          <h2 className="text-4xl font-outfit font-bold text-center mb-12 text-[#F9FAFB]">
            Platform <span className="text-[#F59E0B]">Capabilities</span>
          </h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={idx * 0.1}>
              <div className="bg-[#161F32]/50 backdrop-blur-lg border border-[#1E293B] p-8 rounded-2xl hover:border-[#F59E0B]/30 transition-all duration-300 group">
                <motion.div 
                   whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#1E293B] to-[#0A1122] border border-[#1E293B] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                >
                  <feature.icon className="text-[#F59E0B]" size={28} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-[#F9FAFB]">{feature.title}</h3>
                <p className="text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <ParallaxSection speed={-0.3}>
        <section className="max-w-7xl mx-auto px-4 py-20 bg-[#161F32]/30 border border-[#1E293B]/50 rounded-3xl">
          <RevealOnScroll direction="scale">
            <h2 className="text-4xl font-outfit font-bold text-center mb-12 text-[#F9FAFB]">
              How It <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">Works</span>
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
                    className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-[#0A1122] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-outfit font-semibold mb-3 text-[#F9FAFB]">{item.title}</h3>
                  <p className="text-[#9CA3AF]">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-[#9CA3AF]">
          <p className="text-2xl font-outfit font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent mb-4">
            AI Course Builder
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/login" className="hover:text-[#F59E0B] transition-colors">Login</Link>
            <Link to="/register" className="hover:text-[#F59E0B] transition-colors">Register</Link>
            <Link to="/dashboard" className="hover:text-[#F59E0B] transition-colors">Dashboard</Link>
          </div>
          <p>&copy; 2026 AI Course Builder. Crafted for excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
