import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, Layers, Cpu, Code2, Database, ShieldCheck, Tag, Info } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ProjectDetail({ project, onClose, isDarkMode }: ProjectDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  const getMetricsIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('time') || l.includes('speed') || l.includes('version')) {
      return <Cpu className="w-5 h-5 text-[#00d4ff] dark:text-[#00d4ff]" />;
    }
    if (l.includes('accuracy') || l.includes('precision') || l.includes('margin')) {
      return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
    return <Database className="w-5 h-5 text-slate-500 dark:text-slate-400" />;
  };

  const specIcons = [
    <Layers className="w-4 h-4" />,
    <Code2 className="w-4 h-4" />,
    <Info className="w-4 h-4" />,
    <Database className="w-4 h-4" />,
  ];

  return (
    <section 
      id={`project-detail-${project.id}`}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in"
    >
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b pb-6 border-slate-300 dark:border-slate-800">
        <button
          onClick={onClose}
          id="back-to-portfolio-btn"
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-700 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </button>
        
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-500">
          <span>Case Study</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-300 font-bold uppercase">{project.id}</span>
        </div>
      </div>

      {/* Project Header Text Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 border border-blue-400 dark:border-[#00d4ff]/20 text-blue-900 dark:text-[#00d4ff] bg-blue-100/55 dark:bg-[#00d4ff]/5 rounded-sm font-semibold">
            {project.category}
          </span>
        </div>
        
        <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-black dark:text-white">
          {project.title}
        </h1>
        
        <p className="font-sans text-base sm:text-lg font-normal leading-relaxed max-w-4xl text-black dark:text-slate-300">
          {project.description}
        </p>
      </div>

      {/* Grid Layout: Visual Showcase Left & Technical Breakdown Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: Image Carousel & Body Narrative */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Visual Frame */}
          <div className="space-y-3">
            <div 
              onClick={() => setIsFullscreen(true)}
              className="group relative overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 rounded-sm transition-all duration-300 cursor-zoom-in"
            >
              <img
                src={project.images?.[activeImageIndex] || 'https://picsum.photos/seed/portfolio/1200/675'}
                alt={`${project.title} detailed render`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-4 right-4 p-2 bg-black/75 border border-white/10 font-mono text-[10px] text-white rounded-xs select-none backdrop-blur-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Click to Expand</span>
              </div>
            </div>
            
            {/* Legend label describing active image */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 px-1">
              <p className="font-sans font-bold text-sm text-black dark:text-white">
                {project.diagrams?.[activeImageIndex]?.title || `Visual 0${activeImageIndex + 1}`}
              </p>
              <p className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-400">
                {project.diagrams?.[activeImageIndex]?.caption || 'Engineering model visualization details.'}
              </p>
            </div>
          </div>

          {/* Interactive Thumbnails Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {project.images?.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-video rounded-xs border overflow-hidden transition-all duration-300 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-blue-600 dark:border-[#00d4ff] shadow-md dark:shadow-[0_0_15px_rgba(0,212,255,0.25)] scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} detail layout thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 flex items-center justify-center font-mono font-bold text-xs ${
                  activeImageIndex === idx 
                    ? 'bg-black/5 text-transparent' 
                    : 'bg-black/40 text-slate-200 hover:bg-black/20 hover:text-white transition-all'
                }`}>
                  <span>0{idx + 1}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Core Case Study Narrative */}
          <div className="p-6 sm:p-8 border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#041325]/30 rounded-sm space-y-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-[#00d4ff] flex items-center gap-2 mb-3 font-bold">
                <Info className="w-4 h-4" />
                <span>Project Narrative & Operational Context</span>
              </h3>
              <p className="font-sans text-sm sm:text-base font-normal leading-relaxed text-black dark:text-[#cde8ff]/85">
                {project.longDescription}
              </p>
            </div>

            <div className="p-5 border border-emerald-200 dark:border-emerald-950/40 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-sm">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Quantifiable Project Output</span>
              </div>
              <p className="font-sans font-normal text-sm leading-relaxed mt-2.5 text-black dark:text-slate-200">
                {project.impact}
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: Technical Specifications Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Key Metrics Indicators */}
          <div className="border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#041325]/40 p-6 rounded-sm space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-black">
              Key Metrics
            </h3>
            
            <div className="space-y-3">
              {project.metrics.map((metric) => (
                <div 
                  key={metric.label} 
                  className="flex items-center gap-4 p-3 border border-slate-200 dark:border-slate-850 bg-slate-100 dark:bg-[#000000]/40 rounded-sm"
                >
                  <div className="p-2 rounded-xs bg-slate-200 dark:bg-[#00d4ff]/5 border border-slate-300 dark:border-[#00d4ff]/10">
                    {getMetricsIcon(metric.label)}
                  </div>
                  <div>
                    <div className="font-mono text-lg font-bold leading-tight text-slate-950 dark:text-[#00d4ff]">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5 text-slate-800 dark:text-slate-305 font-bold">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#041325]/40 p-6 rounded-sm space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-black">
              Engineering Specs
            </h3>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {project.technicalSpecs?.map((spec, idx) => (
                <div key={idx} className="py-3 flex justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-300 font-semibold">
                    {specIcons[idx % specIcons.length]}
                    <span>{spec.label}</span>
                  </div>
                  <div className="text-right font-bold text-slate-950 dark:text-slate-100">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags list */}
          <div className="border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#041325]/40 p-6 rounded-sm space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-black dark:text-white font-black">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs border border-slate-300 dark:border-slate-800 px-2.5 py-1 rounded-sm text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/50 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FULL SCREEN PHOTO LIGHTBOX PORTAL */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-[10000] flex flex-col justify-between p-4 bg-black/95 backdrop-blur-md animate-fade-in">
            <div 
              onClick={() => setIsFullscreen(false)} 
              className="absolute inset-0 cursor-zoom-out" 
            />

            {/* Lightbox Header Toolbar */}
            <div className="relative z-10 flex justify-between items-center font-mono text-xs text-white max-w-7xl mx-auto w-full border-b border-white/10 pb-4">
              <span>{project.title.toUpperCase()} // ATTACHMENT_0{activeImageIndex + 1}</span>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1 border border-white/20 hover:border-white hover:text-[#00d4ff] transition-all cursor-pointer rounded-xs text-white font-mono text-xs"
              >
                Close View
              </button>
            </div>

            {/* Img Box */}
            <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto w-full py-6 select-none">
              <img 
                src={project.images?.[activeImageIndex]} 
                alt="Expanded details drawing case study view" 
                className="max-h-[80vh] max-w-full object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Caption and Controls */}
            <div className="relative z-10 font-mono text-center max-w-7xl mx-auto text-xs text-[#a2c8f2] md:p-4 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <p className="text-left font-sans text-xs text-white max-w-xl">
                <span className="font-bold text-slate-300 mr-2">{project.diagrams?.[activeImageIndex]?.title}:</span>
                {project.diagrams?.[activeImageIndex]?.caption}
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : (project.images?.length || 1) - 1))}
                  className="px-3 py-1 bg-white/10 text-white rounded-xs cursor-pointer hover:bg-white/25 transition-all text-xs font-mono"
                >
                  Prev
                </button>
                <span className="text-white">0{activeImageIndex + 1} / 0{project.images?.length || 1}</span>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev < (project.images?.length || 1) - 1 ? prev + 1 : 0))}
                  className="px-3 py-1 bg-white/10 text-white rounded-xs cursor-pointer hover:bg-white/25 transition-all text-xs font-mono"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
