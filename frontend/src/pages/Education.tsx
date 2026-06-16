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
                    element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background'), 2000);
                }
            }, 500);
        }
    }, [location]);

    return (
        <div className="min-h-screen pt-28 pb-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 bg-mint/30 dark:bg-mint/10 px-5 py-2 rounded-lg border border-mint/20 inline-flex mb-6 mt-4">
                        <GraduationCap className="text-ink dark:text-mint" size={18} />
                        <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Academic Log</h2>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
                        Education & Studies
                    </h1>

                    <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
                        A retrospective look at my university days and coursework.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-16 mt-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            id={`edu-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative grid lg:grid-cols-12 gap-8 items-start"
                        >
                            
                            {/* Left Column: Degree & School */}
                            <div className="lg:col-span-5 card p-8 h-full bg-white/70 dark:bg-[#1D1A22]/70 border border-black/5 dark:border-white/5 relative">
                                <h3 className="text-xl font-serif font-bold text-ink dark:text-white mb-2 leading-tight">{edu.degree}</h3>
                                <p className="font-serif text-coral text-sm font-medium mb-6">{edu.school}</p>

                                <div className="space-y-3 font-serif text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>{edu.period}</span>
                                    </div>
                                    {edu.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-slate-400" />
                                            <span>{edu.location}</span>
                                        </div>
                                    )}
                                    {edu.honors && (
                                        <div className="flex items-center gap-2 text-pink dark:text-pink/80">
                                            <Award size={14} />
                                            <span>{edu.honors}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Right Column: Descriptions & Details */}
                            <div className="lg:col-span-7 relative pt-4">
                                
                                <div className="mt-20 card bg-white/50 dark:bg-[#1D1A22]/50 p-6 pt-16 relative">
                                    {/* Relevant Courses */}
                                    {edu.courses && (
                                        <div className="mb-8 border-b border-black/5 dark:border-white/5 pb-6">
                                            <h4 className="font-serif font-semibold text-sm text-ink dark:text-white mb-4">Coursework</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {edu.courses.map((course, courseIndex) => (
                                                    <span
                                                        key={courseIndex}
                                                        className="font-serif text-xs bg-lavender/30 text-ink dark:text-lavender px-2.5 py-0.5 rounded-md"
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
                                            <h4 className="font-serif font-semibold text-sm text-ink dark:text-white mb-4 flex items-center gap-2">
                                                <Users size={14} className="text-coral" />
                                                <span>Campus Activities</span>
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {edu.activities.map((activity, actIndex) => (
                                                    <div key={actIndex} className="bg-white/60 dark:bg-[#1D1A22]/60 border border-black/5 dark:border-white/5 p-4 rounded-xl hover:shadow-sm transition-shadow">
                                                        <h5 className="font-serif font-semibold text-sm text-coral mb-2">{activity.title}</h5>
                                                        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">{activity.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Center Connector line for Desktop */}
                            <div className="hidden lg:block absolute left-[41.6%] top-1/2 w-[8.3%] h-[1px] bg-black/10 dark:bg-white/10"></div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
