import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiHome, FiCalendar, FiCompass, FiClock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="fixed top-0 w-full glass-navbar z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              <FiCalendar className="text-white" size={22} />
              <span>EventHub</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Home
                  </Link>
                  <Link to="/dashboard" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/explore" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Explore
                  </Link>
                  <Link to="/my-events" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    My Events
                  </Link>
                  <Link to="/history" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    History
                  </Link>
                  <Link to="/profile" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/explore" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Explore
                  </Link>
                  <Link to="/login" className="btn-primary">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-secondary">
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/5 text-zinc-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card rounded-t-none border-t border-white/[0.08]">
            <div className="px-4 py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiHome size={18} />
                    Home
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiCalendar size={18} />
                    Dashboard
                  </Link>
                  <Link
                    to="/explore"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiCompass size={18} />
                    Explore
                  </Link>
                  <Link
                    to="/my-events"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiCalendar size={18} />
                    My Events
                  </Link>
                  <Link
                    to="/history"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiClock size={18} />
                    History
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUser size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/explore"
                    className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:bg-white/5 hover:text-white rounded-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiCompass size={18} />
                    Explore
                  </Link>
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 btn-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;
