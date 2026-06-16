import { useState, useEffect, useMemo } from 'react';
import { Github, ExternalLink, Star, GitFork, Code, Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
}

const TechnicalProjects = () => {
    const [projects, setProjects] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [sortBy, setSortBy] = useState('updated'); // updated, stars, forks

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/niya-shroff/repos');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError('Could not load projects. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Extract unique languages
    const languages = useMemo(() => {
        const langs = projects.map(p => p.language).filter(Boolean);
        return ['All', ...Array.from(new Set(langs))];
    }, [projects]);

    // Filter and Sort Projects
    const filteredProjects = useMemo(() => {
        return projects
            .filter(project => {
                const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesLanguage = selectedLanguage === 'All' || project.language === selectedLanguage;
                return matchesSearch && matchesLanguage;
            })
            .sort((a, b) => {
                if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
                if (sortBy === 'forks') return b.forks_count - a.forks_count;
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(); // default updated
            });
    }, [projects, searchQuery, selectedLanguage, sortBy]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-28 flex justify-center items-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-28 container mx-auto px-6 text-center bg-background">
                <p className="text-coral font-serif text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 bg-skyBlue/30 dark:bg-skyBlue/10 px-5 py-2 rounded-lg border border-skyBlue/20 inline-flex mb-6 mt-4">
                        <Code className="text-ink dark:text-skyBlue" size={18} />
                        <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Developer Notebook</h2>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
                        Technical Projects
                    </h1>

                    <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
                        A digital collection of software designs, full-stack applications, and experiments.
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-[#1D1A22]/50 p-4 border border-black/5 dark:border-white/5 rounded-2xl max-w-4xl relative">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search repositories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="relative min-w-[140px]">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer capitalize disabled:opacity-50"
                                    disabled={languages.length <= 1}
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang === 'All' ? 'All Languages' : lang}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                            </div>

                            <div className="relative min-w-[140px]">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer"
                                >
                                    <option value="updated">Recently Updated</option>
                                    <option value="stars">Most Stars</option>
                                    <option value="forks">Most Forks</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((repo) => (
                            <motion.div
                                key={repo.id}
                                variants={item}
                                layout
                                className="card bg-white/70 dark:bg-[#1D1A22]/70 border border-black/5 dark:border-white/5 hover:border-coral/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2.5 bg-skyBlue/20 rounded-lg text-ink dark:text-white transition-colors">
                                        <Code size={20} />
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-coral transition-colors"
                                        >
                                            <Github size={18} />
                                        </a>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-coral transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-serif font-bold text-ink dark:text-white mb-2 group-hover:text-coral transition-colors break-words">
                                    {repo.name}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 mb-4 font-sans text-sm leading-relaxed flex-grow">
                                    {repo.description || 'No description available for this project.'}
                                </p>

                                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-4">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5 bg-mint/30 text-ink dark:text-mint px-2 py-0.5 rounded text-[11px] font-serif font-medium">
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={12} />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork size={12} />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500 font-serif italic">
                            <p className="text-lg">No projects found matching your criteria.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TechnicalProjects;
