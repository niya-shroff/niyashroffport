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
        <div className="min-h-screen pt-28 pb-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 bg-pink/20 px-5 py-2 rounded-lg border border-pink/10 inline-flex mb-6 mt-4">
                        <Video className="text-pink" size={18} />
                        <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Motion & Edits</h2>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
                        Video Storytelling
                    </h1>

                    <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
                        Visual storytelling through motion. Selected works from creative and personal projects.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-[#1D1A22]/50 p-4 border border-black/5 dark:border-white/5 rounded-2xl max-w-4xl relative">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search film archives..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors"
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedPlatform}
                                onChange={(e) =>
                                    setSelectedPlatform(e.target.value)
                                }
                                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer capitalize"
                            >
                                <option value="All">All Platforms</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                </motion.div>

                {/* Coming Soon Message */}
                <div className="flex flex-col items-center justify-center py-24 relative">
                    <div className="card p-8 bg-white/80 dark:bg-[#1D1A22]/80 backdrop-blur-md border border-black/5 dark:border-white/5 text-center relative z-10 shadow-lg max-w-lg rotate-[1deg]">
                        {/* Tape effect top */}
                        <div className="absolute -top-3 left-1/3 w-28 h-6 bg-lavender/30 dark:bg-lavender/10 backdrop-blur-[1px] rotate-[-2deg] border border-lavender/10 shadow-sm z-20"></div>

                        <span className="mono-accent bg-pink/30 dark:bg-pink/10 px-2 py-0.5 rounded text-ink dark:text-pink mb-4 inline-block">Rendering</span>
                        <p className="font-handwriting text-3xl md:text-4xl text-slate-700 dark:text-slate-200 mt-2 leading-relaxed">
                            Films, scripts, and video edits coming shortly!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videography;