import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, GraduationCap, Award, Calendar, BookOpen, ExternalLink, FileText, X, ShieldCheck } from 'lucide-react';
import { experienceData, educationData, certificationData, specialCourseData } from '../data';
import { SpecialCourse } from '../types';

export default function Experience({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCourse, setSelectedCourse] = useState<SpecialCourse | null>(null);

  // Combine Degrees (educationData) and Certifications (specialCourseData) in chronological order
  const timelineItems = [
    ...educationData.map(edu => {
      const parts = edu.period.replace(/—/g, '-').split('-');
      const endYearStr = parts[parts.length - 1] || edu.period;
      const year = parseInt(endYearStr.trim()) || 2019;
      return {
        id: edu.id,
        type: 'degree' as const,
        year,
        period: edu.period,
        title: edu.degree,
        subtitle: edu.institution,
        location: edu.location,
        details: edu.details,
        syllabus: undefined,
        link: undefined,
        isPdf: undefined
      };
    }),
    ...specialCourseData.map(course => {
      const year = parseInt(course.year) || 2026;
      return {
        id: course.id,
        type: 'course' as const,
        year,
        period: course.year,
        title: course.title,
        subtitle: course.issuer,
        location: undefined,
        details: undefined,
        syllabus: course.syllabus,
        link: course.link,
        isPdf: course.isPdf
      };
    })
  ].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    // Prioritize Automation BIM Essential (Dynamo) at the very top of its year
    if (a.id === 'dynamo-bim') return -1;
    if (b.id === 'dynamo-bim') return 1;
    return 0;
  });

  const scrollToEducation = () => {
    const el = document.getElementById('education');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. PROFESSIONAL EXPERIENCE SECTION */}
      <section 
        id="experience" 
        className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
          isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
        }`}
      >
        <div className="space-y-12">
          {/* Header containing the Heading and an Action Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800/60">
            <div className="space-y-2">
              <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>
                /* CORP_TIMELINE */
              </p>
              <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Professional Experience
              </h2>
            </div>

            {/* Button right next to/above EXPERIENCE heading to go to EDUCATION */}
            <div className="self-start md:self-end">
              <button
                onClick={scrollToEducation}
                id="experience-goto-education"
                className={`px-4 py-2.5 border font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-xs cursor-pointer focus:outline-none flex items-center gap-2 font-semibold ${
                  isDarkMode
                    ? 'border-[#00d4ff]/40 text-[#00d4ff] bg-[#00d4ff]/5 hover:bg-[#00d4ff]/15 hover:border-[#00d4ff]'
                    : 'border-blue-200 text-blue-700 bg-blue-50/70 hover:bg-blue-100/50 hover:border-blue-400 shadow-xs'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Go to Education ↓</span>
              </button>
            </div>
          </div>

          {/* Timeline list of professional experiences */}
          {experienceData.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className={`p-8 rounded-sm text-center border w-full max-w-md ${
                isDarkMode 
                  ? 'bg-[#041325]/20 border-[#00d4ff]/10 text-[#00d4ff]' 
                  : 'bg-slate-50 border-slate-200 text-blue-600'
              }`}>
                <span className="font-mono text-xl sm:text-2xl tracking-[6px] font-bold uppercase block mb-1">
                  TBA
                </span>
                <p className={`font-sans text-sm font-light ${isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'}`}>
                  Professional experience details to be updated.
                </p>
              </div>
            </div>
          ) : (
            <div className={`relative border-l ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12 py-4 ${
              isDarkMode ? 'border-[#00d4ff]/15' : 'border-slate-200'
            }`}>
              {experienceData.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Timeline diamond point marker */}
                  <div 
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 border transform rotate-45 flex items-center justify-center ${
                      isDarkMode ? 'bg-[#000000] border-[#00d4ff]' : 'bg-white border-blue-600'
                    }`}
                    style={isDarkMode ? { boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)' } : undefined}
                  >
                    <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-[#39ff14]' : 'bg-blue-600'}`} />
                  </div>

                  {/* Card container */}
                  <div className={`p-6 rounded-sm space-y-4 border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#041325]/20 border-[#00d4ff]/5 hover:border-[#00d4ff]/10' 
                      : 'bg-white shadow-xs border-slate-200 hover:border-slate-400'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <span className={`font-mono text-xs tracking-[3px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>
                          {exp.period}
                        </span>
                        <h3 className={`font-sans text-lg sm:text-xl font-semibold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {exp.role}
                        </h3>
                        <div className={`flex flex-wrap items-center gap-1.5 sm:gap-3 text-sm mt-1 font-light ${
                          isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'
                        }`}>
                          <span className={`font-medium ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-950'}`}>{exp.company}</span>
                          <span className="opacity-30">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className={`w-3 h-3 opacity-65 ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-655'}`} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      {exp.type && (
                        <span className={`self-start inline-flex items-center px-2.5 py-1 text-xs font-mono uppercase tracking-[1px] rounded-xs border sm:mt-0.5 ${
                          isDarkMode 
                            ? 'text-[#39ff14] border-[#39ff14]/15 bg-[#39ff14]/5' 
                            : 'text-blue-600 border-blue-200 bg-blue-50/50'
                        }`}>
                          {exp.type}
                        </span>
                      )}
                    </div>

                    {/* Bullets */}
                    <ul className={`space-y-2 list-none font-sans text-sm sm:text-base font-light leading-relaxed pl-1 ${
                      isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-600'
                    }`}>
                      {exp.description.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-2">
                          <span className={`font-mono mt-0.5 ${isDarkMode ? 'text-[#00d4ff] opacity-60' : 'text-blue-600 opacity-80'}`}>&gt;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills tags deployed */}
                    <div className={`pt-3 border-t flex flex-wrap gap-1.5 ${
                      isDarkMode ? 'border-[#00d4ff]/5' : 'border-slate-100'
                    }`}>
                      <span className={`font-mono text-xs uppercase tracking-wider self-center mr-1 ${
                        isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-400'
                      }`}>Skills Used:</span>
                      {exp.skillsUsed.map((skill) => (
                        <span
                          key={skill}
                          className={`font-mono text-xs border px-2 py-0.5 rounded-xs ${
                            isDarkMode 
                              ? 'text-[#39ff14] border-[#39ff14]/10 bg-[#39ff14]/5' 
                              : 'text-slate-700 border-slate-200 bg-slate-50'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. EDUCATION & CREDENTIALS SECTION */}
      <section 
        id="education" 
        className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
          isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
        }`}
      >
        <div className="space-y-16">
          <div className="space-y-2 pb-6 border-b border-dashed border-slate-200 dark:border-slate-800/60 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>
                /* DEGREES&CERTIFICATES */
              </p>
              <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Education
              </h2>
            </div>

            {/* Jump back up indicator/link */}
            <div className="self-start md:self-end">
              <button
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className={`text-xs font-mono hover:underline focus:outline-none flex items-center gap-1.5 uppercase ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <span>↑ Professional Experience</span>
              </button>
            </div>
          </div>

          {/* Academic Degrees & Certifications List */}
          <div className="space-y-8">
            <div className={`relative border-l ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12 py-3 ${
              isDarkMode ? 'border-[#00d4ff]/15' : 'border-slate-200'
            }`}>
              {timelineItems.map((item, idx) => {
                if (item.type === 'degree') {
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Academic Cap point marker */}
                      <div 
                        className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 border transform rotate-45 flex items-center justify-center ${
                          isDarkMode ? 'bg-[#000000] border-[#00d4ff]' : 'bg-white border-blue-600'
                        }`}
                        style={isDarkMode ? { boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)' } : undefined}
                      >
                        <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-[#00d4ff]' : 'bg-blue-600'}`} />
                      </div>

                      {/* Card wrapper */}
                      <div className={`p-6 rounded-sm space-y-4 border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#041325]/20 border-[#00d4ff]/10 hover:border-[#00d4ff]/25' 
                          : 'bg-white shadow-xs border-slate-200 hover:border-slate-400'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <span className={`font-mono text-xs tracking-[3px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'} flex items-center gap-1.5`}>
                              <Calendar className="w-3.5 h-3.5" />
                              {item.period}
                            </span>
                            <h4 className={`font-sans text-lg sm:text-xl font-bold mt-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {item.title}
                            </h4>
                            <div className={`flex flex-wrap items-center gap-1.5 sm:gap-3 text-sm mt-1 font-light ${
                              isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'
                            }`}>
                              <span className={`font-medium ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-950'} flex items-center gap-1.5`}>
                                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                {item.subtitle}
                              </span>
                              <span className="opacity-30">•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className={`w-3 h-3 opacity-65 ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-655'}`} />
                                {item.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Education descriptions */}
                        {item.details && (
                          <div className="space-y-3 pt-2">
                            {item.details.map((detail, dIdx) => {
                              const urlIndex = detail.indexOf('https://');
                              if (urlIndex !== -1) {
                                const prefix = detail.slice(0, urlIndex);
                                const url = detail.slice(urlIndex);
                                return (
                                  <div key={dIdx} className={`font-sans text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <span>
                                      {prefix}
                                      <a 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`underline font-semibold transition-opacity duration-200 cursor-pointer ${
                                          isDarkMode ? 'text-[#00d4ff] hover:text-[#39ff14]' : 'text-[#155DFC] hover:text-blue-805'
                                        }`}
                                      >
                                        {url}
                                      </a>
                                    </span>
                                  </div>
                                );
                              }
                              return (
                                <div key={dIdx} className={`font-sans text-sm sm:text-base font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                  {detail}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative group cursor-pointer"
                      onClick={() => setSelectedCourse({
                        id: item.id,
                        title: item.title,
                        issuer: item.subtitle,
                        year: item.period,
                        link: item.link,
                        isPdf: item.isPdf,
                        syllabus: item.syllabus
                      })}
                    >
                      {/* Timeline Award point marker */}
                      <div 
                        className={`absolute -left-[30px] sm:-left-[46px] top-2.5 w-3.5 h-3.5 border transform rotate-45 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          isDarkMode ? 'bg-[#000000] border-[#39ff14]' : 'bg-white border-green-600'
                        }`}
                        style={isDarkMode ? { boxShadow: '0 0 10px rgba(57, 255, 20, 0.4)' } : undefined}
                      >
                        <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-[#39ff14]' : 'bg-green-600'}`} />
                      </div>

                      {/* Card wrapper - compact & smaller */}
                      <div className={`p-4 sm:p-5 rounded-sm space-y-3.5 border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#041325]/10 border-[#00d4ff]/10 hover:border-[#39ff14]/35 hover:bg-[#041325]/25' 
                          : 'bg-white shadow-xs border-slate-200 hover:border-green-400 hover:shadow-xs'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`font-mono text-xs tracking-[3px] uppercase ${isDarkMode ? 'text-[#39ff14]' : 'text-green-700'} flex items-center gap-1.5`}>
                                <Award className="w-3.5 h-3.5 animate-pulse" />
                                {item.period}
                              </span>
                              <span className={`text-[9px] font-mono tracking-wider px-1.5 py-0.5 uppercase border rounded-xs ${
                                isDarkMode 
                                  ? 'bg-[#39ff14]/5 border-[#39ff14]/15 text-[#39ff14]' 
                                  : 'bg-green-50 border-green-150 text-green-800'
                              }`}>
                                Certification
                              </span>
                            </div>
                            <h4 className={`font-sans text-base sm:text-lg font-bold mt-2 leading-snug transition-colors group-hover:transition-none ${
                              isDarkMode ? 'text-white group-hover:text-[#39ff14]' : 'text-slate-900 group-hover:text-green-700'
                            }`}>
                              {item.title}
                            </h4>
                            <div className="text-xs sm:text-sm font-semibold opacity-75 mr-2 mt-1">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {/* Footer link trigger / open modal */}
                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider border-t border-dashed border-slate-200/50 dark:border-slate-800/10">
                          <span className={isDarkMode ? 'text-slate-400 group-hover:text-[#39ff14]' : 'text-slate-500 group-hover:text-green-700'}>
                            View Curriculum & Syllabus
                          </span>
                          <span className={isDarkMode ? 'text-[#39ff14]' : 'text-green-700'}>
                            {item.isPdf ? '→' : '↗'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Certification Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-xl relative p-6 sm:p-8 border rounded-xs shadow-2xl cursor-default ${
                isDarkMode
                  ? 'bg-[#030e1a]/95 border-[#00d4ff]/30 text-white'
                  : 'bg-white border-slate-350 text-slate-950'
              }`}
              style={isDarkMode ? { boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)' } : undefined}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className={`absolute top-4 right-4 p-1.5 rounded-full border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Border decoration */}
              <div className={`absolute inset-2.5 border pointer-events-none rounded-xs opacity-50 ${
                isDarkMode ? 'border-[#00d4ff]/15' : 'border-slate-250'
              }`} />

              <div className="space-y-6 relative z-10">
                {/* Header Badge */}
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <span className={`p-3 rounded-full border ${
                      isDarkMode ? 'bg-[#39ff14]/10 border-[#39ff14]/20 text-[#39ff14]' : 'bg-green-50 border-green-150 text-green-700'
                    }`}>
                      <ShieldCheck className="w-7 h-7" />
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl tracking-tight uppercase font-extrabold leading-snug">
                    {selectedCourse.title}
                  </h3>
                  <p className={`font-mono text-[11px] uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    ISSUED BY: <span className="font-bold underline">{selectedCourse.issuer}</span> • {selectedCourse.year}
                  </p>
                </div>

                {/* Candidate Name Segment */}
                <div className="text-center space-y-1 py-3 border-y border-dashed border-slate-200 dark:border-slate-800/40">
                  <h4 className="font-sans text-lg sm:text-xl font-bold tracking-wide">
                    Sai Soum Mein
                  </h4>
                  <p className={`text-[11px] font-sans font-light italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Certificate of Completion
                  </p>
                </div>

                {/* Training Syllabus Curriculum */}
                {selectedCourse.syllabus && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono font-bold tracking-wider uppercase opacity-85">
                      Curriculum & Core Modules:
                    </p>
                    <ul className="space-y-1.5 list-none">
                      {selectedCourse.syllabus.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-xs sm:text-sm font-light leading-relaxed">
                          <span className={`font-mono ${isDarkMode ? 'text-[#39ff14]' : 'text-green-600'} text-xs mt-0.5`}>&gt;_</span>
                          <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verified Link Action */}
                {selectedCourse.link ? (
                  <div className="pt-2 text-center">
                    <a
                      href={selectedCourse.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-all w-full ${
                        isDarkMode
                          ? 'bg-[#00d4ff]/10 hover:bg-[#00d4ff]/25 border border-[#00d4ff]/25 text-[#00d4ff]'
                          : 'bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700'
                      }`}
                    >
                      {selectedCourse.isPdf ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      <span>{selectedCourse.isPdf ? 'View PDF Certificate' : 'View Official Credential Link'}</span>
                    </a>
                  </div>
                ) : (
                  <div className="pt-2 text-center">
                    <a
                      href="mailto:ssoummein@gmail.com?subject=Verification%20Request%3A%20Revit/Dynamo%20BIM%2520Certificate"
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-all w-full ${
                        isDarkMode
                          ? 'bg-[#39ff14]/10 hover:bg-[#39ff14]/20 border border-[#39ff14]/20 text-[#39ff14]'
                          : 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Certificate PDF File</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
