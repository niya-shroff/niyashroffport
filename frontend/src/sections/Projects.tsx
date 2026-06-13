import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, Terminal, Network, Code2 } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const Projects = () => {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/niya-shroff/repos?sort=updated&per_page=10');
        const repos = await response.json();
        setGithubRepos(repos);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const featuredProjects = [
    {
      title: 'LinkedIn Scraping Tool',
      description: 'A sophisticated data scraper built to parse user profiles and gather intelligent information regarding connections. Developed with Python using PyQt5 for the GUI, BeautifulSoup for web scraping, and Selenium for dynamic content handling, with MySQL for data storage.',
      image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'PyQt5', 'BeautifulSoup', 'Selenium', 'MySQL'],
      githubUrl: 'https://github.com/niya-shroff',
      liveUrl: '#',
      stars: 8,
      forks: 2,
    },
    {
      title: 'Facial Recognition App',
      description: 'An intelligent facial recognition application designed for meeting new people, built with React.js frontend and Python backend. Utilizes machine learning libraries including NumPy, Face_Recognition, and OpenCV to provide accurate facial detection and recognition with an intuitive user interface.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React.js', 'Python', 'NumPy', 'Face_Recognition', 'OpenCV'],
      githubUrl: 'https://github.com/niya-shroff',
      liveUrl: '#',
      stars: 12,
      forks: 4,
    },
    {
      title: 'Calculator App',
      description: 'A modern, responsive calculator application built with clean UI design and intuitive functionality. Features basic arithmetic operations, memory functions, and keyboard support for enhanced user experience.',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Responsive Design'],
      githubUrl: 'https://github.com/niya-shroff/Calculator',
      liveUrl: 'https://niya-shroff.github.io/Calculator/',
      stars: 3,
      forks: 1,
    },
  ];

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-400',
      React: 'bg-cyan-500',
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-800 -z-10"></div>
            <div className="bg-background px-6 border border-gray-800 py-3 tape-edge rotate-[1deg]">
              <h2 className="text-3xl font-mono text-gray-900 dark:text-white tracking-widest uppercase flex items-center gap-3">
                <Code2 className="text-primary" />
                PROJECT_ARCHIVES
                <span className="font-handwriting text-accent-crimson text-2xl lowercase absolute -bottom-6 -right-8 rotate-[-10deg]">my work!</span>
              </h2>
            </div>
          </div>

          {/* Featured Projects (Scrapbook + Sci-Fi mix) */}
          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            {featuredProjects.map((project, index) => (
              <div key={index} className="relative z-10 perspective-1000 group">
                
                {/* Visual Frame - Scrapbook feel */}
                <div className={`photo-frame ${index % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[2deg]'} group-hover:rotate-0 transition-transform duration-500 mb-[-40px] relative z-20 w-11/12 mx-auto`}>
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 font-mono text-[8px] text-primary">IMG_0{index + 1}</div>
                    
                    {/* Sci-fi Overlay on image */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30"></div>
                      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/30"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary/50 rounded-full"></div>
                    </div>
                  </div>
                  <div className="photo-caption text-xl mt-2">{project.title}</div>
                </div>

                {/* Data Node / Info Card - Sci-Fi feel */}
                <div className="card relative z-10 pt-16 px-6 pb-6 bg-surface/95 backdrop-blur-md">
                   
                   <div className="flex justify-between items-start mb-4">
                     <h3 className="text-lg font-mono text-gray-900 dark:text-white font-bold tracking-tight">{project.title}</h3>
                     <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">
                       <ExternalLink size={18} />
                     </a>
                   </div>
                   
                   <p className="text-gray-600 dark:text-gray-400 text-sm font-sans mb-6 leading-relaxed note-panel !p-4 !text-xs !rotate-[1deg] !mb-6 shadow-sm">
                     {project.description}
                   </p>

                   <div className="font-mono text-[10px] text-muted mb-2 uppercase">Tech_Stack //</div>
                   <div className="flex flex-wrap gap-2 mb-6">
                     {project.technologies.map((tech, techIndex) => (
                       <span key={techIndex} className="bg-gray-800/50 border border-gray-700 text-primary px-2 py-1 font-mono text-[10px] tracking-wider uppercase">
                         {tech}
                       </span>
                     ))}
                   </div>
                   
                   <div className="flex items-center space-x-4 border-t border-gray-800 pt-4 font-mono text-xs text-muted">
                     <div className="flex items-center gap-1 group/icon hover:text-gray-900 dark:text-white transition-colors">
                       <Star size={14} className="group-hover:text-accent-emerald transition-colors" />
                       <span>{project.stars}</span>
                     </div>
                     <div className="flex items-center gap-1 group/icon hover:text-gray-900 dark:text-white transition-colors">
                       <GitFork size={14} className="group-hover:text-primary transition-colors" />
                       <span>{project.forks}</span>
                     </div>
                   </div>
                </div>

              </div>
            ))}
          </div>

          {/* GitHub Repositories (Terminal / Sci-Fi Grid) */}
          <div className="border-t border-gray-800 pt-16 relative">
            <div className="absolute top-0 right-10 w-[1px] h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            
            <div className="flex items-center gap-3 mb-12">
              <Network className="text-accent-emerald" />
              <h3 className="text-xl font-mono text-gray-900 dark:text-white uppercase tracking-widest">GITHUB_ACTIVITY_LOG</h3>
            </div>

            {loading ? (
              <div className="text-center font-mono text-primary animate-pulse py-12">
                <Terminal className="mx-auto mb-4" />
                FETCHING_DATA...
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubRepos.slice(0, 6).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface/50 border border-gray-800 p-5 hover:border-primary/50 hover:bg-surface transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    
                     <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-base font-mono font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">{repo.name}</h4>
                          <Github size={16} className="text-muted group-hover:text-gray-900 dark:text-white transition-colors" />
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 font-sans">
                          {repo.description || 'No description provided.'}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-gray-800/50 pt-3">
                          <div className="flex items-center space-x-4 font-mono text-[10px] text-muted">
                            <span className="flex items-center gap-1 group-hover:text-gray-900 dark:text-white transition-colors">
                              <Star size={12} className="group-hover:text-accent-emerald" /> {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 group-hover:text-gray-900 dark:text-white transition-colors">
                              <GitFork size={12} className="group-hover:text-primary" /> {repo.forks_count}
                            </span>
                          </div>
                          
                          {repo.language && (
                            <div className="flex items-center gap-2 font-mono text-[10px] text-gray-700 dark:text-gray-300">
                              <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></span>
                              {repo.language}
                            </div>
                          )}
                        </div>
                     </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;