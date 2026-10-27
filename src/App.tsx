import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CADBackground from './components/CADBackground';
import ProjectDetail from './components/ProjectDetail';
import { Project } from './types';

export default function App() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    // The detail view used to inherit the scroll position of the grid behind it.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) return; // Don't observe section intersections while on a subpage

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
    
    // Create an intersection observer to track which portion is active
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedProject]);

  return (
    <div className={`transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] text-[#cde8ff]' : 'bg-[#f8f9fa] text-[#1a202c]'} min-h-screen relative selection:bg-[#00d4ff]/20 selection:text-[#00d4ff] antialiased`}>
      {/* CAD interactive background layer */}
      <CADBackground isDarkMode={isDarkMode} />

      <Navbar 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        isDetailedMode={!!selectedProject}
        onCloseDetail={() => setSelectedProject(null)}
      />
      
      <main className="relative pt-16">
        {/*
          Opening a project replaces the whole page, which is a big spatial
          jump to make with no transition. mode="wait" lets the outgoing view
          clear before the incoming one arrives, so the two never cross-fade
          through each other. The exit is deliberately shorter and travels less
          than the enter — the user has already committed to the new view.
        */}
        <AnimatePresence mode="wait" initial={false}>
          {selectedProject ? (
            <motion.div
              key={`detail-${selectedProject.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={
                reduceMotion
                  ? {}
                  : {
                      opacity: 0,
                      y: -6,
                      filter: 'blur(4px)',
                      transition: { duration: 0.2, ease: [0.5, 0, 0.75, 0] },
                    }
              }
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectDetail
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sections"
              initial={reduceMotion ? false : { opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={
                reduceMotion
                  ? {}
                  : {
                      opacity: 0,
                      y: -6,
                      filter: 'blur(4px)',
                      transition: { duration: 0.2, ease: [0.5, 0, 0.75, 0] },
                    }
              }
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero isDarkMode={isDarkMode} />
              <About isDarkMode={isDarkMode} />
              <Skills isDarkMode={isDarkMode} />
              <Projects isDarkMode={isDarkMode} onSelectProject={setSelectedProject} />
              <Experience isDarkMode={isDarkMode} />
              <Contact isDarkMode={isDarkMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
