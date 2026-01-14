import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Feather } from 'lucide-react';
import { poems } from '../data/writing';

const Writing = () => {
    const [selectedPoem, setSelectedPoem] = useState<typeof poems[0] | null>(null);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-primary">Writing</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Thoughts put to paper. A collection of poems and short writings.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {poems.map((poem, index) => (
                        <motion.div
                            key={poem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedPoem(poem)}
                            className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/80 cursor-pointer transition-all duration-300 group"
                        >
                            <Feather className="text-emerald-500/50 group-hover:text-primary mb-6 h-8 w-8 transition-colors" />
                            <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                                {poem.title}
                            </h3>
                            <p className="text-gray-400 font-serif italic mb-6">
                                "{poem.excerpt}"
                            </p>
                            <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                <BookOpen size={16} className="mr-2" />
                                Read Poem
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedPoem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                            onClick={() => setSelectedPoem(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-gray-800 rounded-2xl max-w-2xl w-full p-8 md:p-12 relative border border-gray-700 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                                    onClick={() => setSelectedPoem(null)}
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center mb-8">
                                    <Feather className="mx-auto text-primary mb-4 h-10 w-10" />
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                                        {selectedPoem.title}
                                    </h3>
                                    <div className="h-1 w-20 bg-primary-hover/30 mx-auto rounded-full mt-4"></div>
                                </div>

                                <div className="space-y-4 text-center">
                                    {selectedPoem.content.split('\n\n').map((stanza, i) => (
                                        <p key={i} className="text-gray-300 text-lg font-serif leading-relaxed whitespace-pre-line">
                                            {stanza}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Writing;
