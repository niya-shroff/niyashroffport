import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearch from '../components/common/GlobalSearch';

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
    { path: '/', label: 'Home' },
    // Work Dropdown
    {
      label: 'Work',
      dropdown: [
        { path: '/technical', label: 'Projects' },
        { path: '/experience', label: 'Experience' },
        { path: '/education', label: 'Education' },
      ]
    },
    // Creative Dropdown
    {
      label: 'Creative',
      dropdown: [
        { path: '/photography', label: 'Photography' },
        { path: '/videography', label: 'Videography' },
        { path: '/writing', label: 'Writing' },
      ]
    },
    { path: '/contact', label: 'Contact' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
    }`;

  const dropdownLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 text-sm transition-colors duration-200 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 group-hover:from-blue-500 group-hover:to-primary transition-all duration-500">
              NS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => item.label === 'Work' ? setWorkDropdownOpen(true) : setCreativeDropdownOpen(true)}
                    onMouseLeave={() => item.label === 'Work' ? setWorkDropdownOpen(false) : setCreativeDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2">
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${item.label === 'Work' ? (workDropdownOpen ? 'rotate-180' : '') : (creativeDropdownOpen ? 'rotate-180' : '')}`} />
                    </button>
                    <AnimatePresence>
                      {((item.label === 'Work' && workDropdownOpen) || (item.label === 'Creative' && creativeDropdownOpen)) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-0 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
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

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-primary transition-colors p-2"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <div className="w-px h-6 bg-gray-700 mx-4"></div>

            <div className="flex items-center space-x-4">
              <a href="https://github.com/niya-shroff" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/niya-shroff" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:nshroff@umass.edu" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-primary transition-colors p-2"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
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
              className="lg:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClass}>Home</NavLink>
                <div className="font-medium text-gray-500 pt-2 pb-1 text-xs uppercase tracking-wider">Work</div>
                <NavLink to="/technical" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Projects</NavLink>
                <NavLink to="/experience" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Experience</NavLink>
                <NavLink to="/education" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Education</NavLink>
                <div className="font-medium text-gray-500 pt-2 pb-1 text-xs uppercase tracking-wider">Creative</div>
                <NavLink to="/photography" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Photography</NavLink>
                <NavLink to="/videography" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Videography</NavLink>
                <NavLink to="/writing" onClick={() => setIsOpen(false)} className="pl-4 text-gray-300 hover:text-white block">Writing</NavLink>
                <NavLink to="/contact" onClick={() => setIsOpen(false)} className={linkClass}>Contact</NavLink>
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