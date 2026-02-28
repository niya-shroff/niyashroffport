import { Link } from 'react-router-dom';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Niya Shroff</h3>
              <p className="text-gray-400 leading-relaxed">
                Just another human being on this beautiful planet, trying to make sense of it all.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/technical" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-medium mb-4">I'm a/an...</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Engineer</li>
                <li>Writer</li>
                <li>Photographer</li>
                <li>Filmmaker</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
                <span>Made with</span>
                <Heart size={16} className="text-red-400" />
                <span>and</span>
                <Code size={16} className="text-emerald-400" />
                <span>by </span>
                <span className="text-gray-400">
                  Niya Shroff
                </span>
              </div>

              <div className="text-gray-400">
                © {new Date().getFullYear()} Niya Shroff. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;