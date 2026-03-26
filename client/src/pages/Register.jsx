import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import RevealOnScroll from '../components/RevealOnScroll';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-10 relative z-10 my-8"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-outfit font-black text-[#0F172A] mb-2 tracking-tight">Register</h2>
          <p className="text-[#475569] font-medium uppercase tracking-[0.2em] text-xs">Begin Your Ascension</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#6B7280]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#6B7280]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Choose Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#6B7280]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#6B7280]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50"
          >
            {loading ? 'Forging Profile...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-[#475569]">
          Already an initiate?{' '}
          <Link to="/login" className="text-[#F59E0B] hover:text-[#D97706] font-medium hover:underline">
            Login
          </Link>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
