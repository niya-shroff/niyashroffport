import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos } from '../data/videography';

const Videography = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-primary">Videography</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Visual storytelling through motion and sound.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
                        >
                            <div className="relative aspect-video bg-gray-900 group cursor-pointer" onClick={() => setSelectedVideo(video.videoUrl)}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-primary-hover/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg group-hover:bg-primary">
                                        <Play fill="white" className="text-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-medium text-primary border border-primary/30">
                                    {video.platform}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{video.title}</h3>
                                <p className="text-gray-400 text-sm">
                                    Video description placeholder. Click thumbnail to watch.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`${selectedVideo}?autoplay=1`}
                                title="Video Player"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Videography;
