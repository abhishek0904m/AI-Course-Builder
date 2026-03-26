import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Flame } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import FloatingParticles from '../components/FloatingParticles';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      <FloatingParticles count={12} />
      <RevealOnScroll direction="scale">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-outfit font-bold mb-8">Profile</h1>

          <div className="space-y-6">
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-3xl font-bold text-bg-primary"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-600">Learner</p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <RevealOnScroll direction="up" delay={0.3}>
                <div className="bg-white-hover p-6 rounded-lg card-3d">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="text-indigo-600" size={24} />
                    <span className="text-gray-600">Email</span>
                  </div>
                  <p className="text-lg">{user?.email}</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.4}>
                <div className="bg-white-hover p-6 rounded-lg card-3d">
                  <div className="flex items-center space-x-3 mb-2">
                    <Flame className="text-error" size={24} />
                    <span className="text-gray-600">Streak</span>
                  </div>
                  <p className="text-lg">{user?.streak || 0} days</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.5}>
                <div className="bg-white-hover p-6 rounded-lg card-3d">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="text-indigo-600" size={24} />
                    <span className="text-gray-600">Member Since</span>
                  </div>
                  <p className="text-lg">
                    {new Date(user?.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.6}>
                <div className="bg-white-hover p-6 rounded-lg card-3d">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="text-indigo-600" size={24} />
                    <span className="text-gray-600">Account Type</span>
                  </div>
                  <p className="text-lg">Free</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default Profile;
