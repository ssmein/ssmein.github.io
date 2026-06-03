import { motion } from 'motion/react';
import { skillGroupsData } from '../data';

export default function Skills({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section 
      id="skills" 
      className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 ${
        isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
      }`}
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>/* Capabilities */</p>
          <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Technical Stack
          </h2>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroupsData.map((group, groupIdx) => (
            <div
              key={group.category}
              className={`p-6 rounded-sm flex flex-col transition-all border ${
                isDarkMode 
                  ? 'bg-[#041325]/30 border-[#00d4ff]/10 hover:border-[#00d4ff]/20' 
                  : 'bg-white shadow-xs border-slate-200 hover:border-slate-450'
              }`}
            >
              <h3 className={`font-mono text-sm uppercase tracking-[3px] border-b pb-4 mb-6 ${
                isDarkMode ? 'text-[#00d4ff] border-[#00d4ff]/10' : 'text-slate-900 border-slate-200'
              }`}>
                {group.category}
              </h3>

              <div className="space-y-5 flex-grow">
                {group.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className={`font-sans font-light tracking-[0.5px] ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-800'}`}>
                        {skill.name}
                      </span>
                      <span className={`font-mono text-[10px] ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-700 font-bold'}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className={`h-[2px] w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-[#4a6d8c]/10' : 'bg-slate-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1.2, delay: skillIdx * 0.08 + groupIdx * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${
                          isDarkMode ? 'from-[#00d4ff] to-[#39ff14]' : 'from-blue-600 to-cyan-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
