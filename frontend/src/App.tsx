import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Chatbot from './components/Chatbot';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const TechnicalProjects = lazy(() => import('./pages/TechnicalProjects'));
const Photography = lazy(() => import('./pages/Photography'));
const Videography = lazy(() => import('./pages/Videography'));
const Writing = lazy(() => import('./pages/Writing'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Contact = lazy(() => import('./pages/Contact'));


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/technical" element={<TechnicalProjects />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/videography" element={<Videography />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white flex flex-col font-sans selection:bg-primary selection:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Visualizations */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-crimson/10 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent-emerald/10 mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="film-grain z-0"></div>
      <Header />
      <main className="flex-grow relative">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;