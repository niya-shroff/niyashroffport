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
  const [selectedCamera, setSelectedCamera] = useState<'All' | 'Fujifilm' | 'Lumix'>('All');
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
    const query = searchQuery.toLowerCase();
    return photos.filter(photo => {
      const matchesSearch =
        photo.title.toLowerCase().includes(query) ||
        photo.location.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query) ||
        (photo.vibe && photo.vibe.toLowerCase().includes(query)) ||
        (photo.people && photo.people.some(p => p.toLowerCase().includes(query))) ||
        (photo.tags && photo.tags.some(t => t.toLowerCase().includes(query)));
      const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
      const matchesCamera = selectedCamera === 'All' || photo.camera === selectedCamera;
      return matchesSearch && matchesCategory && matchesCamera;
    });
  }, [searchQuery, selectedCategory, selectedCamera, photos]);

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
    <div className="min-h-screen pt-24 pb-12 bg-transparent relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          
          <div className="flex items-center gap-3 bg-coral/20 px-5 py-2 rounded-lg border border-coral/10 inline-flex mb-6 mt-4">
              <Camera className="text-coral" size={18} />
              <h2 className="text-xl font-serif text-gray-900 dark:text-white font-semibold tracking-wide">Film & Digital</h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink dark:text-white mb-4 tracking-tight">
              Scrapbook of Moments
          </h1>

          <p className="font-serif italic text-slate-500 text-lg mb-8 max-w-2xl">
              Capturing moments in time on my Panasonic Lumix G7 and Fujifilm X-T30. Stories told through frames.
          </p>

          {/* Controls - Elegant Card Style */}
          <div className="flex flex-col md:flex-row gap-4 bg-white/50 dark:bg-[#1D1A22]/50 p-4 border border-black/5 dark:border-white/5 rounded-2xl max-w-4xl relative">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search archive by location, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white font-sans text-sm focus:outline-none focus:border-coral transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative min-w-[160px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer capitalize"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>

              <div className="relative min-w-[160px]">
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value as 'All' | 'Fujifilm' | 'Lumix')}
                  className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-gray-900 dark:text-white font-serif text-sm appearance-none focus:outline-none focus:border-coral transition-colors cursor-pointer"
                >
                  <option value="All">All Cameras</option>
                  <option value="Fujifilm">Fujifilm X-T30 III</option>
                  <option value="Lumix">Panasonic Lumix G7</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>
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
                className={`polaroid-frame cursor-pointer mb-8 break-inside-avoid
                    ${index % 3 === 0 ? 'rotate-[-2deg]' : index % 3 === 1 ? 'rotate-[1.5deg]' : 'rotate-[-1deg]'}
                    hover:rotate-0 hover:scale-[1.03] transition-all duration-300
                `}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-auto block"
                  />
                  {/* Film leak subtle light flare overlay */}
                  <div className="absolute inset-0 bg-coral/5 mix-blend-color-burn pointer-events-none"></div>
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold font-serif text-white mb-1">{photo.title}</h3>
                    <p className="text-xs font-sans text-coral mb-0.5">{photo.location || photo.category}</p>
                    <p className="text-[10px] font-sans text-slate-300 mb-2">Shot on {photo.camera === 'Fujifilm' ? 'Fujifilm X-T30 III' : 'Panasonic Lumix G7'}</p>
                    <div className="flex items-center text-white/80 text-[11px] font-sans">
                      <ZoomIn size={12} className="mr-1" />
                      View Photograph
                    </div>
                  </div>
                </div>
                <div className="polaroid-caption">{photo.title}</div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500 font-serif italic">
              No photographs found matching that query.
            </div>
          )}
        </div>

        {/* Lightbox - Clean Editorial Style */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <button
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors z-50 focus:outline-none"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} />
              </button>

              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors z-50"
                onClick={handleNext}
              >
                <ChevronRight size={48} />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative inline-block border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-[#1D1A22] shadow-2xl rounded-sm">
                  <img
                    src={filteredPhotos[selectedPhotoIndex].url}
                    alt={filteredPhotos[selectedPhotoIndex].title}
                    loading="eager"
                    decoding="async"
                    className="max-w-full max-h-[70vh] object-contain shadow-md relative z-10"
                  />
                </div>
                
                <div className="mt-6 text-center text-white">
                  <h3 className="font-serif text-2xl font-bold mb-1">{filteredPhotos[selectedPhotoIndex].title}</h3>
                  <p className="text-coral font-sans text-sm italic mb-1">{filteredPhotos[selectedPhotoIndex].location || filteredPhotos[selectedPhotoIndex].category}</p>
                  <p className="text-slate-400 font-sans text-xs">Shot on {filteredPhotos[selectedPhotoIndex].camera === 'Fujifilm' ? 'Fujifilm X-T30 III' : 'Panasonic Lumix G7'}</p>
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