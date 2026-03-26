import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import RevealOnScroll from '../components/RevealOnScroll';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-outfit font-black text-[#0F172A] mb-2 tracking-tight">Login</h2>
          <p className="text-[#475569] font-medium uppercase tracking-[0.2em] text-xs">Return to the Codex</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#0F172A] placeholder-[#9CA3AF]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#475569]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#0F172A] placeholder-[#9CA3AF]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? 'Entering Presence...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="#" className="text-[#F59E0B] hover:text-[#D97706] text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-center text-[#475569]">
          New here?{' '}
          <Link to="/register" className="text-[#F59E0B] hover:text-[#D97706] font-medium hover:underline">
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
