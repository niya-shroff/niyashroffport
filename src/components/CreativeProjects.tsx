import React from 'react';
import { Camera, Film, Palette, Music, Award, ExternalLink, Play } from 'lucide-react';

const CreativeProjects = () => {
  const creativeWorks = [
    {
      title: 'SmileWithMeProductions',
      category: 'Creative Venture',
      description: 'My creative venture combining poetry, photography, and filmmaking to share artistic vision and inspire others through visual storytelling.',
      image: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Film,
      color: 'from-purple-500 to-pink-500',
      tags: ['Poetry', 'Photography', 'Filmmaking', 'Creative Direction'],
      link: '#',
      featured: true
    },
    {
      title: 'Portrait Photography Series',
      category: 'Photography',
      description: 'A collection of intimate portrait photography capturing authentic human emotions and expressions through cinematic lighting techniques.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Camera,
      color: 'from-blue-500 to-cyan-500',
      tags: ['Portrait', 'Lighting', 'Emotion', 'Storytelling'],
      link: '#'
    },
    {
      title: 'Poetry Collection',
      category: 'Writing',
      description: 'Original poetry exploring themes of technology, human connection, and the intersection of digital and analog worlds.',
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Palette,
      color: 'from-amber-500 to-orange-500',
      tags: ['Poetry', 'Writing', 'Digital Age', 'Philosophy'],
      link: '#'
    },
    {
      title: 'Short Film Project',
      category: 'Filmmaking',
      description: 'A narrative short film exploring the relationship between technology and human emotion, shot with cinematic techniques and thoughtful composition.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Play,
      color: 'from-red-500 to-pink-500',
      tags: ['Directing', 'Cinematography', 'Narrative', 'Post-Production'],
      link: '#'
    },
    {
      title: 'Visual Storytelling Workshop',
      category: 'Education',
      description: 'Conducted workshops on visual storytelling techniques, combining technical photography skills with narrative development.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      tags: ['Teaching', 'Workshop', 'Visual Arts', 'Mentoring'],
      link: '#'
    },
    {
      title: 'Documentary Photography',
      category: 'Photography',
      description: 'Documentary-style photography capturing authentic moments and stories from everyday life with a focus on human connection.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Camera,
      color: 'from-indigo-500 to-purple-500',
      tags: ['Documentary', 'Street Photography', 'Authenticity', 'Social'],
      link: '#'
    }
  ];

  return (
    <section id="creative" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative cinematic-vignette">
      {/* Film strip decorative elements */}
      <div className="absolute left-0 top-0 w-6 h-full bg-gray-800 film-strip opacity-20"></div>
      <div className="absolute right-0 top-0 w-6 h-full bg-gray-800 film-strip opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 spotlight">
            <div className="inline-flex items-center gap-3 mb-4">
              <Film className="text-yellow-400" size={32} />
              <h2 className="text-4xl font-bold text-white">Creative Projects ☻</h2>
              <Film className="text-yellow-400" size={32} />
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Beyond code, I express creativity through <span className="text-yellow-400 font-medium">SmileWithMeProductions</span> — 
              my artistic venture combining poetry, photography, and filmmaking to tell stories that inspire and connect.
            </p>
          </div>

          {/* Featured Project - SmileWithMeProductions */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-8 border border-purple-500/20 spotlight">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                      <Film className="text-white" size={24} />
                    </div>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                      Featured Creative Venture
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">SmileWithMeProductions</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    My creative venture that blends technical expertise with artistic vision. Through poetry, photography, 
                    and filmmaking, I create content that explores the intersection of technology and human emotion, 
                    always with a focus on spreading joy and authentic connection.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Poetry', 'Photography', 'Filmmaking', 'Creative Direction', 'Visual Storytelling'].map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                    Explore Creative Work
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="SmileWithMeProductions"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Film frame overlay */}
                  <div className="absolute -inset-2 border-4 border-gray-700 rounded-2xl pointer-events-none"></div>
                  <div className="absolute -inset-4 border-2 border-gray-600 rounded-3xl pointer-events-none opacity-50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creativeWorks.slice(1).map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-700/50 group"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Film frame effect */}
                  <div className="absolute inset-0 border-4 border-gray-900/20 pointer-events-none"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4">
                    <div className={`p-2 bg-gradient-to-r ${project.color} rounded-full shadow-lg`}>
                      <project.icon className="text-white" size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-200">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-yellow-600 hover:to-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Interested in Creative Collaboration?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always excited to work on creative projects that blend technology with artistic expression. 
                Let's create something beautiful together!
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Camera size={18} />
                Let's Collaborate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeProjects;