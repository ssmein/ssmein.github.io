import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

interface ProjectsProps {
  isDarkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export default function Projects({ isDarkMode, onSelectProject }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'All'>('All');

  const categories: (Project['category'] | 'All')[] = [
    'All',
    'Modelling',
    'Automation',
    'Data Analytics',
    'Database'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

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
                      : cat === 'Data Analytics'
                        ? 'border-[#155DFC] text-[#155DFC] bg-[#155DFC]/5 font-semibold'
                        : 'border-blue-600 text-blue-700 bg-blue-50 font-medium'
                    : isDarkMode 
                      ? 'border-[#4a6d8c]/30 text-[#4a6d8c] hover:border-[#cde8ff]/30 hover:text-[#cde8ff]'
                      : cat === 'Data Analytics'
                        ? 'border-slate-300 text-[#155DFC]/85 hover:text-[#155DFC] hover:border-[#155DFC]/50'
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
                onClick={() => onSelectProject(project)}
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
                      isDarkMode 
                        ? 'text-[#00d4ff]' 
                        : project.type === 'Data Analytics'
                          ? 'text-[#155DFC] font-bold bg-[#155DFC]/5 px-1.5 py-0.5 rounded-sm border border-[#155DFC]/20'
                          : 'text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-sm'
                    }`}>
                      {project.type}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-colors ${
                      isDarkMode ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' : 'text-slate-400 group-hover:text-blue-700'
                    }`} />
                  </div>

                  <h3 className={`font-sans text-lg sm:text-xl font-semibold transition-colors mb-2 ${
                    isDarkMode 
                      ? 'text-white group-hover:text-[#00d4ff]' 
                      : (project.id === 'kpi-dash' || project.title.includes('Construction KPI'))
                        ? 'text-black group-hover:text-[#155DFC]'
                        : 'text-black group-hover:text-blue-800'
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

    </section>
  );
}
