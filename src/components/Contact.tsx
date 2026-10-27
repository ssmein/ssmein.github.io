import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export default function Contact({ isDarkMode }: { isDarkMode: boolean }) {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Static site: no backend to post to, so hand the message to the visitor's
    // mail client rather than pretending it was delivered.
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}

—
${formData.name}
${formData.email}`);
    window.location.href = `mailto:ssoummein@gmail.com?subject=${subject}&body=${body}`;
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      className={`py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t transition-colors duration-500 mb-10 ${
        isDarkMode ? 'border-[#00d4ff]/10' : 'border-slate-200'
      }`}
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <p className={`font-mono text-xs sm:text-[13px] tracking-[6px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-blue-600'}`}>/* Get In Touch */</p>
          <h2 className={`font-display text-4xl sm:text-5xl tracking-[2px] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Let's Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 lg:w-full">
            <div className={`flex flex-col gap-3 font-mono text-sm ${isDarkMode ? 'text-[#cde8ff]' : 'text-slate-800'}`}>
              <a
                href="mailto:ssoummein@gmail.com"
                className={`flex items-center gap-4 p-4 transition-ui border ${
                  isDarkMode 
                    ? 'border-[#00d4ff]/10 hover:border-[#00d4ff]/30 bg-[#041325]/20 hover:text-[#00d4ff] group' 
                    : 'border-slate-200 bg-white shadow-xs hover:border-slate-400 hover:text-blue-700 group'
                }`}
              >
                <Mail className={`w-4 h-4 transition-colors ${
                  isDarkMode ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' : 'text-slate-400 group-hover:text-blue-700'
                }`} />
                <span>ssoummein@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/saisoummein/"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 transition-ui border ${
                  isDarkMode 
                    ? 'border-[#00d4ff]/10 hover:border-[#00d4ff]/30 bg-[#041325]/20 hover:text-[#00d4ff] group' 
                    : 'border-slate-200 bg-white shadow-xs hover:border-slate-400 hover:text-blue-700 group'
                }`}
              >
                <Linkedin className={`w-4 h-4 transition-colors ${
                  isDarkMode ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' : 'text-slate-400 group-hover:text-blue-700'
                }`} />
                <span>linkedin.com/in/saisoummein/</span>
              </a>

              <a
                href="https://github.com/ssmein"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 transition-ui border ${
                  isDarkMode 
                    ? 'border-[#00d4ff]/10 hover:border-[#00d4ff]/30 bg-[#041325]/20 hover:text-[#00d4ff] group' 
                    : 'border-slate-200 bg-white shadow-xs hover:border-slate-400 hover:text-blue-700 group'
                }`}
              >
                <Github className={`w-4 h-4 transition-colors ${
                  isDarkMode ? 'text-[#4a6d8c] group-hover:text-[#00d4ff]' : 'text-slate-400 group-hover:text-blue-700'
                }`} />
                <span>github.com/ssmein</span>
              </a>

              <div className={`flex items-center gap-4 p-4 select-none border ${
                isDarkMode 
                  ? 'border-[#00d4ff]/5 bg-[#041325]/10 text-[#4a6d8c]' 
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <MapPin className="w-4 h-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={`lg:col-span-7 p-6 sm:p-8 rounded-sm border transition-ui ${
            isDarkMode 
              ? 'bg-[#041325]/30 border-[#00d4ff]/10' 
              : 'bg-white shadow-sm border-slate-200'
          }`}>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className={`font-mono text-sm tracking-[3px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-slate-750 font-bold'}`}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full text-sm sm:text-base px-4 py-3 outline-none transition-ui rounded-sm border ${
                    isDarkMode 
                      ? 'bg-[#000000]/60 border-[#00d4ff]/10 text-[#cde8ff] focus:border-[#00d4ff] placeholder:text-[#4a6d8c]/60' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className={`font-mono text-sm tracking-[3px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-slate-750 font-bold'}`}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full text-sm sm:text-base px-4 py-3 outline-none transition-ui rounded-sm border ${
                    isDarkMode 
                      ? 'bg-[#000000]/60 border-[#00d4ff]/10 text-[#cde8ff] focus:border-[#00d4ff] placeholder:text-[#4a6d8c]/60' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className={`font-mono text-sm tracking-[3px] uppercase ${isDarkMode ? 'text-[#00d4ff]' : 'text-slate-750 font-bold'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full text-sm sm:text-base px-4 py-3 outline-none transition-ui rounded-sm resize-none border ${
                    isDarkMode 
                      ? 'bg-[#000000]/60 border-[#00d4ff]/10 text-[#cde8ff] focus:border-[#00d4ff] placeholder:text-[#4a6d8c]/60' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full sm:w-auto relative px-6 py-3 font-mono text-sm uppercase tracking-[3px] border rounded-sm transition-ui flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] motion-reduce:active:scale-100 disabled:active:scale-100 ${
                    status === 'success'
                      ? isDarkMode 
                        ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/5'
                        : 'border-emerald-500 text-emerald-800 bg-emerald-50 font-bold'
                      : isDarkMode
                        ? 'border-[#00d4ff]/40 text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 disabled:opacity-50'
                        : 'border-slate-300 text-slate-700 hover:border-slate-800 hover:bg-slate-55 disabled:opacity-50'
                  }`}
                >
                  {/* The label changes meaning, so it crossfades rather than
                      snapping — a hard swap here reads as a render glitch. */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status === 'success' ? 'done' : 'idle'}
                      initial={reduceMotion ? false : { opacity: 0, y: 4, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={reduceMotion ? {} : { opacity: 0, y: -3, filter: 'blur(3px)' }}
                      transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-center gap-2"
                    >
                      {status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Draft Opened In Your Mail App</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>

                {/* Status messages in Terminal style */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={`font-mono text-[10px] tracking-wide self-center text-center sm:text-right ${
                        isDarkMode ? 'text-[#39ff14]' : 'text-emerald-700'
                      }`}
                    >
                      &gt; Draft handed to your mail app. Hit send there.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={`font-mono text-[10px] tracking-wide self-center text-center sm:text-right ${
                        isDarkMode ? 'text-red-400' : 'text-blue-600'
                      }`}
                    >
                      &gt; Pipeline error: Missing fields.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
