import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ShieldCheck, Cpu, Database, ClipboardCheck } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'All'>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: (Project['category'] | 'All')[] = [
    'All',
    'Automation',
    'Data Analytics',
    'Machine Learning',
    'Database'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  // Helper for choosing metrics icons
  const getMetricsIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('time') || l.includes('speed')) {
      return <Cpu className={`w-5 h-5 ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`} />;
    }
    if (l.includes('accuracy') || l.includes('precision') || l.includes('margin')) {
      return <ShieldCheck className={`w-5 h-5 ${isDarkMode ? 'text-[#39ff14]' : 'text-emerald-600'}`} />;
    }
    return <Database className={`w-5 h-5 ${isDarkMode ? 'text-[#00d4ff]' : 'text-slate-600'}`} />;
  };

  return (
    <section 
      id="projects" 
      className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
        isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
      }`}
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div className="space-y-2">
            <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>/* Projects */</p>
            <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Featured Work
            </h2>
          </div>

          {/* Filtering Links */}
          <div className="flex flex-wrap gap-2 font-mono text-sm tracking-wider uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border transition-all cursor-pointer rounded-xs ${
                  selectedCategory === cat
                    ? isDarkMode 
                      ? 'border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/5'
                      : 'border-blue-600 text-blue-700 bg-blue-50 font-medium'
                    : isDarkMode 
                      ? 'border-[#4a6d8c]/30 text-[#4a6d8c] hover:border-[#cde8ff]/30 hover:text-[#cde8ff]'
                      : 'border-slate-300 text-slate-500 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group border p-6 sm:p-8 flex flex-col justify-between rounded-sm transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isDarkMode 
                    ? 'border-[#00d4ff]/10 bg-[#041325]/40 hover:border-[#00d4ff] hover:shadow-[0_0_35px_rgba(0,212,255,0.06)]' 
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg hover:shadow-slate-100'
                }`}
              >
                {/* Visual architectural cross corner */}
                <div className={`absolute top-0 right-0 w-8 h-8 border-r border-t border-transparent transition-colors ${
                  isDarkMode ? 'group-hover:border-[#00d4ff]/40' : 'group-hover:border-slate-400'
                }`} />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`font-mono text-[9px] tracking-[3px] uppercase ${
                      isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-sm'
                    }`}>
                      {project.type}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-colors ${
                      isDarkMode ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' : 'text-slate-400 group-hover:text-blue-700'
                    }`} />
                  </div>

                  <h3 className={`font-sans text-lg sm:text-xl font-semibold transition-colors mb-2 ${
                    isDarkMode ? 'text-white group-hover:text-[#00d4ff]' : 'text-slate-900 group-hover:text-blue-800'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`font-sans font-light text-sm sm:text-base leading-relaxed mb-6 ${
                    isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-mono text-xs border px-2 py-0.5 ${
                        isDarkMode 
                          ? 'text-[#00d4ff] border-[#00d4ff]/20 bg-[#00d4ff]/2' 
                          : 'text-slate-600 border-slate-200 bg-slate-50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className={`absolute inset-0 backdrop-blur-md ${isDarkMode ? 'bg-[#000000]/80' : 'bg-slate-900/35'}`}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`relative w-full max-w-3xl rounded-md shadow-2xl p-6 sm:p-10 overflow-y-auto max-h-[90vh] border ${
                isDarkMode 
                  ? 'bg-[#041325] border-[#00d4ff]/25 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <button
                onClick={() => setActiveProject(null)}
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 rounded-sm transition-all focus:outline-none ${
                  isDarkMode 
                    ? 'text-[#4a6d8c] hover:text-[#00d4ff] hover:bg-[#00d4ff]/5' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8">
                <div>
                  <span className={`font-mono text-[10px] tracking-[3px] uppercase ${
                    isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600 font-bold'
                  }`}>
                    {activeProject.type}
                  </span>
                  <h3 className={`font-sans text-2xl sm:text-3xl font-semibold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    {activeProject.title}
                  </h3>
                </div>

                {/* Key Metrics */}
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 border-y py-5 ${
                  isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
                }`}>
                  {activeProject.metrics.map((metric) => (
                    <div 
                      key={metric.label} 
                      className={`flex items-center gap-3 p-3.5 border ${
                        isDarkMode 
                          ? 'bg-[#000000]/60 border-[#00d4ff]/5' 
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      {getMetricsIcon(metric.label)}
                      <div>
                        <div className={`font-mono text-[15px] font-medium leading-none ${
                          isDarkMode ? 'text-[#00d4ff]' : 'text-blue-700'
                        }`}>
                          {metric.value}
                        </div>
                        <div className={`font-mono text-[8.5px] uppercase tracking-wider mt-1 leading-none ${
                          isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-550'
                        }`}>
                          {metric.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Narrative Detail */}
                <div className="space-y-4">
                  <h4 className={`font-mono text-[10px] uppercase tracking-wider ${
                    isDarkMode ? 'text-[#00d4ff]' : 'text-blue-800 font-semibold'
                  }`}>// Project Scope &amp; Architecture</h4>
                  <p className={`font-sans font-light text-sm leading-relaxed ${
                    isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-600'
                  }`}>
                    {activeProject.longDescription}
                  </p>
                </div>

                {/* Operational Impact */}
                <div className={`p-5 border ${
                  isDarkMode 
                    ? 'bg-[#39ff14]/5 border-[#39ff14]/15' 
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${
                    isDarkMode ? 'text-[#39ff14]' : 'text-emerald-700'
                  }`}>
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Operational Impact</span>
                  </div>
                  <p className={`font-sans font-light text-sm leading-relaxed mt-2 ${
                    isDarkMode ? 'text-[#cde8ff]' : 'text-slate-800'
                  }`}>
                    {activeProject.impact}
                  </p>
                </div>

                {/* Tags bottom list */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-mono text-xs px-2.5 py-1 ${
                        isDarkMode ? 'text-[#4a6d8c] bg-[#4a6d8c]/5' : 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
