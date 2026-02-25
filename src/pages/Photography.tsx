export const fetchDriveFiles = async (folderId: string, apiKey: string) => {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name,mimeType)&key=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch from Google Drive');
  
  const data = await response.json();
  console.log("files id",data.files[5].id);
  return data.files.map((file: any) => ({
    id: file.id,
    title: file.name.split('.')[0],
    url: `https://drive.google.com/uc?id=${file.id}&authuser=0`, // Direct image URL
    category: '', // We’ll fill this later
    location: '', // Optional, you can customize
  }));
};

import { useState, useEffect, useMemo } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Photo } from '../types';

const folderMap = {
  Abstract: '152GM0KUC2Z5jW3rOBOgbEA3dkKCltfq_',
  Animals: '150SWWf9uNtqGh3iSZmrYoKaIDu93153n',
  Cities: '1x0E20DS8pztW5WjBbYIi3ujm4JiG79q5',
  Nature: '1-tAlJWabxJMxg7K0IF8PcxqIGugZnWxs',
  People: '1nNgEhnIhn72SYgleqv1nebmk8nsJeLGU',
};

const API_KEY = 'AIzaSyDQshWbF7JtjCWpMoT6mxeXgKHjIOMLLXU';

const Photography = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  // Fetch all images from all folders
  useEffect(() => {
    const fetchAllPhotos = async () => {
      const allPhotos: Photo[] = [];

      for (const [category, folderId] of Object.entries(folderMap)) {
        try {
          const files = await fetchDriveFiles(folderId, API_KEY);
          console.log("files",files);
          files.forEach((f: { category: string; }) => (f.category = category));
          allPhotos.push(...files);
        } catch (err) {
          console.error(`Error fetching folder ${category}:`, err);
        }
      }

      setPhotos(allPhotos);
    };

    fetchAllPhotos();
  }, []);

  // Scroll to hash on mount
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900');
          setTimeout(() => element.classList.remove('ring-4', 'ring-primary', 'ring-offset-4', 'ring-offset-gray-900'), 2000);
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
    <div className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-4xl font-bold text-primary">Photography</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            Capturing moments in time on my Panasonic Lumix G7 and Fujifilm X-T30 III. A collection of shots from my travels and daily life.
          </p>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-4xl">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, category, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2.5 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
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

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                id={`photo-${photo.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index % 12) * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800 cursor-pointer mb-6 break-inside-avoid"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                //   loading="lazy"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 right-2 flex gap-2"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{photo.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{photo.location || photo.category}</p>
                    <div className="flex items-center text-gray-300 text-xs">
                      <ZoomIn size={14} className="mr-1" />
                      View Full Size
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-lg">No photos found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
                onClick={handleNext}
              >
                <ChevronRight size={48} />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredPhotos[selectedPhotoIndex].url}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 px-6 py-3 rounded-full backdrop-blur-md text-center">
                  <h3 className="text-white font-bold text-lg">{filteredPhotos[selectedPhotoIndex].title}</h3>
                  <p className="text-primary text-sm">{filteredPhotos[selectedPhotoIndex].location || filteredPhotos[selectedPhotoIndex].category}</p>
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