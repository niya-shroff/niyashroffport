import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { X, Upload, Loader2, Plus, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

interface VideoForm {
    title: string;
    category: string;
    description: string;
    url: string; // YouTube/Vimeo URL or direct file upload? Assuming URL for now as video files are huge
    thumbnail: FileList;
}

const VideoUploadModal = ({ isOpen, onClose, onUploadSuccess }: VideoUploadModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<VideoForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: VideoForm) => {
        setIsLoading(true);
        setError(null);
        try {
            let thumbnailUrl = '';

            // Upload thumbnail if provided
            if (data.thumbnail && data.thumbnail.length > 0) {
                const file = data.thumbnail[0];
                const fileExt = file.name.split('.').pop();
                const fileName = `thumb_${Math.random()}.${fileExt}`;
                const filePath = `thumbnails/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio-assets')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('portfolio-assets')
                    .getPublicUrl(filePath);

                thumbnailUrl = publicUrl;
            }

            // Insert into Database
            const { error: dbError } = await supabase.from('videos').insert({
                title: data.title,
                category: data.category,
                description: data.description,
                url: data.url, // Storing the link, not the file itself for videos usually
                thumbnail_url: thumbnailUrl,
            });

            if (dbError) throw dbError;

            reset();
            onUploadSuccess();
            onClose();
        } catch (err: any) {
            console.error('Error uploading:', err);
            setError(err.message || 'An error occurred during upload.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Video className="text-secondary" />
                                Add New Video Link
                            </h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input
                                    {...register('title', { required: 'Title is required' })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Cinematic Showreel"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                    <input
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Commercial"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Video URL</label>
                                    <input
                                        {...register('url', { required: 'URL is required' })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        placeholder="https://vimeo..."
                                    />
                                    {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                    placeholder="Short description..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail (Optional)</label>
                                <div className="relative group">
                                    <input
                                        {...register('thumbnail')}
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-400
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-secondary/20 file:text-secondary
                      hover:file:bg-secondary/30
                      cursor-pointer
                      bg-gray-800 border border-gray-700 rounded-lg"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-secondary to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            Save Video
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VideoUploadModal;
