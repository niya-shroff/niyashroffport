import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { X, Upload, Loader2, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WritingUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

interface WritingForm {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
}

const WritingUploadModal = ({ isOpen, onClose, onUploadSuccess }: WritingUploadModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<WritingForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: WritingForm) => {
        setIsLoading(true);
        setError(null);
        try {
            // Insert into Database
            const { error: dbError } = await supabase.from('writings').insert({
                title: data.title,
                category: data.category,
                content: data.content, // Storing full content
                // excerpt, date, readTime are usually derived or simpler in DB, adapting to schema:
                // Schema has: title, content, category, published_date
                published_date: data.date,
                // We'll store excerpt/readTime in content or metadata if needed, but for now map simple fields
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
                                <PenTool className="text-green-500" />
                                Add New Writing
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
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Reflections on AI"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                    <input
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Tech"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                                    <input
                                        {...register('date', { required: 'Date is required' })}
                                        type="date"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Content (Markdown supported)</label>
                                <textarea
                                    {...register('content', { required: 'Content is required' })}
                                    rows={8}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                    placeholder="# My thoughts..."
                                />
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
                                    className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            Publish Writing
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

export default WritingUploadModal;
