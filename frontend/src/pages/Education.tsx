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
        <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 tape-edge bg-surface p-4 border border-gray-800 rotate-[1deg] inline-block mb-4">
                        <GraduationCap className="text-accent-emerald" size={24} />
                        <h2 className="text-2xl font-mono text-white tracking-widest uppercase">ACADEMIC_LOGS</h2>
                    </div>
                    <div className="font-handwriting text-accent-crimson text-2xl rotate-[-2deg] ml-12">
                        i miss college :(
                    </div>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-16 mt-16">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            id={`edu-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative grid lg:grid-cols-12 gap-8 items-start"
                        >
                            
                            {/* Left Column: Degree & School (Sci-Fi Data Block) */}
                            <div className="lg:col-span-5 card p-8 h-full bg-surface/80 backdrop-blur border-l-2 border-l-accent-emerald">
                                <h3 className="text-xl font-bold font-sans text-white mb-2 uppercase">{edu.degree}</h3>
                                <p className="font-mono text-accent-emerald text-sm tracking-wider mb-6">{edu.school}</p>

                                <div className="space-y-3 font-mono text-xs text-muted mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-500" />
                                        <span>{edu.period}</span>
                                    </div>
                                    {edu.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-500" />
                                            <span>{edu.location}</span>
                                        </div>
                                    )}
                                    {edu.honors && (
                                        <div className="flex items-center gap-2 text-accent-crimson/80">
                                            <Award size={14} />
                                            <span>{edu.honors}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Top right decorative brackets */}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className="w-1 h-3 bg-gray-700 block"></span>
                                    <span className="w-1 h-3 bg-gray-700 block"></span>
                                </div>
                            </div>
                            
                            {/* Right Column: Descriptions & Details (Scrapbook Notes) */}
                            <div className="lg:col-span-7 relative pt-4">
                                
                                <div className="absolute -top-10 -right-4 note-panel shadow-lg rotate-[2deg] z-10 w-[80%] max-w-sm">
                                    <p className="font-sans text-sm text-gray-800 leading-relaxed font-semibold italic">
                                        "{edu.description}"
                                    </p>
                                </div>
                                
                                <div className="mt-20 card bg-surface/50 p-6 pt-16 relative perspective-1000">
                                    {/* Relevant Courses */}
                                    {edu.courses && (
                                        <div className="mb-8 border-b border-gray-800 pb-6">
                                            <h4 className="font-mono text-[10px] text-muted mb-4 uppercase tracking-widest">&gt; coursework_modules</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {edu.courses.map((course, courseIndex) => (
                                                    <span
                                                        key={courseIndex}
                                                        className="font-mono text-[10px] text-gray-300 border border-gray-700 px-2 py-1 uppercase"
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
                                            <h4 className="font-mono text-[10px] text-muted mb-4 flex items-center gap-2 uppercase tracking-widest">
                                                <Users size={12} className="text-primary" />
                                                &gt; EXTRACURRICULAR_UNITS
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {edu.activities.map((activity, actIndex) => (
                                                    <div key={actIndex} className="bg-background border border-gray-800 p-3 hover:border-primary/50 transition-colors">
                                                        <h5 className="font-mono text-xs text-primary mb-2 uppercase">{activity.title}</h5>
                                                        <p className="text-gray-400 text-xs leading-relaxed font-sans">{activity.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Center Connector line for Desktop */}
                            <div className="hidden lg:block absolute left-[41.6%] top-1/2 w-[8.3%] h-[1px] bg-gray-800"></div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
