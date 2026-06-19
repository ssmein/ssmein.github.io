import { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
        {selectedProject ? (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            isDarkMode={isDarkMode} 
          />
        ) : (
          <>
            <Hero isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Skills isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} onSelectProject={setSelectedProject} />
            <Experience isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
          </>
        )}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
