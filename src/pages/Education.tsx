import { useEffect } from 'react';
import { GraduationCap, Award, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { education } from '../data/education';

const Education = () => {
    const location = useLocation();

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
            }, 500);
        }
    }, [location]);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-primary">Education & Activities</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        My academic background and extracurricular involvement.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            id={`edu-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                        <GraduationCap className="text-primary" size={28} />
                                        {edu.degree}
                                    </h3>
                                    <p className="text-primary font-medium text-lg mb-2">{edu.school}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{edu.period}</span>
                                        </div>
                                        {edu.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                <span>{edu.location}</span>
                                            </div>
                                        )}
                                        {edu.honors && (
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Award size={16} />
                                                <span>{edu.honors}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-8 leading-relaxed text-lg">{edu.description}</p>

                            {/* Relevant Courses */}
                            {edu.courses && (
                                <div className="mb-8">
                                    <h4 className="text-white font-medium mb-4 text-lg">Relevant Courses:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.courses.map((course, courseIndex) => (
                                            <span
                                                key={courseIndex}
                                                className="bg-primary-hover/20 text-primary-hover border-primary/30 hover:bg-primary-hover/30 transition-colors"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Activities and Leadership */}
                            {edu.activities && (
                                <div>
                                    <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-lg">
                                        <Users size={20} />
                                        Activities & Leadership:
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {edu.activities.map((activity, actIndex) => (
                                            <div key={actIndex} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                                                <h5 className="text-primary font-medium mb-2">{activity.title}</h5>
                                                <p className="text-gray-400 text-sm leading-relaxed">{activity.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
