import { Compass } from 'lucide-react';

export default function Footer({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <footer className={`w-full border-t py-8 transition-colors duration-500 ${
      isDarkMode ? 'border-[#00d4ff]/10 bg-[#000000]/65' : 'border-slate-200 bg-white'
    }`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center font-mono text-[10px] tracking-widest ${
        isDarkMode ? 'text-[#4a6d8c]' : 'text-slate-500'
      }`}>
        {/* Left Side */}
        {/* The compass turns when you hover the credit line, rather than forever. */}
        <div className="group flex items-center gap-2">
          <Compass
            className={`w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-180 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 ${
              isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'
            }`}
          />
          <span>© 2026 SAISOUMMEIN &bull; DATA SCIENTIST</span>
        </div>

        {/* Right Side */}
        <div className="text-right">
          <span>BUILT WITH CODES, DELIVERED WITH PRECISION.</span>
        </div>
      </div>
    </footer>
  );
}
