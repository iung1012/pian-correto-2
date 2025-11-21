import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Distributors from './pages/Distributors';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SocialDemo from './pages/SocialDemo';
import NavbarDemo from './pages/NavbarDemo';
import GradientMenuDemo from './pages/GradientMenuDemo';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/distributors" element={<Distributors />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/social-demo" element={<SocialDemo />} />
              <Route path="/navbar-demo" element={<NavbarDemo />} />
              <Route path="/gradient-menu-demo" element={<GradientMenuDemo />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;