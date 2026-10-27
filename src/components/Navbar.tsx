import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isDetailedMode?: boolean;
  onCloseDetail?: () => void;
}

export default function Navbar({ activeSection, isDarkMode, toggleTheme, isDetailedMode, onCloseDetail }: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The drawer traps nothing — focus stays free and the page underneath keeps
  // scrolling — so Escape is the keyboard way out, alongside the toggle and any
  // link. The listener only exists while the drawer is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
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
      {/*
        The scrolled/unscrolled change is driven by scroll position, not by a
        click, so it can afford the slower 260ms — it reads as the surface
        settling rather than as a laggy response. Only paint properties are
        transitioned; the py change is deliberately left to snap, because
        animating padding would force layout on every frame.
      */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 border-b border-opacity-10 transition-[background-color,border-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
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
            className={`flex items-center gap-2 font-display text-xl sm:text-2xl tracking-[3px] transition-ui hover:brightness-125 active:scale-[0.98] motion-reduce:active:scale-100 focus:outline-none ${
              isDarkMode ? 'text-[#00d4ff]' : 'text-slate-900 font-bold'
            }`}
            style={isDarkMode ? { textShadow: '0 0 15px rgba(0, 212, 255, 0.4)' } : undefined}
          >
            <Terminal className="w-5 h-5" />
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
                    {/*
                      The highest-frequency control here: colour settles in
                      160ms and the press is a flat 2% scale. No blur, no
                      bounce, and no entrance animation — the link is already
                      on screen; motion here is purely feedback.
                    */}
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`inline-block uppercase py-1 transition-[color,transform] duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 focus:outline-none ${
                        isActive
                          ? isDarkMode ? 'text-[#00d4ff]' : 'text-slate-950 font-semibold'
                          : isDarkMode ? 'hover:text-[#00d4ff]' : 'hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        /*
                          The indicator travels between links instead of
                          snapping — that travel is what tells you which way
                          you moved through the page. Stiff and overdamped so
                          it arrives quickly and lands dead flat; a springy
                          underline would wobble at every section boundary you
                          scroll past. Reduced motion gets the same position
                          with no travel.
                        */
                        <motion.span
                          layoutId="activeNavIndicator"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute bottom-0 left-0 w-full h-[1px] ${
                            isDarkMode ? 'bg-[#00d4ff]' : 'bg-blue-600'
                          }`}
                          style={isDarkMode ? { boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)' } : undefined}
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 520, damping: 42, mass: 0.6 }
                          }
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Combined Sun/Moon Theme Switcher */}
            {/*
              High-frequency control, so the button itself reacts instantly.
              The icon crossfades rather than swapping hard — an instant swap on
              a 16px glyph is easy to miss and reads as a glitch.
            */}
            <button
              onClick={toggleTheme}
              className={`relative grid h-7 w-7 place-items-center rounded-full border cursor-pointer transition-colors duration-[var(--dur-instant)] active:scale-95 motion-reduce:active:scale-100 ${
                isDarkMode
                  ? 'border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/50'
                  : 'border-slate-300 text-blue-600 hover:bg-slate-100 hover:border-slate-400'
              }`}
              aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDarkMode}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDarkMode ? 'sun' : 'moon'}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? {} : { opacity: 0, scale: 0.85 }}
                  transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute grid place-items-center"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            {/*
              Same reasoning as the theme switch: hamburger and close are two
              states of one control, so the glyphs crossfade — faster here
              (120ms) because this one also kicks off the drawer, and the two
              should not read as a queue. Fixed box so the swap cannot nudge
              the bar's layout.
            */}
            <div className="flex md:hidden">
              <button
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`relative grid h-6 w-6 place-items-center rounded-sm transition-ui active:scale-95 motion-reduce:active:scale-100 ${
                  isDarkMode ? 'text-[#cde8ff] hover:text-[#00d4ff]' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? 'close' : 'open'}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute grid place-items-center"
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {/*
        The panel is anchored to the bar it comes out of: transform-origin at
        the top, so it unfolds downward from that edge rather than arriving as a
        loose slab. The scaleY is tiny (0.97) — enough to read as hinged, small
        enough not to visibly squash the text. Leaving is shallower and roughly
        half as long: once you have tapped a link you want the menu gone, not
        performed at.
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scaleY: 0.97 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -6,
                    scaleY: 0.99,
                    transition: { duration: 0.18, ease: [0.5, 0, 0.75, 0] },
                  }
            }
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
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
                      className={`block uppercase py-2 rounded-md px-3 transition-[color,background-color,transform] duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 ${
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
