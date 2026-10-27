import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ProjectDetail({ project, onClose, isDarkMode }: ProjectDetailProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [project.id, reduceMotion]);

  /*
   * App.tsx already brings this whole page in with opacity + y + blur, so
   * anything in here that also fades and rises just doubles that transform —
   * stacked blur, multiplied opacity, more travel. Only two things move on
   * their own: the mark, because a scale is something the page transition
   * does not do, and the identification plate, because the title is the one
   * thing that differs between case studies. Breadcrumb, status copy and the
   * way back arrive with the page.
   */
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id={`project-detail-${project.id}`}
      className="min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-between"
    >
      {/* Navigation Breadcrumb */}
      <div className={`flex items-center justify-between border-b pb-6 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
        <button
          type="button"
          onClick={onClose}
          id="back-to-portfolio-btn"
          className={`group flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-ui cursor-pointer rounded-xs px-1 -mx-1 py-0.5 active:scale-[0.98] motion-reduce:active:scale-100 ${
            isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-black'
          }`}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-x-1 group-focus-visible:-translate-x-1 group-active:-translate-x-1.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-focus-visible:translate-x-0 motion-reduce:group-active:translate-x-0" />
          <span>Back to Projects</span>
        </button>

        <div className={`flex items-center gap-2 text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          <span>Case Study</span>
          <span>/</span>
          <span className={`font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>{project.id}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-16 space-y-8 text-center">
        <motion.div
          key={`${project.id}-mark`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.04, ease }}
          className={`p-6 rounded-full border ${
            isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <Clock className={`w-12 h-12 ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`} />
        </motion.div>

        <div className="space-y-4">
          {/* Identification: category + title resolve together as one plate. */}
          <motion.div
            key={`${project.id}-id`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.12, ease }}
            className="space-y-4"
          >
            <span className={`font-mono text-xs tracking-wider uppercase px-2.5 py-1 border rounded-sm font-semibold ${
              isDarkMode
                ? 'border-[#00d4ff]/20 text-[#00d4ff] bg-[#00d4ff]/5'
                : project.category === 'Analytics'
                  ? 'border-[#155DFC]/30 text-[#155DFC] bg-[#155DFC]/5'
                  : 'border-blue-400 text-blue-900 bg-blue-100/55'
            }`}>
              {project.category}
            </span>
            <h1 className={`font-sans text-3xl sm:text-4xl font-bold tracking-tight pt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {project.title}
            </h1>
          </motion.div>

          {/* Status copy arrives with the page. Body text gets no entrance of its own. */}
          <div className="space-y-4">
            <p className="font-mono text-lg font-bold text-[#155DFC] uppercase tracking-widest pt-4 pb-1">
              Stay Tuned
            </p>
            <p className={`font-sans text-sm sm:text-base max-w-sm mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Case study content and technical details for this project are currently being prepared.
            </p>
          </div>
        </div>
      </div>

      {/* The way out is a control: it is present the moment the page is, not delayed in. */}
      <div
        className={`border-t pt-6 flex justify-center ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`px-6 py-2 border font-mono text-xs uppercase tracking-wider transition-ui cursor-pointer rounded-xs active:scale-[0.98] motion-reduce:active:scale-100 ${
            isDarkMode
              ? 'border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white'
              : 'border-slate-350 hover:border-slate-800 text-slate-800 hover:text-black'
          }`}
        >
          Return to Projects
        </button>
      </div>
    </section>
  );
}
