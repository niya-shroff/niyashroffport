import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Feather, Search, ExternalLink, Terminal } from 'lucide-react';
import { staticWritings, WritingItem } from '../data/writing';

const Writing = () => {
    const [poems] = useState<WritingItem[]>(staticWritings);
    const [substackArticles, setSubstackArticles] = useState<any[]>([]);
    const [selectedPoem, setSelectedPoem] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'poems' | 'substack'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://substacker-umber.vercel.app/substack/newniyas')
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
        <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10 w-full">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 tape-edge bg-surface px-6 py-3 border border-gray-800 rotate-[1deg] inline-block mb-8 mt-4">
                        <Terminal className="text-primary" />
                        <h2 className="text-2xl font-mono text-white tracking-widest uppercase">TEXT_ARCHIVE</h2>
                    </div>

                    <div className="font-handwriting text-accent-crimson text-2xl rotate-[-2deg] ml-12 mb-8 max-w-2xl">
                        Thoughts put to paper. A collection of poems and substack posts.
                    </div>

                    {/* Search + Tabs */}
                    <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 border border-gray-800 max-w-4xl relative">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>

                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="SEARCH WRITINGS..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-4 py-2 text-white font-mono text-sm placeholder-muted focus:outline-none focus:border-primary transition-colors uppercase"
                            />
                        </div>

                        <div className="flex gap-2 p-1 border border-gray-800 bg-background">
                            {(['all', 'poems', 'substack'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1 font-mono text-xs uppercase tracking-wider transition-all border ${activeTab === tab
                                        ? 'bg-primary/20 text-primary border-primary shadow-[0_0_10px_rgba(14,165,233,0.2)]'
                                        : 'text-muted border-transparent hover:text-white hover:border-gray-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredContent.map((item, index) => (
                        <motion.div
                            key={`${item.type}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-6 border border-gray-300 cursor-pointer group flex flex-col h-full transform transition-all duration-300 hover:z-20 hover:scale-105 shadow-xl
                                ${item.type === 'poem' ? 'note-panel rotate-[-1deg] hover:rotate-0' : 'bg-surface border-gray-800 hover:border-primary/50 text-white'}
                            `}
                            onClick={() => {
                                if (item.type === 'substack' && item.url) {
                                    window.open(item.url, '_blank', 'noopener,noreferrer');
                                } else {
                                    setSelectedPoem(item);
                                }
                            }}
                        >
                            <div className="flex items-start justify-between mb-4 border-b border-gray-300/50 pb-2">
                                <Feather
                                    className={`h-5 w-5 transition-colors ${item.type === 'poem'
                                        ? 'text-gray-800'
                                        : 'text-accent-crimson'
                                        }`}
                                />

                                {item.type === 'substack' && (
                                    <ExternalLink
                                        size={16}
                                        className="text-muted group-hover:text-primary transition-colors"
                                    />
                                )}
                            </div>

                            <h3 className={`text-xl font-bold mb-3 ${item.type === 'poem' ? 'font-handwriting text-2xl text-gray-900 leading-tight' : 'font-mono text-white tracking-tight uppercase group-hover:text-primary transition-colors'}`}>
                                {item.title}
                            </h3>

                            <p className={`${item.type === 'poem' ? 'font-handwriting text-gray-700 text-lg leading-relaxed' : 'text-gray-400 font-sans text-sm'} mb-6 flex-grow`}>
                                "{item.excerpt}"
                            </p>

                            {/* Metadata Row */}
                            <div className="pt-4 border-t border-gray-300/50 flex items-center mt-auto justify-between">
                                <div
                                    className={`px-2 py-1 text-[10px] font-mono font-medium uppercase tracking-wider border ${item.type === 'poem'
                                        ? 'border-gray-400 text-gray-600 bg-gray-100'
                                        : 'border-accent-crimson/50 text-accent-crimson bg-accent-crimson/10'
                                        }`}
                                >
                                    {item.type}
                                </div>

                                {item.date && (
                                    <span className={`text-[10px] font-mono ${item.type === 'poem' ? 'text-gray-500' : 'text-muted'}`}>
                                        SYS.DATE // {item.date}
                                    </span>
                                )}
                            </div>
                            
                            {/* Tape if it's a poem notebook page */}
                            {item.type === 'poem' && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 shadow-sm backdrop-blur-sm rotate-2"></div>
                            )}
                        </motion.div>
                    ))}

                    {filteredContent.length === 0 && (
                        <div className="col-span-full text-center py-20 text-muted font-mono animate-pulse uppercase">
                            <p>&gt; ERR_NO_ENTRIES_FOUND</p>
                        </div>
                    )}
                </div>

                {/* Modal for Poem Reading */}
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
                                className="note-panel max-w-2xl w-full p-8 md:p-12 relative shadow-2xl rotate-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-black/5 transition-colors"
                                    onClick={() => setSelectedPoem(null)}
                                >
                                    <X size={24} />
                                </button>

                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-500/20 shadow-sm backdrop-blur-sm rotate-[-2deg]"></div>

                                <div className="text-center mb-8 border-b border-gray-300 pb-6">
                                    <h3 className="text-4xl md:text-5xl font-handwriting font-bold text-gray-900 mb-2">
                                        {selectedPoem.title}
                                    </h3>
                                    {selectedPoem.date && (
                                        <div className="font-handwriting text-gray-500 text-xl">{selectedPoem.date}</div>
                                    )}
                                </div>

                                <div className="space-y-6 text-left max-h-[60vh] overflow-y-auto pr-4 pl-4 font-handwriting text-2xl text-gray-800 leading-relaxed">
                                    {selectedPoem.content.split('\n\n').map((stanza: string, i: number) => (
                                        <p
                                            key={i}
                                            className="whitespace-pre-line"
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