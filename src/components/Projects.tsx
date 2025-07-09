import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

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

  // Featured projects with custom descriptions and images
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
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects ☻ </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and contributions to various projects
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.period && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.period}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={16} />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Repositories */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Recent GitHub Projects</h3>
            {loading ? (
              <div className="text-center text-gray-400">Loading GitHub repositories...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubRepos.slice(0, 6).map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white mb-2 truncate">{repo.name}</h4>
                      {repo.language && (
                        <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} flex-shrink-0`}></span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {repo.description || 'No description available'}
                    </p>
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="text-gray-400 text-xs px-2 py-1">
                            +{repo.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </div>
                        {repo.language && (
                          <span>{repo.language}</span>
                        )}
                      </div>
                      
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
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