import { useState, useMemo, useEffect } from 'react';
import { Calendar, MapPin, Building, ExternalLink, Search, Filter, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { experiences } from '../data/experience';

const Experience = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
          setTimeout(() => element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background'), 2000);
        }
      }, 500);
    }
  }, [location]);

  const types = useMemo(() => ['All', ...Array.from(new Set(experiences.map(e => e.type)))], []);

  const getTypeColor = (type: string) => {
    const colors = {
      'Seasonal': 'bg-blue-900/30 text-primary border-primary/30',
      'Part-time': 'bg-green-900/30 text-accent-emerald border-accent-emerald/30',
      'Internship': 'bg-purple-900/30 text-purple-400 border-purple-400/30',
      'Research': 'bg-amber-900/30 text-amber-400 border-amber-400/30',
      'Founder': 'bg-red-900/30 text-accent-crimson border-accent-crimson/30',
      'Full-time': 'bg-primary/20 text-primary border-primary/50 text-glow'
    };
    return colors[type as keyof typeof colors] || 'bg-surfaceHover text-muted border-gray-700';
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

  const getExperienceIndex = (exp: typeof experiences[0]) => {
    return experiences.indexOf(exp);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 border border-gray-800 p-4 tape-edge bg-surface mb-8 inline-block rotate-[-1deg]">
            <Briefcase className="text-primary" />
            <h2 className="text-2xl font-mono tracking-widest text-gray-900 dark:text-white uppercase">Professional_Exp</h2>
          </div>
          
          <div className="font-handwriting text-2xl text-accent-crimson max-w-2xl mb-8 rotate-[-2deg] ml-8">
             the places I've been & things I've built!
          </div>

          {/* Controls - Terminal Style */}
          <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 border border-gray-800 max-w-4xl relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
            
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
              <input
                type="text"
                placeholder="EXECUTE SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-4 py-2 text-gray-900 dark:text-white font-mono text-sm placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-8 py-2 text-gray-900 dark:text-white font-mono text-sm appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                id={`exp-${getExperienceIndex(exp)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-gray-800 hover:border-primary/50 transition-colors duration-300"
              >
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-4 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:bg-primary group-hover:shadow-[0_0_10px_#0ea5e9] transition-all"></div>

                <div className="card pt-8 relative overflow-visible mt-4">
                  {/* Scrapbook attached note */}
                  <div className="absolute -top-4 -right-4 note-panel !p-2 !text-xs !rotate-[3deg] shadow-lg max-w-[150px] z-20">
                     <div className="flex items-center gap-1 font-mono text-gray-800 border-b border-gray-300 pb-1 mb-1">
                       <Calendar size={12} />
                       {exp.period}
                     </div>
                     <div className="flex items-center gap-1 font-mono text-gray-800">
                       <MapPin size={12} />
                       {exp.location}
                     </div>
                  </div>

                  <div className="mb-6 border-b border-gray-800 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold font-sans text-gray-900 dark:text-white uppercase">{exp.title}</h3>
                        <span className={`px-2 py-0.5 font-mono text-[10px] border tracking-wider uppercase ${getTypeColor(exp.type)}`}>
                            {exp.type}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider">
                      <Building size={14} />
                      <p>{exp.company}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 font-sans leading-relaxed text-sm">{exp.description}</p>

                  <div className="mb-6">
                    <h5 className="font-mono text-muted text-[10px] mb-3 uppercase tracking-widest">&gt;&gt; Key_Achievements</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-3">
                          <span className="text-primary mt-1.5 min-w-[6px] h-1.5 bg-primary clip-triangle"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  {exp.links && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-3">
                        {exp.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider bg-surface border border-gray-700 text-primary hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                          >
                            {link.title}
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800 mt-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-background text-gray-600 dark:text-gray-400 px-2 py-1 font-mono text-[10px] uppercase tracking-widest border border-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-muted font-mono">
              <p className="animate-pulse">&gt; ERR: NO_RECORDS_FOUND</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .clip-triangle {
            clip-path: polygon(100% 50%, 0 0, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default Experience;