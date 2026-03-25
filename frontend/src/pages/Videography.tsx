import { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const staticVideos = [];

const Videography = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    // const [dbVideos] = useState<any[]>(staticVideos);
    const location = useLocation();

    // const allVideos = useMemo(() => dbVideos, [dbVideos]);

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
                        'ring-offset-gray-900'
                    );
                    setTimeout(
                        () =>
                            element.classList.remove(
                                'ring-4',
                                'ring-primary',
                                'ring-offset-4',
                                'ring-offset-gray-900'
                            ),
                        2000
                    );
                }
            }, 500);
        }
    }, [location]);

    // const platforms = useMemo(
    //     () => ['All', ...Array.from(new Set(allVideos.map(v => v.platform)))],
    //     [allVideos]
    // );

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-4xl font-bold text-primary">
                            Videography
                        </h2>
                    </div>

                    <p className="text-gray-400 text-lg max-w-2xl mb-8">
                        Visual storytelling through motion. Selected works from
                        submitted and personal projects.
                    </p>

                    {/* Controls (optional – can remove entirely if desired) */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <Filter
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <select
                                value={selectedPlatform}
                                onChange={(e) =>
                                    setSelectedPlatform(e.target.value)
                                }
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
                            >
                                {/* {platforms.map(platform => (
                                    <option key={platform} value={platform}>
                                        {platform}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Coming Soon Message */}
                <div className="flex items-center justify-center py-24">
                    <p className="text-2xl md:text-3xl font-semibold text-primary text-center text-gray-400 text-lg max-w-2xl mb-8">
                        Films and edits coming shortly!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Videography;