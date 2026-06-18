import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { experienceData } from '../data';

export default function Experience({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section 
      id="experience" 
      className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
        isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
      }`}
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>/* Timeline */</p>
          <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Professional Experience
          </h2>
        </div>

        {/* Timeline body */}
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
                            : 'text-slate-705 border-slate-200 bg-slate-50'
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
  );
}
