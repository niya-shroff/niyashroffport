import { useState, useEffect, useMemo } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Search, Filter, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { localPhotos } from '../data/photography';

const Photography = () => {
  const photos = localPhotos;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-background');
          setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-background'), 2000);
        }
      }, 500);
    }
  }, [location]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(photos.map(p => p.category)))], [photos]);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesSearch =
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, photos]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null)
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          
          <div className="flex items-center gap-3 tape-edge bg-surface px-6 py-3 border border-gray-800 rotate-[1deg] inline-block mb-8 mt-4">
              <Camera className="text-primary" />
              <h2 className="text-2xl font-mono text-white tracking-widest uppercase">PHOTOGRAPHY_ARCHIVE</h2>
          </div>

          <div className="font-handwriting text-accent-crimson text-2xl rotate-[-2deg] ml-12 mb-8 max-w-2xl">
              Capturing moments in time on my Panasonic Lumix G7 and Fujifilm X-T30 III. Here's a collection of shots from my travels and daily life.
          </div>

          {/* Controls - Terminal Style */}
          <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 border border-gray-800 max-w-4xl relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-emerald"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-emerald"></div>
            
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
              <input
                type="text"
                placeholder="SCAN_ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-4 py-2 text-white font-mono text-sm placeholder-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-background border border-gray-700 rounded-none pl-10 pr-8 py-2 text-white font-mono text-sm appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer uppercase"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                id={`photo-${photo.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index % 12) * 0.1 }}
                className={`photo-frame cursor-pointer mb-8 break-inside-avoid shadow-xl
                    ${index % 3 === 0 ? 'rotate-[-2deg]' : index % 3 === 1 ? 'rotate-[1deg]' : 'rotate-[-1deg]'}
                    hover:rotate-0 hover:z-20 transition-all duration-300
                `}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* HUD Overlay */}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 font-mono text-[8px] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">IMG.ID: {photo.id}</div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold font-sans text-white mb-1 uppercase">{photo.title}</h3>
                    <p className="text-xs font-mono text-primary mb-2 uppercase">{photo.location || photo.category}</p>
                    <div className="flex items-center text-gray-300 text-[10px] font-mono uppercase">
                      <ZoomIn size={12} className="mr-1" />
                      INIT_ZOOM
                    </div>
                  </div>
                </div>
                <div className="photo-caption text-xl mt-3 pb-1">{photo.title}</div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-muted font-mono animate-pulse">
              &gt; ERR_NO_IMAGES_FOUND
            </div>
          )}
        </div>

        {/* Lightbox - Sci-fi / Terminal hybrid */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              
              <button
                className="absolute top-6 right-6 p-2 text-muted hover:text-primary rounded-full hover:bg-white/5 transition-colors z-50 focus:outline-none focus:border-primary border border-transparent"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-2 text-muted hover:text-primary rounded-full hover:bg-white/5 transition-colors z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} />
              </button>

              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 text-muted hover:text-primary rounded-full hover:bg-white/5 transition-colors z-50"
                onClick={handleNext}
              >
                <ChevronRight size={48} />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative inline-block border border-gray-800 p-2 bg-gray-900/50 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                  <img
                    src={filteredPhotos[selectedPhotoIndex].url}
                    alt={filteredPhotos[selectedPhotoIndex].title}
                    className="max-w-full max-h-[75vh] object-contain shadow-2xl relative z-10"
                  />
                  {/* Corners */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary z-20"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary z-20"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary z-20"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary z-20"></div>
                </div>
                
                <div className="mt-8 bg-surface/80 border border-gray-800 px-8 py-4 backdrop-blur-md flex flex-col items-center">
                  <h3 className="text-white font-mono text-lg tracking-widest uppercase mb-1">{filteredPhotos[selectedPhotoIndex].title}</h3>
                  <p className="text-muted font-mono text-xs uppercase">{filteredPhotos[selectedPhotoIndex].location || filteredPhotos[selectedPhotoIndex].category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Photography;