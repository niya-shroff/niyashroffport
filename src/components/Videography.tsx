import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEOS = [
    {
        id: 1,
        title: 'Cinematic Journey',
        thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
        platform: 'YouTube'
    },
    {
        id: 2,
        title: 'Urban Rhythm',
        thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80',
        platform: 'Vimeo'
    },
    {
        id: 3,
        title: 'Nature Documentary',
        thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80',
        platform: 'Drive'
    }
];

const Videography = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-emerald-400">Videography</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Visual storytelling through motion and sound.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VIDEOS.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 group"
                        >
                            <div className="relative aspect-video bg-gray-900">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-emerald-500/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg group-hover:bg-emerald-400">
                                        <Play fill="white" className="text-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 border border-emerald-500/30">
                                    {video.platform}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{video.title}</h3>
                                <p className="text-gray-400 text-sm">
                                    Video description placeholder. Click to play functionality would be integrated here with specific embed codes.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Videography;
