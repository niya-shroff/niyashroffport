import { useState, useEffect } from 'react';
import { Search, Filter, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Videography = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add(
                        'ring-4',
                        'ring-primary',
                        'ring-offset-4',
                        'ring-offset-background'
                    );
                    setTimeout(
                        () =>
                            element.classList.remove(
                                'ring-4',
                                'ring-primary',
                                'ring-offset-4',
                                'ring-offset-background'
                            ),
                        2000
                    );
                }
            }, 500);
        }
    }, [location]);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 tape-edge bg-surface px-6 py-3 border border-gray-800 rotate-[1deg] inline-block mb-8 mt-4">
                        <Video className="text-accent-emerald" />
                        <h2 className="text-2xl font-mono text-gray-900 dark:text-white tracking-widest uppercase">VIDEOGRAPHY_LOGS</h2>
                    </div>

                    <div className="font-handwriting text-accent-crimson text-2xl rotate-[-2deg] ml-12 mb-8 max-w-2xl">
                        Visual storytelling through motion. Selected works from submitted and personal projects.
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 border border-gray-800 max-w-4xl relative">
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
                        
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="QUERY_DATABASE..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-4 py-2 text-gray-900 dark:text-white font-mono text-sm placeholder-muted focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <Filter
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                                size={16}
                            />
                            <select
                                value={selectedPlatform}
                                onChange={(e) =>
                                    setSelectedPlatform(e.target.value)
                                }
                                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-8 py-2 text-gray-900 dark:text-white font-mono text-sm appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer uppercase"
                            >
                                <option value="All">ALL</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Coming Soon Message */}
                <div className="flex flex-col items-center justify-center py-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[300px] h-[300px] border border-gray-800 rounded-full animate-spin-slow opacity-50"></div>
                        <div className="absolute w-[200px] h-[200px] border border-gray-800 border-dashed rounded-full animate-reverse-spin opacity-50"></div>
                    </div>
                    
                    <div className="bg-surface/80 border border-gray-800 p-8 backdrop-blur-md text-center relative z-10 z-10 shadow-[0_0_20px_rgba(16,185,129,0.1)] tape-edge rotate-[1deg]">
                        <p className="font-mono text-primary text-xs uppercase tracking-widest mb-4 mb-2">&gt; SYS.STATUS: RENDERING</p>
                        <p className="font-handwriting text-3xl md:text-5xl text-gray-600 dark:text-gray-400">
                            Films and edits coming shortly!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videography;