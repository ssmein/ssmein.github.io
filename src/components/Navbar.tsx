import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isDetailedMode?: boolean;
  onCloseDetail?: () => void;
}

export default function Navbar({ activeSection, isDarkMode, toggleTheme, isDetailedMode, onCloseDetail }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isDetailedMode && onCloseDetail) {
      onCloseDetail();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-opacity-10 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#000000]/90 backdrop-blur-md py-3 border-[#00d4ff]'
              : 'bg-white/90 shadow-sm backdrop-blur-md py-3 border-slate-200'
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className={`flex items-center gap-2 font-display text-xl sm:text-2xl tracking-[3px] transition-all hover:brightness-125 focus:outline-none ${
              isDarkMode ? 'text-[#00d4ff]' : 'text-slate-900 font-bold'
            }`}
            style={isDarkMode ? { textShadow: '0 0 15px rgba(0, 212, 255, 0.4)' } : undefined}
          >
            <Terminal className={`w-5 h-5 ${isDarkMode ? 'animate-pulse' : ''}`} />
            <span>S.AI</span>
          </a>

          {/* Right section: Links and Theme Toggle */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Desktop Nav Links */}
            <ul className={`hidden md:flex items-center gap-8 font-mono text-sm tracking-widest ${
              isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`uppercase transition-colors duration-200 py-1 focus:outline-none ${
                        isActive 
                          ? isDarkMode ? 'text-[#00d4ff]' : 'text-slate-950 font-semibold'
                          : isDarkMode ? 'hover:text-[#00d4ff]' : 'hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className={`absolute bottom-0 left-0 w-full h-[1px] ${
                            isDarkMode ? 'bg-[#00d4ff]' : 'bg-blue-600'
                          }`}
                          style={isDarkMode ? { boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)' } : undefined}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Combined Sun/Moon Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all cursor-pointer focus:outline-none ${
                isDarkMode 
                  ? 'border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/50' 
                  : 'border-slate-300 text-blue-600 hover:bg-slate-100 hover:border-slate-400'
              }`}
              aria-label="Toggle structural simulation scheme theme"
              title="Toggle Structural Simulator Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none ${
                  isDarkMode ? 'text-[#cde8ff] hover:text-[#00d4ff]' : 'text-slate-700 hover:text-slate-900'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-[57px] z-40 md:hidden flex flex-col p-6 space-y-4 shadow-2xl backdrop-blur-lg bg-opacity-95 ${
              isDarkMode 
                ? 'bg-[#000000] border-b border-[#00d4ff]/20' 
                : 'bg-white border-b border-slate-200'
            }`}
          >
            <ul className={`flex flex-col space-y-4 font-mono text-sm tracking-widest ${
              isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-650'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block uppercase py-2 transition-colors duration-200 rounded-md px-3 ${
                        isActive 
                          ? isDarkMode 
                            ? 'text-[#00d4ff] bg-[#00d4ff]/5' 
                            : 'text-blue-600 bg-blue-50 font-medium'
                          : isDarkMode 
                            ? 'hover:bg-[#00d4ff]/10 hover:text-[#00d4ff]' 
                            : 'hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
