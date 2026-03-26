import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2 group">
            <span className="text-2xl font-outfit font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              AI Course Builder
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-[#475569] hover:text-[#F59E0B] transition-colors duration-300 font-medium">
                  Dashboard
                </Link>
                <Link to="/build" className="text-[#475569] hover:text-[#F59E0B] transition-colors duration-300 font-medium">
                  Build Course
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 text-[#475569] hover:text-[#F59E0B] transition-colors duration-300 font-medium">
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-[#475569] hover:text-[#FB7185] transition-colors duration-300">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#475569] hover:text-[#F59E0B] transition-colors duration-300 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 shadow-lg">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
