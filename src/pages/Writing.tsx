import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Feather, Search, ExternalLink, Trash2, Plus, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import WritingUploadModal from '../components/admin/WritingUploadModal';

const Writing = () => {
    const { user, signOut } = useAuth();
    const [selectedPoem, setSelectedPoem] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'poems' | 'substack'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dbWritings, setDbWritings] = useState<any[]>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Fetch writings from Supabase
    useEffect(() => {
        const fetchWritings = async () => {
            const { data } = await supabase.from('writings').select('*');
            if (data) {
                setDbWritings(data);
            }
        };
        fetchWritings();

        // Realtime subscription
        const channel = supabase
            .channel('public:writings')
            .on('postgres_changes', { event: '*', schema: 'supabase_schema', table: 'writings' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setDbWritings(prev => [...prev, payload.new]);
                } else if (payload.eventType === 'DELETE') {
                    setDbWritings(prev => prev.filter(w => w.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filteredContent = useMemo(() => {
        const query = searchQuery.toLowerCase();

        const allItems = dbWritings.map(item => {
            const isSubstack = item.category?.toLowerCase().includes('substack');
            return {
                id: item.id,
                title: item.title,
                excerpt: item.content.substring(0, 100) + '...',
                content: item.content,
                // Map category to type. If 'substack', type is substack.
                type: (isSubstack ? 'substack' : 'poem') as 'substack' | 'poem',
                date: item.published_date,
                isStatic: false,
                url: null // DB currently doesn't have URL column, so default to null
            };
        });

        return allItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(query) ||
                item.excerpt.toLowerCase().includes(query);

            if (activeTab === 'all') return matchesSearch;
            if (activeTab === 'poems') return matchesSearch && item.type === 'poem';
            if (activeTab === 'substack') return matchesSearch && item.type === 'substack';
            return false;
        });
    }, [activeTab, searchQuery, dbWritings]);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this writing?')) return;

        const { error } = await supabase.from('writings').delete().eq('id', id);
        if (error) {
            alert('Error deleting writing: ' + error.message);
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
                        <h2 className="text-4xl font-bold text-primary">Writing</h2>
                        {user && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg shadow-green-500/25"
                                >
                                    <Plus size={20} />
                                    <span>Add Writing</span>
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
                        Thoughts put to paper. A collection of poems, short writings, and Substack articles.
                    </p>

                    {/* Search and Filter Controls */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search writings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="flex gap-2 bg-gray-900/50 p-1 rounded-lg border border-gray-700">
                            {(['all', 'poems', 'substack'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 capitalize ${activeTab === tab
                                        ? 'bg-primary text-background shadow-md'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((item, index) => (
                        <motion.div
                            key={`${item.type}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary/50 hover:bg-gray-800/80 cursor-pointer transition-all duration-300 group flex flex-col h-full relative"
                            onClick={() => (item.type === 'poem' || !item.url) ? setSelectedPoem(item) : window.open(item.url, '_blank')}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <Feather className={`h-8 w-8 transition-colors ${item.type === 'poem' ? 'text-primary' : 'text-orange-400'}`} />
                                <div className="flex items-center gap-2">
                                    {item.type === 'substack' && (
                                        <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                    )}
                                    {user && (
                                        <button
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors z-20"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 font-serif italic mb-6 flex-grow">
                                "{item.excerpt}"
                            </p>

                            <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between mt-auto">
                                <div className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${item.type === 'poem'
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-orange-500/10 text-orange-400'
                                    }`}>
                                    {item.type}
                                </div>

                                {item.type === 'substack' && (item as any).date && (
                                    <span className="text-xs text-gray-500 font-mono">
                                        {(item as any).date}
                                    </span>
                                )}

                                {item.type === 'poem' && (
                                    <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                        <BookOpen size={16} className="mr-2" />
                                        Read
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {filteredContent.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p className="text-lg">No writings found matching your search.</p>
                        </div>
                    )}
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

                                <div className="space-y-4 text-center max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                                    {selectedPoem.content.split('\n\n').map((stanza: string, i: number) => (
                                        <p key={i} className="text-gray-300 text-lg font-serif leading-relaxed whitespace-pre-line">
                                            {stanza}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <WritingUploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onUploadSuccess={() => { }}
                />
            </div>
        </div>
    );
};

export default Writing;
