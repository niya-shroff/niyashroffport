import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Niya Shroff ☻ </h3>
              <p className="text-gray-400 leading-relaxed">
                Software Engineer specializing in full-stack development 
                and innovative technology solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-medium mb-4">Expertise</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Full Stack Development</li>
                <li>Data Analysis</li>
                <li>Web Applications</li>
                <li>Project Management</li>
                <li>Technical Consulting</li>
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
                <span>by Niya Shroff ☻ </span>
              </div>
              
              <div className="text-gray-400 text-sm">
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