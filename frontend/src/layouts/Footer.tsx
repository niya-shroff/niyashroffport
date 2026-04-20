import { Link } from 'react-router-dom';
import { Heart, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-800 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8 border-b border-gray-800/50 pb-8 relative">
            {/* Tape detail top border */}
            <div className="absolute top-0 left-1/4 w-32 h-1 bg-primary/20" />

            {/* Brand */}
            <div>
              <h3 className="text-xl font-mono text-primary mb-4 tracking-tighter">[NS._]</h3>
              <p className="text-muted text-sm font-mono leading-relaxed">
                Sys.log: "Just another human being on this beautiful planet, trying to make sense of it all."
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-mono text-xs tracking-widest mb-4">++ QUICK_LINKS</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-muted hover:text-primary transition-colors duration-200 font-mono text-xs uppercase">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/technical" className="text-muted hover:text-primary transition-colors duration-200 font-mono text-xs uppercase">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="text-muted hover:text-primary transition-colors duration-200 font-mono text-xs uppercase">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted hover:text-primary transition-colors duration-200 font-mono text-xs uppercase">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-mono text-xs tracking-widest mb-4">++ CAPABILITIES</h4>
              <ul className="space-y-3 text-muted font-mono text-xs uppercase">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-emerald rounded-full"></div> Engineer</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-emerald rounded-full"></div> Writer</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-emerald rounded-full"></div> Photographer</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-accent-emerald rounded-full"></div> Filmmaker</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-muted text-xs font-mono mb-4 md:mb-0">
                <span>COMPILED WITH</span>
                <Heart size={14} className="text-accent-crimson animate-pulse" />
                <span>AND</span>
                <Activity size={14} className="text-primary" />
                <span>BY</span>
                <span className="text-white">NIYA_SHROFF</span>
              </div>

              <div className="text-muted text-xs font-mono">
                SYS.DATE: {new Date().getFullYear()} // ALL_RIGHTS_RESERVED.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;