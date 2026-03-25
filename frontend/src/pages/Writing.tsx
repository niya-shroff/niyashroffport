import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Feather, Search, ExternalLink } from 'lucide-react';

import { staticWritings, WritingItem } from '../data/writing';

const Writing = () => {
    const [poems] = useState<WritingItem[]>(staticWritings);
    const [substackArticles, setSubstackArticles] = useState<any[]>([]);
    const [selectedPoem, setSelectedPoem] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'poems' | 'substack'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const defaultApiUrl = isLocalhost ? 'http://localhost:8000' : 'https://niyashroff.me';
        const API_BASE_URL = (import.meta as any).env.VITE_API_URL || defaultApiUrl;
        
        fetch(`${API_BASE_URL}/substack/newniyas`)
            .then(res => res.json())
            .then(data => setSubstackArticles(data.posts || data))
            .catch(err => console.error('Failed to fetch substack articles', err));
    }, []);

    const filteredContent = useMemo(() => {
        const query = searchQuery.toLowerCase();

        const formatDateStr = (dateStr?: string) => {
            if (!dateStr) return undefined;
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
        };

        const substackItems = substackArticles.map((item, index) => {
            const contentString = item.content || item.description || '';
            return {
                id: item.id || `fetched-${index}`,
                title: item.title,
                excerpt: contentString ? contentString.substring(0, 120) + '...' : '',
                content: item.content,
                type: 'substack',
                date: formatDateStr(item.published),
                url: item.link ?? null
            };
        });

        const allItems = poems.map(item => {
            const isSubstack = item.category?.toLowerCase().includes('substack');

            return {
                id: item.id,
                title: item.title,
                excerpt: item.content ? item.content.substring(0, 120) + '...' : '',
                content: item.content,
                type: (isSubstack ? 'substack' : 'poem') as 'substack' | 'poem',
                date: formatDateStr(item.published_date),
                url: item.url ?? null
            };
        });

        const combinedItems = [...substackItems, ...allItems];

        return combinedItems.filter(item => {
            const tempExcerpt = item.excerpt || '';
            const matchesSearch =
                item.title?.toLowerCase().includes(query) ||
                tempExcerpt.toLowerCase().includes(query);

            if (activeTab === 'all') return matchesSearch;
            if (activeTab === 'poems') return matchesSearch && item.type === 'poem';
            if (activeTab === 'substack') return matchesSearch && item.type === 'substack';
            return false;
        });
    }, [activeTab, searchQuery, poems, substackArticles]);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold text-primary mb-4">Writing</h2>

                    <p className="text-gray-400 text-lg max-w-2xl mb-8">
                        Thoughts put to paper. A collection of poems and substack posts.
                    </p>

                    {/* Search + Tabs */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
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
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${activeTab === tab
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((item, index) => (
                        <motion.div
                            key={`${item.type}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary/50 hover:bg-gray-800/80 cursor-pointer transition-all duration-300 group flex flex-col h-full relative"
                            onClick={() => {
                                if (item.type === 'substack' && item.url) {
                                    window.open(item.url, '_blank', 'noopener,noreferrer');
                                } else {
                                    setSelectedPoem(item);
                                }
                            }}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <Feather
                                    className={`h-8 w-8 transition-colors ${item.type === 'poem'
                                        ? 'text-primary'
                                        : 'text-orange-400'
                                        }`}
                                />

                                {item.type === 'substack' && (
                                    <ExternalLink
                                        size={20}
                                        className="text-gray-500 group-hover:text-white transition-colors"
                                    />
                                )}
                            </div>

                            <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 font-serif italic mb-6 flex-grow">
                                "{item.excerpt}"
                            </p>

                            {/* Metadata Row */}
                            <div className="pt-4 border-t border-gray-700/50 flex items-center mt-auto">
                                <div
                                    className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${item.type === 'poem'
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-orange-500/10 text-orange-400'
                                        }`}
                                >
                                    {item.type}
                                </div>

                                {item.date && (
                                    <span className="text-xs text-gray-500 font-mono ml-auto">
                                        {item.date}
                                    </span>
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

                {/* Modal */}
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

                                <div className="space-y-6 text-center max-h-[60vh] overflow-y-auto pr-2">
                                    {selectedPoem.content.split('\n\n').map((stanza: string, i: number) => (
                                        <p
                                            key={i}
                                            className="text-gray-300 text-lg font-serif leading-relaxed whitespace-pre-line"
                                        >
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