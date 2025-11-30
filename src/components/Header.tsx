import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Heart, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GradientMenu from './ui/gradient-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGradientMenu, setShowGradientMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Quem Somos' },
    { path: '/products', label: 'Produtos' },
    { path: '/distributors', label: 'Distribuidores' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contato' }
  ];

  const isActive = (path: string) => location.pathname === path;

  async function handleLogout() {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  }

  return (
    <header className="backdrop-blur-md shadow-lg sticky top-0 z-50 border-b overflow-x-hidden" style={{ backgroundColor: '#F7F7F7', borderBottomColor: '#fff9c2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-24 lg:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://i.postimg.cc/yY2XtMKV/logo-pian.png"
              alt="Pian Alimentos" 
              className="h-20 sm:h-24 lg:h-28 w-auto"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjU5ZTBiIiByeD0iMTAiLz4KPHRleHQgeD0iMTAwIiB5PSI0NSIgZm9udC1mYW1pbHk9Ik1vbnRzZXJyYXQsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJibGFjayIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UElBTjwvdGV4dD4KPHRleHQgeD0iMTAwIiB5PSI2MiIgZm9udC1mYW1pbHk9Ik1vbnRzZXJyYXQsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BTElNRU5UT1M8L3RleHQ+Cjwvc3ZnPg==';
              }}
            />
          </Link>

          {/* Desktop Navigation - Modern Design */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative font-bold transition-all duration-500 ease-out font-barlow-condensed px-5 py-2.5 rounded-xl text-lg sm:text-xl overflow-hidden ${
                  isActive(item.path) 
                    ? 'text-white shadow-2xl' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {/* Active state - Enhanced with multiple layers */}
                {isActive(item.path) && (
                  <>
                    {/* Main background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pian-black via-gray-900 to-pian-black rounded-xl"></div>
                    
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    
                    {/* Yellow underline with glow */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-pian-yellow via-pian-yellow to-pian-yellow rounded-b-xl shadow-[0_-2px_8px_rgba(253,213,40,0.4)]"></div>
                    
                    {/* Top glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-xl"></div>
                    
                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-white/10 animate-pulse-subtle"></div>
                  </>
                )}
                
                {/* Hover state for inactive items - Enhanced */}
                {!isActive(item.path) && (
                  <>
                    {/* Hover background with smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"></div>
                    
                    {/* Hover border */}
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    
                    {/* Animated underline from center */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pian-yellow via-pian-yellow to-pian-yellow group-hover:w-[90%] transition-all duration-500 ease-out rounded-full shadow-[0_2px_4px_rgba(253,213,40,0.3)]"></div>
                    
                    {/* Subtle scale on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
                
                {/* Text with enhanced styling */}
                <span className={`relative z-10 inline-block transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'drop-shadow-lg transform scale-105' 
                    : 'group-hover:scale-105 group-hover:font-extrabold'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Admin Controls and Social */}
          <div className="hidden xl:flex items-center space-x-3 ml-8">
            {isAdmin && (
              <div className="flex items-center gap-2 mr-4">
                <Link
                  to="/admin"
                  className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pian-red to-red-600 text-white font-bold font-barlow-condensed rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold font-barlow-condensed rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
            <div className="flex space-x-2">
              <a 
                href="https://www.facebook.com/pian.alimentos/?locale=pt_BR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                title="Facebook"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/pian.alimentos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                title="Instagram"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/pian-alimentos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                title="LinkedIn"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@Pian_alimentos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                title="YouTube"
              >
                <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile menu button - Modern Design */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2.5 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Gradient Menu Modal */}
        {showGradientMenu && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="relative">
              <button
                onClick={() => setShowGradientMenu(false)}
                className="absolute -top-4 -right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <GradientMenu />
            </div>
          </div>
        )}

        {/* Mobile Navigation - Modern Design */}
        {isMenuOpen && (
          <div className="lg:hidden px-2 pt-3 pb-4 space-y-2 backdrop-blur-md border-t animate-fade-in-up" style={{ backgroundColor: '#F7F7F7', borderTopColor: '#fff9c2' }}>
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`group relative block px-4 py-3.5 rounded-xl font-bold transition-all duration-500 font-barlow-condensed text-lg overflow-hidden ${
                  isActive(item.path) 
                    ? 'bg-gradient-to-r from-pian-black via-gray-900 to-pian-black text-white shadow-xl' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Active state - Enhanced */}
                {isActive(item.path) && (
                  <>
                    {/* Main background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pian-black via-gray-900 to-pian-black rounded-xl"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Yellow left border */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pian-yellow via-pian-yellow to-pian-yellow rounded-l-xl shadow-lg shadow-pian-yellow/50"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl"></div>
                  </>
                )}
                
                {/* Hover effect for inactive */}
                {!isActive(item.path) && (
                  <>
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]"></div>
                    
                    {/* Hover left border */}
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-pian-yellow to-pian-yellow group-hover:w-1 transition-all duration-500 rounded-l-xl"></div>
                  </>
                )}
                
                <span className={`relative z-10 pl-1 inline-block transition-all duration-300 ${
                  isActive(item.path) ? 'drop-shadow-sm scale-105' : 'group-hover:scale-105'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}

            {isAdmin && (
              <div className="pt-2 space-y-2 border-t border-gray-200 mt-2">
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pian-red to-red-600 text-white font-bold transition-all duration-300 font-barlow-condensed text-lg hover:shadow-lg hover:scale-105"
                >
                  <Shield className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold transition-all duration-300 font-barlow-condensed text-lg hover:shadow-lg hover:scale-105"
                >
                  <LogOut className="h-5 w-5" />
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;