import { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../data/photography';

const Photography = () => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedPhotoIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedPhotoIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
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
                    <h2 className="text-4xl font-bold mb-4 text-primary">Photography</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Capturing moments in time. A collection of my favorite shots.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-800 border border-gray-700 aspect-[4/3]"
                            onClick={() => setSelectedPhotoIndex(index)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white flex flex-col items-center gap-2">
                                    <ZoomIn size={32} className="text-primary" />
                                    <span className="font-medium">{photo.title}</span>
                                    <span className="text-sm text-gray-300">{photo.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedPhotoIndex(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-50"
                            onClick={() => setSelectedPhotoIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors hidden md:block z-50"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors hidden md:block z-50"
                            onClick={handleNext}
                        >
                            <ChevronRight size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={photos[selectedPhotoIndex].url}
                                alt={photos[selectedPhotoIndex].title}
                                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="mt-4 text-center text-white">
                                <p className="text-xl font-medium">{photos[selectedPhotoIndex].title}</p>
                                <p className="text-gray-300 text-sm">{photos[selectedPhotoIndex].category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Photography;
