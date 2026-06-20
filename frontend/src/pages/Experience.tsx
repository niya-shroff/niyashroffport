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
    <div className="min-h-screen pt-28 pb-16 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 bg-lavender/30 dark:bg-lavender/10 px-5 py-2 rounded-lg border border-lavender/20 inline-flex mb-6 mt-4">
            <Briefcase className="text-ink dark:text-lavender" size={18} />
            <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Career Journal</h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
            Work Experience
          </h1>

          <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
            A chronological timeline of places I've been and things I've built.
          </p>

          {/* Controls - Elegant Card Style */}
          <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-[#1D1A22]/50 p-4 border border-black/5 dark:border-white/5 rounded-2xl max-w-4xl relative">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search experience by company, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer capitalize"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Experiences' : type}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
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
                className="relative pl-8 border-l border-black/10 dark:border-white/10 transition-colors duration-300"
              >
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-4 w-4 h-4 bg-background border-2 border-coral rounded-full transition-all"></div>

                <div className="card pt-8 relative overflow-visible mt-4">
                  {/* Scrapbook attached note - Polaroid styled sticker */}
                  <div className="absolute -top-4 -right-4 bg-[#FFFDFB] border border-black/10 p-3 rotate-[3deg] shadow-md max-w-[170px] z-20 rounded-md">
                    <div className="flex items-center gap-1 font-serif text-xs text-ink/80 border-b border-black/5 pb-1 mb-1">
                      <Calendar size={12} className="text-coral" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1 font-serif text-xs text-ink/80">
                      <MapPin size={12} className="text-skyBlue" />
                      {exp.location}
                    </div>
                  </div>

                  <div className="mb-6 border-b border-black/5 dark:border-white/5 pb-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-serif font-bold text-ink dark:text-white leading-tight">{exp.title}</h3>
                      <span className="bg-lavender/30 text-ink dark:text-lavender px-2 py-0.5 rounded text-[11px] font-serif font-medium">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-coral font-serif font-medium text-sm">
                      <Building size={14} />
                      <p>{exp.company}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 font-sans leading-relaxed text-sm">{exp.description}</p>

                  <div className="mb-6">
                    <h5 className="font-serif font-semibold text-slate-800 dark:text-slate-200 text-sm mb-3">Key Achievements</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2.5">
                          <span className="text-coral mt-1.5 min-w-[6px] h-1.5 bg-coral rounded-full"></span>
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
                            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-serif rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-coral transition-colors duration-200"
                          >
                            {link.title}
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5 mt-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-skyBlue/20 text-ink dark:text-skyBlue px-2 py-0.5 rounded text-[11px] font-serif font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 font-serif italic">
              <p>No job experiences found matching your query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;