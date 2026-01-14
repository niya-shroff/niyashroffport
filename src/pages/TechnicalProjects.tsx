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
            <div className="min-h-screen pt-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-24 container mx-auto px-6 text-center">
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-primary">Technical Projects</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mb-8">
                        A collection of my open-source contributions and personal projects, fetched directly from GitHub.
                    </p>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="relative min-w-[140px]">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer disabled:opacity-50"
                                    disabled={languages.length <= 1} // Disable if only 'All' exists (e.g. API limit reached)
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>

                            <div className="relative min-w-[140px]">
                                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
                                >
                                    <option value="updated">Recently Updated</option>
                                    <option value="stars">Most Stars</option>
                                    <option value="forks">Most Forks</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
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
                                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-gray-700/50 rounded-lg group-hover:text-primary transition-colors">
                                        <Code size={24} />
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Github size={20} />
                                        </a>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-primary transition-colors"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors break-words">
                                    {repo.name}
                                </h3>

                                <p className="text-gray-400 mb-4 line-clamp-3 text-sm min-h-[60px] flex-grow">
                                    {repo.description || 'No description available for this project.'}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-700/50">
                                    <div className="flex items-center gap-4">
                                        {repo.language && (
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Star size={14} />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork size={14} />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            <p className="text-lg">No projects found matching your criteria.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TechnicalProjects;
