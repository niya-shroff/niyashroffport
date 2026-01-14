import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans selection:bg-primary selection:text-white">
      <div className="film-grain"></div>
      <Header />
      <main className="flex-grow relative z-10">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;