import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Command, Briefcase, GraduationCap, Code, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { experiences } from '../../data/experience';
import { education } from '../../data/education';

interface SearchResult {
    id: string | number;
    title: string;
    description?: string;
    category: 'Experience' | 'Education' | 'Projects' | 'Photography' | 'Videography' | 'Writing' | 'Substack';
    path: string;
    icon: any;
    url?: string;
}

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
    const [query, setQuery] = useState('');
    const [projects, setProjects] = useState<any[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const navigate = useNavigate();

    // Fetch Content
    useEffect(() => {
        if (isOpen) {
            // Fetch GitHub projects
            if (projects.length === 0) {
                setLoadingProjects(true);
                fetch('https://api.github.com/users/niya-shroff/repos')
                    .then(res => res.json())
                    .then(data => {
                        if (Array.isArray(data)) setProjects(data);
                    })
                    .catch(err => console.error('Failed to fetch projects', err))
                    .finally(() => setLoadingProjects(false));
            }


        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const searchLower = query.toLowerCase();
        const allResults: SearchResult[] = [];

        // Experience
        experiences.forEach((exp, idx) => {
            if (exp.title.toLowerCase().includes(searchLower) ||
                exp.company.toLowerCase().includes(searchLower) ||
                exp.description.toLowerCase().includes(searchLower)) {
                allResults.push({
                    id: `exp-${idx}`,
                    title: exp.title,
                    description: exp.company,
                    category: 'Experience',
                    path: '/experience',
                    icon: Briefcase
                });
            }
        });

        // Education
        education.forEach((edu, idx) => {
            if (edu.degree.toLowerCase().includes(searchLower) ||
                edu.school.toLowerCase().includes(searchLower)) {
                allResults.push({
                    id: `edu-${idx}`,
                    title: edu.degree,
                    description: edu.school,
                    category: 'Education',
                    path: '/education',
                    icon: GraduationCap
                });
            }
        });

        // Projects
        projects.forEach(proj => {
            if (proj.name.toLowerCase().includes(searchLower) ||
                (proj.description && proj.description.toLowerCase().includes(searchLower)) ||
                (proj.language && proj.language.toLowerCase().includes(searchLower))) {
                allResults.push({
                    id: `proj-${proj.id}`,
                    title: proj.name,
                    description: proj.description || 'GitHub Repository',
                    category: 'Projects',
                    path: '/technical',
                    icon: Code
                });
            }
        });



        return allResults;
    }, [query, projects]);

    const handleSelect = (result: SearchResult) => {
        if (result.category === 'Substack' && result.url) {
            window.open(result.url, '_blank');
        } else {
            // Navigate to path with hash for deep linking
            navigate(`${result.path}#${result.id}`);

            // Dispatch a custom event to notify components to scroll
            // This is helpful if we are already on the page
            setTimeout(() => {
                const element = document.getElementById(result.id as string);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-gray-900');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-gray-900'), 2000);
                }
            }, 100);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[15%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden"
                    >
                        <div className="relative p-6 border-b border-gray-700">
                            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                            <input
                                type="text"
                                placeholder="Search everything... (Projects, Experience, Creative)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-transparent text-xl text-white pl-12 pr-12 focus:outline-none placeholder-gray-500"
                                autoFocus
                            />
                            {loadingProjects && (
                                <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
                                    <Loader className="animate-spin text-primary" size={20} />
                                </div>
                            )}
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {query.trim() === '' ? (
                                <div className="p-12 text-center text-gray-500">
                                    <Command className="mx-auto mb-4 opacity-50" size={48} />
                                    <p className="text-lg">Type to search across all sections</p>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="p-4 space-y-2">
                                    {results.map((result) => (
                                        <div
                                            key={result.id}
                                            onClick={() => handleSelect(result)}
                                            className="group flex items-center p-4 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-primary/20"
                                        >
                                            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors text-gray-400">
                                                <result.icon size={24} />
                                            </div>
                                            <div className="ml-4 flex-grow">
                                                <h4 className="text-white font-medium group-hover:text-primary transition-colors">
                                                    {result.title}
                                                </h4>
                                                <p className="text-sm text-gray-400">
                                                    {result.category} • {result.description}
                                                </p>
                                            </div>
                                            <ChevronRight className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <p>No results found for "{query}"</p>
                                </div>
                            )}
                        </div>

                        <div className="p-3 bg-gray-900/50 border-t border-gray-700 text-xs text-gray-500 flex justify-between px-6">
                            <span>Use arrow keys to navigate</span>
                            <span>ESC to close</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GlobalSearch;
