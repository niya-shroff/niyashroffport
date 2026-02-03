import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { X, Upload, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

interface PhotoForm {
    title: string;
    category: string;
    location: string;
    file: FileList;
}

const PhotoUploadModal = ({ isOpen, onClose, onUploadSuccess }: PhotoUploadModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PhotoForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: PhotoForm) => {
        setIsLoading(true);
        setError(null);
        try {
            const file = data.file[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `photos/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            // 3. Insert into Database
            const { error: dbError } = await supabase.from('photos').insert({
                title: data.title,
                category: data.category,
                location: data.location,
                url: publicUrl,
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
                                <Plus className="text-primary" />
                                Add New Photo
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
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Mountain Sunset"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                    <input
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Nature"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                    <input
                                        {...register('location', { required: 'Location is required' })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Swiss Alps"
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Photo</label>
                                <div className="relative group">
                                    <input
                                        {...register('file', { required: 'Image file is required' })}
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-400
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/20 file:text-primary
                      hover:file:bg-primary/30
                      cursor-pointer
                      bg-gray-800 border border-gray-700 rounded-lg"
                                    />
                                </div>
                                {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>}
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
                                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            Upload Photo
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

export default PhotoUploadModal;
