import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteCartModal from './components/QuoteCartModal';
import WhatsAppFloatingBtn from './components/WhatsAppFloatingBtn';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
      case 'profile':
        return <About setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} />;
      case 'certificates':
        return <Certificates setCurrentPage={setCurrentPage} />;
      case 'careers':
        return <Careers setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      case 'admin':
        return isAuthenticated ? (
          <AdminDashboard setCurrentPage={setCurrentPage} />
        ) : (
          <AdminLogin setCurrentPage={setCurrentPage} />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-pinkTheme-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <QuoteCartModal setCurrentPage={setCurrentPage} />
      <WhatsAppFloatingBtn />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
