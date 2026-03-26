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
      <RevealOnScroll direction="scale">
        <div className="bg-[#161F32] border border-[#1E293B] rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-xl">
        <h2 className="text-3xl font-outfit font-bold text-center mb-8 text-[#F9FAFB]">
          Welcome <span className="text-[#F59E0B]">Back</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#D1D5DB]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#D1D5DB]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A1122] border border-[#1E293B] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#F9FAFB] placeholder-[#9CA3AF]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0A1122] py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50"
          >
            {loading ? 'Entering Presence...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="#" className="text-[#F59E0B] hover:text-[#D97706] text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-center text-[#D1D5DB]">
          New here?{' '}
          <Link to="/register" className="text-[#F59E0B] hover:text-[#D97706] font-medium hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
      </RevealOnScroll>
    </div>
  );
};

export default Login;
