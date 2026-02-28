import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Feather, Search, ExternalLink } from 'lucide-react';

type WritingItem = {
    id: number;
    title: string;
    content: string;
    category: string;
    published_date?: string;
    url?: string | null;
};

const staticWritings: WritingItem[] = [
    {
        id: 1,
        title: "when you want something in life",
        content:
            "when you want something in life — do you chase it or do you wait for it to come to you? i think it really depends on how badly you want that “thing” and if it you really need it now or for the future....",
        category: "substack",
        published_date: "2026-02-09",
        url: "https://substack.com/home/post/p-187338255"
    },
    {
        id: 2,
        title: "what is substack? new year — same thoughts?",
        content:
            "hello wanderers of this planet, those who find the time to read and write in our digital age. perhaps this is a marketing campaign. now im just rambling on the internet, who am i?...",
        category: "substack",
        published_date: "2026-01-01",
        url: "https://substack.com/home/post/p-183174985"
    },
    {
        id: 3,
        title: "koh phaghan poem",
        content:
            "let the waves wash over your stress\nfeel the lovely sand under your feet\nas you let go of all of your fear\n\nlet the stars illuminate the night sky\nfeel the inner peace and joy in your heart\nas you breathe in the positivity\n\nlet the sounds of life unite everyone\nfeel the warmth of the sun on your skin\nas you laugh with gratitude and hope\n\nlet the love radiate through the air\nfeel the connection of the mind, body, and soul\nas you transcend beyond reality",
        category: "poem",
        published_date: "2024-04-13"
    },
    {
        id: 4,
        title: "scrolling",
        content:
            "im scrolling each day through the list\nthrough all the names and personas \nhunting for your presence.\n\nsometimes you’re at the top\nsometimes you’re at the bottom\nand sometimes not at all. \n\ni wonder when i will forget your existence\nwhen i will recover from scrolling\nwhen i will be able to stop this loop. \n\nuntil then i keep searching and moving \nmy fingers across my 13 inch screen\nhoping and begging for your name to be there. \n\nthe validation it provides me is like no other, the pleasure and thrill the dopamine surge like a vampire preying on a new human devouring and tasting fresh blood from its newest kill.",
        category: "poem",
        published_date: "2024-09-01"
    },
    {
        id: 5,
        title: "hope you’re",
        content:
            "hey, i hope you’re doing well.\n\ni hope you find joy in sunrises and sunsets.\ni hope you find peace in the morning fog. \n\ni hope someone loves you as much as you loved me. \ni hope someone holds you as tight as you held me. \n\ni hope you see the beauty of life and your place in it.\ni hope you see the light of love and your place in it. \n\neven though i miss you, \neven though i want you,\ni hope you’re doing well. \ni hope i can wish you the best. \n\n4 years later,\n2 months old,\n1 day apart.\n\nthis story never gets old.\nso hey, i hope you’re doing okay.",
        category: "poem",
        published_date: "2024-09-16"
    },
    {
        id: 6,
        title: "the chase",
        content:
            "hey darling, you’re reflective tonight \njust a few insecurities and vulnerabilities came through i noticed them sitting by the edge of the water and thought to myself how come you never took a deeper dive into your behaviors to figure out why you are the way you and for what reason you project onto me but then i started to scream and shout and we played ping pong but there were paddles involved just two souls with a lot of emotional baggage to carry from one airport terminal to the other because it was time to change flights cuz that’s how long distance works when you’re reflective tonight and then in the moonlight i see you standing right there my best friend being eaten alive by society and corporate greed on the inside but don’t worry you seem kind illuminated tonight actually you’re quite reflective tonight \n\nhey darling, you’re reflective tonight \njust a few insecurities and vulnerabilities came through\ni noticed them sitting by the edge of the water and thought to myself how come you never took a deeper dive into your behaviors to figure out why you are the way you and for what reason you project onto me but then i started to scream and shout and we played ping pong but there were no paddles involved just two souls with a lot of emotional baggage to carry from one airport terminal to the other because it was time to change flights cuz that’s how long distance works when you’re reflective tonight and then in the moonlight i see you standing right there my best friend being eaten alive by society and corporate greed on the inside but don’t worry you seem kind of illuminated tonight actually you’re quite reflective tonight my darling did you ever look at yourself in the mirror and think about the person you are becoming cuz when you hung up the phone on me i thought to myself why do i project so much onto your but it’s really the mirror’s fault for letting us see the version we want to see instead of stone cold reality or maybe it’s just because hey darling, you’re reflective tonight and you finally realized your self worth and how these relationships are meant to be two way streets where you walk down together looking ahead towards your future but i noticed you looking back today cuz there was a puddle and you saw your pretty face starting back at you and i thought to myself hey my darling is quite reflective tonight maybe it’s time we came to terms and realized that what was meant to be was only a wish and a desire not a full thought out destinary and my love for you extended beyond the edge of the water and the moonlight because eventually the flight took off and the sun rose again which made me think hey darling you were quite reflective tonight but now the night is over and a new day begins…\n\nhey darling, you’re reflective tonight \ncuz a few insecurities and vulnerabilities came through\ni noticed them sitting by the edge of the water and thought to myself how come you never took a deeper dive into your behaviors to figure out why you are the way you and for what reason you project onto me but then i started to scream and shout back at you and we played our favorite game of ping pong but there were no paddles involved just two souls with a lot of emotional baggage to carry from one airport terminal to the other because it was time to change flights cuz that’s how long distance works when you’re reflective tonight and then in the moonlight i see you standing right there my best friend being eaten alive by society and corporate greed on the inside but don’t worry you seem kind of illuminated tonight actually you’re quite reflective tonight my darling did you ever look at yourself in the mirror and think about the person you are becoming cuz when you hung up the phone on me i thought to myself why do i project so much onto you but it’s really the mirror’s fault for letting us see the version we want to see instead of stone cold reality or maybe it’s just because hey darling, you’re reflective tonight and you finally realized your self worth and how these relationships are meant to be two way streets where you walk down together looking ahead towards your future but i noticed you looking back today cuz there was a puddle and you saw your pretty face starting back at you and i thought to myself hey my darling is quite reflective tonight maybe it’s time we came to terms and realized that what was meant to be was only a wish and a desire not a full thought out destiny and my love for you extended beyond the edge of the water and the moonlight because eventually the flight took off and the sun rose again which made me think hey darling you were quite reflective tonight but now the night is over and a new day begins, so darling will you still be reflective tonight?",
        category: "poem",
        published_date: "2025-04-05"
    },
    {
        id: 7,
        title: "im with the moon",
        content:
            "im with the moon tonight\nwe’re waiting for the sun to rise\nbut the sun doesn’t know \nthat the moon and i dance each night\nmy shadow follows him around the night \nuntil we hear the sun yawn\nshe’s rising soon and we feel her anger\nso the moon takes off, he runs away\nthe blinding light from the sun appears\nshe is not happy with the moon\n\nshe asks me why i chose to spend my night with the moon \ni don’t have any answers and now it’s noon\nthe sun flares she’s at her highest point \ni feel the wrath of her presence over me \nthe sun is outraged i gave my time to him\ni cave and i embrace the sunlight \nshe’s happy now a few hours go by\nwe’re dancing to the tunes of the birds\nbut im still thinking about the moon \nhis calming voice, he was mine last night \n\nnow the sun’s temper is controlled\nit’s time for her to set and dissolve into the ocean \ndisappearing to the other side of the world\ni know what this means, it’s time for him\nbut tonight he’s a little faint and scared\na little broken and hurt by the sun \nfor only a crescent appears giving me no hope\n\nim with the moon thought at least \nhe’s all mine forever, we’re soulmates \nhe left and now he’s back just for tonight\nso i keep him company and help him find his spark \ni slept so peacefully that when the morning came and the clouds vanished \nthe sun told me good morning \nas the moon kissed me goodbye foreve",
        category: "poem",
        published_date: "2025-05-30"
    },
    {
        id: 8,
        title: "i light a flower on fire…",
        content:
            "if i light a flower on fire, \nwhat will happen?\n\nwill it burst into flames?\nwill it suddenly die? \nthe flower was really nice\nthe flower was beautiful \n\nit didn’t deserve to be malnourished \nit needed the sun, water, and soil\ninstead it got nothing at all\n\nokay so what, stop complaining,\nwhat can you do?\n\nif i light a flower on fire, \nwhat will happen?\n\nwill it start to cry?\nwill it be completely numb?\n\nthe flower did everything it could to survive\nthe flower made mistakes but it tried \n\nit didn’t deserve to be ignored\nit needed the light, energy, and love\ninstead it got darkness all the time \n\nokay so what, stop complaining,\nwhat can you do?\n\nSo once again, if i light a flower on fire, \nwhat will happen?\n\nwill it get another chance?\nwill the fire illuminate the petals?\n\nthe flower will be reborn\nthe flower will be live again \n\nit deserves peace and prosperity\nit will gain the strength to continue\ninstead of a shadow, there is light\n\nSo finally, if i light a flower on fire, \nwhat will happen?\n\nthe flower will transcend \nthe flower will fight till death\n\ni will not complain anymore, \ni realized something profound.\n\nthe flower is still beautiful\nthe flower is you.",
        category: "poem",
        published_date: "2025-06-23"
    }
];

const Writing = () => {
    const [dbWritings] = useState<WritingItem[]>(staticWritings);
    const [selectedPoem, setSelectedPoem] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'poems' | 'substack'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContent = useMemo(() => {
        const query = searchQuery.toLowerCase();

        const allItems = dbWritings.map(item => {
            const isSubstack = item.category?.toLowerCase().includes('substack');

            return {
                id: item.id,
                title: item.title,
                excerpt: item.content.substring(0, 120) + '...',
                content: item.content,
                type: (isSubstack ? 'substack' : 'poem') as 'substack' | 'poem',
                date: item.published_date,
                url: item.url ?? null
            };
        });

        return allItems.filter(item => {
            const matchesSearch =
                item.title.toLowerCase().includes(query) ||
                item.excerpt.toLowerCase().includes(query);

            if (activeTab === 'all') return matchesSearch;
            if (activeTab === 'poems') return matchesSearch && item.type === 'poem';
            if (activeTab === 'substack') return matchesSearch && item.type === 'substack';
            return false;
        });
    }, [activeTab, searchQuery, dbWritings]);

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

                            <div className="pt-4 border-t border-gray-700/50 flex items-center justify-between mt-auto">
                                <div
                                    className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${item.type === 'poem'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-orange-500/10 text-orange-400'
                                        }`}
                                >
                                    {item.type}
                                </div>

                                {item.type === 'substack' && item.date && (
                                    <span className="text-xs text-gray-500 font-mono">
                                        {item.date}
                                    </span>
                                )}

                                {item.type === 'poem' && (
                                    <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
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