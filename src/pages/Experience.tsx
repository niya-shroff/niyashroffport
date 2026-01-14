import { useState, useMemo, useEffect } from 'react';
import { Calendar, MapPin, Building, ExternalLink, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { experiences } from '../data/experience';

const Experience = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const location = useLocation();

  // Scroll to hash on mount or hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-gray-900');
          setTimeout(() => element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-gray-900'), 2000);
        }
      }, 500); // Delay to ensure render
    }
  }, [location]);

  const types = useMemo(() => ['All', ...Array.from(new Set(experiences.map(e => e.type)))], []);

  const getTypeColor = (type: string) => {
    const colors = {
      'Seasonal': 'bg-blue-900/30 text-blue-300 border-blue-700/30',
      'Part-time': 'bg-green-900/30 text-green-300 border-green-700/30',
      'Internship': 'bg-purple-900/30 text-purple-300 border-purple-700/30',
      'Research': 'bg-amber-900/30 text-amber-300 border-amber-700/30',
      'Founder': 'bg-emerald-900/30 text-emerald-300 border-emerald-700/30',
      'Full-time': 'bg-primary/20 text-primary border-primary/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-900/30 text-gray-300 border-gray-700/30';
  };

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesSearch =
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'All' || exp.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  // Helper to find original index for ID
  const getExperienceIndex = (exp: typeof experiences[0]) => {
    return experiences.indexOf(exp);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">Professional Experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            My professional journey and career highlights.
          </p>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search roles, companies, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                id={`exp-${getExperienceIndex(exp)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-gray-700/50 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-900 border-2 border-primary rounded-full"></div>

                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white max-w-[80%]">{exp.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs border whitespace-nowrap ${getTypeColor(exp.type)}`}>
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building size={16} className="text-primary" aria-hidden="true" />
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="flex items-center gap-1 mb-1 justify-end">
                        <Calendar size={14} aria-hidden="true" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin size={14} aria-hidden="true" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="mb-6">
                    <h5 className="text-white font-medium mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-primary mt-1.5 min-w-[6px] h-1.5 rounded-full bg-primary"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  {exp.links && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {exp.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-primary-hover/30 text-primary hover:text-primary-hover rounded-md text-sm transition-colors duration-200 border border-transparent hover:border-primary/30"
                          >
                            <ExternalLink size={14} />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No experiences found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;