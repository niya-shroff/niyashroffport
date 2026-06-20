import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background/90 border-t border-black/5 dark:border-white/5 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8 border-b border-black/5 dark:border-white/5 pb-8 relative">

            {/* Brand */}
            <div>
              <h3 className="text-xl font-serif text-ink dark:text-white mb-4">Niya Shroff</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-sans">
                Just another human being on this beautiful planet, trying to make sense of it all.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-ink dark:text-white font-serif font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-coral transition-colors duration-200 font-sans text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/technical" className="text-slate-600 dark:text-slate-400 hover:text-coral transition-colors duration-200 font-sans text-sm">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="text-slate-600 dark:text-slate-400 hover:text-coral transition-colors duration-200 font-sans text-sm">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-coral transition-colors duration-200 font-sans text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Capabilities */}
            <div>
              <h4 className="text-ink dark:text-white font-serif font-semibold text-sm mb-4">Capabilities</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 font-sans text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-skyBlue rounded-full"></div> Software Engineering</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-lavender rounded-full"></div> Creative Writing</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-coral rounded-full"></div> Film Photography</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink rounded-full"></div> Video Storytelling</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-sans mb-4 md:mb-0 group">
                <span>Made with</span>
                <Heart size={14} className="text-coral fill-coral" />
                <span>and</span>
                <span className="text-coral dark:text-lavender transition-transform duration-500 group-hover:rotate-[360deg] select-none font-sans">☻</span>
                <span>by</span>
                <span className="text-ink dark:text-white font-medium">Niya Shroff</span>
              </div>

              <div className="text-slate-500 dark:text-slate-400 text-sm font-sans">
                &copy; {new Date().getFullYear()} // All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;