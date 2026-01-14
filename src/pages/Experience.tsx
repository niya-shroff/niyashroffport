import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';

const Experience = () => {

  const getTypeColor = (type: string) => {
    const colors = {
      'Seasonal': 'bg-blue-900/30 text-blue-300 border-blue-700/30',
      'Part-time': 'bg-green-900/30 text-green-300 border-green-700/30',
      'Internship': 'bg-purple-900/30 text-purple-300 border-purple-700/30',
      'Research': 'bg-amber-900/30 text-amber-300 border-amber-700/30',
      'Founder': 'bg-emerald-900/30 text-emerald-300 border-emerald-700/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-900/30 text-gray-300 border-gray-700/30';
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
          <p className="text-gray-400 text-lg max-w-2xl">
            My professional journey and career highlights.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-gray-700/50 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-900 border-2 border-emerald-500 rounded-full"></div>

              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-sm hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getTypeColor(exp.type)}`}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;