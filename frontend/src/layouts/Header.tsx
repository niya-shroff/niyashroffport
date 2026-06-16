import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearch from '../components/common/GlobalSearch';
import ThemeToggle from '../components/common/ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [creativeDropdownOpen, setCreativeDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { path: '/', label: 'HOME' },
    // Work Dropdown
    {
      label: 'WORK',
      dropdown: [
        { path: '/technical', label: 'PROJECTS' },
        { path: '/experience', label: 'EXPERIENCE' },
        { path: '/education', label: 'EDUCATION' },
      ]
    },
    // Creative Dropdown
    {
      label: 'CREATIVE',
      dropdown: [
        { path: '/writing', label: 'WRITING' },
        { path: '/photography', label: 'PHOTOGRAPHY' },
        { path: '/videography', label: 'VIDEOGRAPHY' },
      ]
    },
    { path: '/contact', label: 'CONTACT' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-serif text-sm tracking-wide transition-all duration-300 ${isActive ? 'text-coral font-semibold border-b-2 border-coral/80 pb-0.5' : 'text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white'
    }`;

  const dropdownLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 font-serif text-sm tracking-wide transition-all duration-300 ${isActive ? 'bg-coral/10 text-coral border-l-2 border-coral font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-white border-l-2 border-transparent'
    }`;

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold font-serif text-gray-900 dark:text-white flex items-center gap-2 group">
            <span className="text-ink dark:text-white font-serif tracking-tight font-medium hover:text-coral transition-colors">
              Niya Shroff
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => item.label === 'WORK' ? setWorkDropdownOpen(true) : setCreativeDropdownOpen(true)}
                    onMouseLeave={() => item.label === 'WORK' ? setWorkDropdownOpen(false) : setCreativeDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 font-serif text-sm tracking-wide text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white transition-colors duration-200 py-2">
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${item.label === 'WORK' ? (workDropdownOpen ? 'rotate-180 text-coral' : '') : (creativeDropdownOpen ? 'rotate-180 text-coral' : '')}`} />
                    </button>
                    <AnimatePresence>
                      {((item.label === 'WORK' && workDropdownOpen) || (item.label === 'CREATIVE' && creativeDropdownOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-0 w-48 bg-white/95 dark:bg-[#1A2333]/95 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/5 shadow-lg overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={dropdownLinkClass}
                              onClick={() => {
                                setWorkDropdownOpen(false);
                                setCreativeDropdownOpen(false);
                              }}
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={linkClass}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Search and Theme Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-slate-600 dark:text-slate-300 hover:text-coral transition-colors p-2"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <ThemeToggle />
            </div>

            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-4"></div>

            <div className="flex items-center space-x-4">
              <a href="https://github.com/niya-shroff" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-coral transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/niya-shroff" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-coral transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:contact@niyashroff.me" className="text-slate-600 dark:text-slate-300 hover:text-coral transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-600 dark:text-slate-300 hover:text-coral transition-colors p-2"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-background/95 border-t border-black/5 dark:border-white/5 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
                <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClass}>HOME</NavLink>

                <div className="space-y-3">
                  <div className="font-serif text-coral text-xs tracking-widest uppercase">WORK //</div>
                  <NavLink to="/technical" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">PROJECTS</NavLink>
                  <NavLink to="/experience" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">EXPERIENCE</NavLink>
                  <NavLink to="/education" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">EDUCATION</NavLink>
                </div>

                <div className="space-y-3">
                  <div className="font-serif text-coral text-xs tracking-widest uppercase">CREATIVE //</div>
                  <NavLink to="/photography" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">PHOTOGRAPHY</NavLink>
                  <NavLink to="/videography" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">VIDEOGRAPHY</NavLink>
                  <NavLink to="/writing" onClick={() => setIsOpen(false)} className="pl-4 text-slate-600 dark:text-slate-300 hover:text-ink dark:hover:text-white block font-serif text-sm">WRITING</NavLink>
                </div>

                <NavLink to="/contact" onClick={() => setIsOpen(false)} className={linkClass}>CONTACT</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;