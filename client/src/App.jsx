import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollProgress from './components/ScrollProgress';
import AnimatedBackground from './components/AnimatedBackground';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseBuilder from './pages/CourseBuilder';
import CourseView from './pages/CourseView';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollProgress />
        <div className="min-h-screen bg-white text-[#0F172A] relative overflow-hidden">
          {/* AnimatedBackground is kept as it's not explicitly a "dark gradient overlay" and might be a visual effect */}
          <AnimatedBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/build"
              element={
                <ProtectedRoute>
                  <CourseBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute>
                  <CourseView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#FFFFFF', // Light theme background
                color: '#1F2937',     // Darker text for light theme
                border: '1px solid #E5E7EB', // Light border
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // Subtle shadow
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
