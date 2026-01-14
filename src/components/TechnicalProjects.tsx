import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Code } from 'lucide-react';
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

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/niya-shroff/repos');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                // Sort by updated_at descending
                const sortedData = data.sort((a: Repo, b: Repo) =>
                    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                );
                setProjects(sortedData);
            } catch (err) {
                setError('Could not load projects. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
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
                    <h2 className="text-4xl font-bold mb-4 text-emerald-400">Technical Projects</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        A collection of my open-source contributions and personal projects, fetched directly from GitHub.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((repo) => (
                        <motion.div
                            key={repo.id}
                            variants={item}
                            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-gray-700/50 rounded-lg group-hover:text-emerald-400 transition-colors">
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
                                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                                {repo.name}
                            </h3>

                            <p className="text-gray-400 mb-4 line-clamp-3 text-sm min-h-[60px]">
                                {repo.description || 'No description available for this project.'}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-700/50">
                                <div className="flex items-center gap-4">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
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
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechnicalProjects;
