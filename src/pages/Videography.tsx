import { useState, useMemo, useEffect } from 'react';
import { Play, X, Search, Filter, Trash2, Plus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Video } from '../types';
import { useAuth } from '../context/AuthContext';
import VideoUploadModal from '../components/admin/VideoUploadModal';

const Videography = () => {
    const { user, signOut } = useAuth();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('All');
    const [dbVideos, setDbVideos] = useState<Video[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const location = useLocation();

    // Fetch videos from Supabase
    useEffect(() => {
        const fetchVideos = async () => {
            const { data } = await supabase.from('videos').select('*');
            if (data) {
                // Ensure the data matches the Video interface
                const typedData = data.map(v => ({
                    id: v.id,
                    title: v.title,
                    url: v.url,
                    thumbnail: v.thumbnail_url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80', // Fallback
                    duration: '0:00', // Placeholder as we don't store duration yet
                    views: 'New', // Placeholder
                    platform: v.category,
                    category: v.category
                }));
                setDbVideos(typedData);
            }
        };
        fetchVideos();

        // Optional: Subscribe to realtime changes
        const channel = supabase
            .channel('public:videos')
            .on('postgres_changes', { event: '*', schema: 'supabase_schema', table: 'videos' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    const newVideo = payload.new;
                    setDbVideos(prev => [...prev, {
                        id: newVideo.id,
                        title: newVideo.title,
                        url: newVideo.url,
                        thumbnail: newVideo.thumbnail_url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
                        duration: '0:00',
                        views: 'New',
                        platform: newVideo.category,
                        category: newVideo.category
                    }]);
                } else if (payload.eventType === 'DELETE') {
                    setDbVideos(prev => prev.filter(v => v.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const allVideos = useMemo(() => dbVideos, [dbVideos]);

    // Scroll to hash on mount
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900');
                    setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900'), 2000);
                }
            }, 500);
        }
    }, [location]);

    const platforms = useMemo(() => ['All', ...Array.from(new Set(allVideos.map(v => v.platform)))], [allVideos]);

    const filteredVideos = useMemo(() => {
        return allVideos.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPlatform = selectedPlatform === 'All' || video.platform === selectedPlatform;
            return matchesSearch && matchesPlatform;
        });
    }, [searchQuery, selectedPlatform]);

    const handleDelete = async (e: React.MouseEvent, videoId: number) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this video?')) return;

        const videoToDelete = dbVideos.find(v => v.id === videoId);
        if (videoToDelete && videoToDelete.thumbnail && videoToDelete.thumbnail.includes('portfolio-assets')) {
            const match = videoToDelete.thumbnail.match(/portfolio-assets\/(.*)/);
            if (match) {
                const filePath = match[1];
                await supabase.storage.from('portfolio-assets').remove([filePath]);
            }
        }

        const { error } = await supabase.from('videos').delete().eq('id', videoId);
        if (error) {
            alert('Error deleting video: ' + error.message);
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
                        <h2 className="text-4xl font-bold text-primary">Videography</h2>
                        {user && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2 shadow-lg shadow-secondary/25"
                                >
                                    <Plus size={20} />
                                    <span>Add Video</span>
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
                        Visual storytelling through motion. Selected works from commercial and personal projects.
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <select
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
                            >
                                {platforms.map(platform => (
                                    <option key={platform} value={platform}>{platform}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.length > 0 ? (
                        filteredVideos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                id={`video-${video.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedVideo(video.url)}
                            >
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-800">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                                            <Play size={20} fill="currentColor" className="ml-1" />
                                        </div>
                                    </div>
                                    {video.duration !== '0:00' && (
                                        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                                            {video.duration}
                                        </div>
                                    )}
                                    {user && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <button
                                                onClick={(e) => handleDelete(e, video.id)}
                                                className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors transform hover:scale-105"
                                                title="Delete Video"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700">{video.platform}</span>
                                    <span>•</span>
                                    <span>{video.views}</span>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p className="text-lg">No videos found matching your criteria.</p>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {selectedVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <div className="absolute top-4 right-4 z-50">
                                <button
                                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                                    onClick={() => setSelectedVideo(null)}
                                >
                                    <X size={32} />
                                </button>
                            </div>
                            <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={selectedVideo}
                                    title="Video Player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <VideoUploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onUploadSuccess={() => { }}
                />
            </div>
        </div>
    );
};

export default Videography;
