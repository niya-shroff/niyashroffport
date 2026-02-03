import { useState, useMemo, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Search, Filter, Trash2, Plus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Photo } from '../types';
import { useAuth } from '../context/AuthContext';
import PhotoUploadModal from '../components/admin/PhotoUploadModal';

const Photography = () => {
    const { user, signOut } = useAuth();
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dbPhotos, setDbPhotos] = useState<Photo[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const location = useLocation();

    // Fetch photos from Supabase
    useEffect(() => {
        const fetchPhotos = async () => {
            const { data } = await supabase.from('photos').select('*');
            if (data) {
                // Ensure the data matches the Photo interface
                const typedData = data.map(p => ({
                    id: p.id,
                    url: p.url,
                    title: p.title,
                    category: p.category,
                    location: p.location
                }));
                setDbPhotos(typedData);
            }
        };
        fetchPhotos();

        // Optional: Subscribe to realtime changes
        const channel = supabase
            .channel('public:photos')
            .on('postgres_changes', { event: '*', schema: 'supabase_schema', table: 'photos' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setDbPhotos(prev => [...prev, payload.new as Photo]);
                } else if (payload.eventType === 'DELETE') {
                    setDbPhotos(prev => prev.filter(p => p.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const allPhotos = useMemo(() => dbPhotos, [dbPhotos]);

    // Scroll to hash on mount
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Provide visual cue
                    element.classList.add('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900');
                    setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900'), 2000);
                }
            }, 500);
        }
    }, [location]);

    const categories = useMemo(() => ['All', ...Array.from(new Set(allPhotos.map(p => p.category)))], [allPhotos]);

    const filteredPhotos = useMemo(() => {
        return allPhotos.filter(photo => {
            const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                photo.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
        }
    };

    const handleDelete = async (e: React.MouseEvent, photoId: number) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this photo?')) return;

        const photoToDelete = dbPhotos.find(p => p.id === photoId);
        if (photoToDelete) {
            // Extract file path from public URL
            // URL format: .../portfolio-assets/photos/filename
            const match = photoToDelete.url.match(/portfolio-assets\/(.*)/);
            if (match) {
                const filePath = match[1];
                const { error: storageError } = await supabase.storage
                    .from('portfolio-assets')
                    .remove([filePath]);

                if (storageError) {
                    console.error('Error deleting file from storage:', storageError);
                    // Decide if we want to stop here or verify if user wants to force delete DB row anyway
                    // For now, proceed to delete DB row but log error
                }
            }
        }

        const { error } = await supabase.from('photos').delete().eq('id', photoId);
        if (error) {
            alert('Error deleting photo: ' + error.message);
        }
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
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-4xl font-bold text-primary">Photography</h2>
                        {user && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
                                >
                                    <Plus size={20} />
                                    <span>Add Photo</span>
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mb-8">
                        Capturing moments in time. A collection of shots from my travels and daily life.
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPhotos.length > 0 ? (
                        filteredPhotos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                id={`photo-${photo.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-800 cursor-pointer"
                                onClick={() => setSelectedPhotoIndex(index)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        {user && ( // Only show delete for logged in users
                                            <button
                                                onClick={(e) => handleDelete(e, photo.id)}
                                                className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors transform hover:scale-105"
                                                title="Delete Photo"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-white mb-1">{photo.title}</h3>
                                        <p className="text-sm text-primary font-medium mb-2">{photo.location}</p>
                                        <div className="flex items-center text-gray-300 text-xs">
                                            <ZoomIn size={14} className="mr-1" />
                                            View Full Size
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p className="text-lg">No photos found matching your criteria.</p>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {selectedPhotoIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                            onClick={() => setSelectedPhotoIndex(null)}
                        >
                            <button
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                                onClick={() => setSelectedPhotoIndex(null)}
                            >
                                <X size={32} />
                            </button>

                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                                onClick={handlePrev}
                            >
                                <ChevronLeft size={48} />
                            </button>

                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                                onClick={handleNext}
                            >
                                <ChevronRight size={48} />
                            </button>

                            <motion.div
                                key={selectedPhotoIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={filteredPhotos[selectedPhotoIndex].url}
                                    alt={filteredPhotos[selectedPhotoIndex].title}
                                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                />
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md text-center">
                                    <h3 className="text-white font-bold text-lg">{filteredPhotos[selectedPhotoIndex].title}</h3>
                                    <p className="text-primary text-sm">{filteredPhotos[selectedPhotoIndex].location}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <PhotoUploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onUploadSuccess={() => { }} // State updated via realtime subscription
                />
            </div>
        </div>
    );
};

export default Photography;
