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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://substacker-umber.vercel.app/substack/newniyas')
            .then(res => res.json())
            .then(data => setSubstackArticles(data.posts || data))
            .catch(err => console.error('Failed to fetch substack articles', err))
            .finally(() => setIsLoading(false));
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
            const rawDate = item.published ? new Date(item.published).getTime() : 0;
            return {
                id: item.id || `fetched-${index}`,
                title: item.title,
                excerpt: contentString ? contentString.substring(0, 120) + '...' : '',
                content: item.content,
                type: 'substack',
                date: formatDateStr(item.published),
                rawDate,
                url: item.link ?? null
            };
        });

        const allItems = poems.map(item => {
            const isSubstack = item.category?.toLowerCase().includes('substack');
            const rawDate = item.published_date ? new Date(item.published_date).getTime() : 0;

            return {
                id: item.id,
                title: item.title,
                excerpt: item.content ? item.content.substring(0, 120) + '...' : '',
                content: item.content,
                type: (isSubstack ? 'substack' : 'poem') as 'substack' | 'poem',
                date: formatDateStr(item.published_date),
                rawDate,
                url: item.url ?? null
            };
        });

        const combinedItems = [...substackItems, ...allItems];

        let result = combinedItems.filter(item => {
            const tempExcerpt = item.excerpt || '';
            const matchesSearch =
                item.title?.toLowerCase().includes(query) ||
                tempExcerpt.toLowerCase().includes(query);

            if (activeTab === 'all') return matchesSearch;
            if (activeTab === 'poems') return matchesSearch && item.type === 'poem';
            if (activeTab === 'substack') return matchesSearch && item.type === 'substack';
            return false;
        });

        if (activeTab === 'all') {
            // Random shuffle
            result.sort(() => Math.random() - 0.5);
        } else {
            // Sort latest to earliest
            result.sort((a, b) => b.rawDate - a.rawDate);
        }

        return result;
    }, [activeTab, searchQuery, poems, substackArticles]);

    return (
        <div className="min-h-screen pt-28 pb-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 w-full">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 bg-lavender/30 dark:bg-lavender/10 px-5 py-2 rounded-lg border border-lavender/20 inline-flex mb-6 mt-4">
                        <Feather className="text-ink dark:text-lavender" size={18} />
                        <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Stories</h2>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
                        My Brain in Word Form
                    </h1>

                    <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
                        Random thoughts put to paper; a collection of poems, essays, and stories written with emotion and packed with humanity.
                    </p>

                    {/* Search + Tabs */}
                    <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-[#1D1A22]/50 p-4 border border-black/5 dark:border-white/5 rounded-2xl max-w-4xl relative">
                        <div className="relative flex-grow">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search writings and thoughts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors"
                            />
                        </div>

                        <div className="flex gap-2 p-1 border border-black/5 dark:border-white/5 bg-background rounded-xl">
                            {(['all', 'poems', 'substack'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded-lg font-serif text-sm capitalize tracking-wide transition-all ${activeTab === tab
                                        ? 'bg-lavender text-ink font-semibold shadow-sm'
                                        : 'text-slate-500 hover:text-gray-900 dark:text-white'
                                        }`}
                                >
                                    {tab === 'all' ? 'All Entries' : tab === 'poems' ? 'Poems' : 'Substack'}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20 text-slate-500 font-serif italic animate-pulse">
                        <p>Flipping pages... loading writings...</p>
                    </div>
                )}

                {/* Grid */}
                {!isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredContent.map((item, index) => (
                        <motion.div
                            key={`${item.type}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-6 cursor-pointer group flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative
                                ${item.type === 'poem' 
                                    ? 'card-notebook rotate-[-1deg] hover:rotate-0 bg-[#FFFDFB] dark:bg-[#201B24]' 
                                    : 'card bg-white/70 dark:bg-[#1D1A22]/70'}
                            `}
                            onClick={() => {
                                if (item.type === 'substack' && item.url) {
                                    window.open(item.url, '_blank', 'noopener,noreferrer');
                                } else {
                                    setSelectedPoem(item);
                                }
                            }}
                        >
                            {/* Tape accent for poem card */}
                            {item.type === 'poem' && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink/20 dark:bg-pink/10 backdrop-blur-[1px] rotate-[-2deg] border border-pink/10 shadow-sm z-20"></div>
                            )}

                            <div className="flex items-start justify-between mb-4 border-b border-black/5 dark:border-white/5 pb-2">
                                <Feather
                                    className={`h-5 w-5 ${item.type === 'poem'
                                        ? 'text-lavender'
                                        : 'text-coral'
                                        }`}
                                />

                                {item.type === 'substack' && (
                                    <ExternalLink
                                        size={14}
                                        className="text-slate-400 group-hover:text-coral transition-colors"
                                    />
                                )}
                            </div>

                            <h3 className={`text-xl font-bold mb-3 tracking-tight group-hover:text-coral transition-colors ${item.type === 'poem' ? 'font-handwriting text-2xl text-gray-900 dark:text-slate-100 leading-tight' : 'font-serif text-gray-900 dark:text-white'}`}>
                                {item.title}
                            </h3>

                            <p className={`mb-6 flex-grow ${item.type === 'poem' ? 'font-handwriting text-slate-700 dark:text-slate-300 text-lg leading-relaxed' : 'text-slate-600 dark:text-slate-400 font-sans text-sm leading-relaxed'}`}>
                                "{item.excerpt}"
                            </p>

                            {/* Metadata Row */}
                            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center mt-auto justify-between">
                                <div
                                    className={`px-2 py-0.5 text-xs font-serif rounded-md ${item.type === 'poem'
                                        ? 'bg-lavender/30 text-ink dark:text-lavender'
                                        : 'bg-pink/30 text-ink dark:text-pink'
                                        }`}
                                >
                                    {item.type === 'poem' ? 'Poem' : 'Substack'}
                                </div>

                                {item.date && (
                                    <span className="text-xs font-sans text-slate-400 dark:text-slate-500">
                                        {item.date}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {filteredContent.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-500 font-serif italic">
                            <p>No journal entries found matching that query.</p>
                        </div>
                    )}
                </div>
                )}

                {/* Modal for Poem Reading */}
                <AnimatePresence>
                    {selectedPoem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                            onClick={() => setSelectedPoem(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="card-notebook max-w-2xl w-full p-8 md:p-12 relative bg-[#FFFDFB] dark:bg-[#201B24] border border-black/10 dark:border-white/10 shadow-2xl rotate-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-ink dark:hover:text-white rounded-full hover:bg-black/5 transition-colors"
                                    onClick={() => setSelectedPoem(null)}
                                >
                                    <X size={24} />
                                </button>

                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-butterYellow/40 dark:bg-butterYellow/10 shadow-sm backdrop-blur-[1px] rotate-[-2deg] border border-butterYellow/10"></div>

                                <div className="text-center mb-8 border-b border-black/5 dark:border-white/5 pb-6">
                                    <h3 className="text-4xl md:text-5xl font-handwriting font-bold text-gray-900 dark:text-white mb-2">
                                        {selectedPoem.title}
                                    </h3>
                                    {selectedPoem.date && (
                                        <div className="font-handwriting text-slate-500 text-xl">{selectedPoem.date}</div>
                                    )}
                                </div>

                                <div className="space-y-6 text-left max-h-[60vh] overflow-y-auto pr-4 pl-4 font-handwriting text-2xl text-slate-800 dark:text-slate-200 leading-relaxed">
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