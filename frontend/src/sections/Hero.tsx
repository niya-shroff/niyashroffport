import { useState, useEffect } from 'react';
import { ChevronDown, Terminal, MapPin } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "INITIALIZING PORTFOLIO > SYS.ONLINE";

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / (windowHeight * 0.3), 1);

      if (scrollProgress > 0 && !isTyping) {
        setIsTyping(true);
        typeText();
      } else if (scrollProgress === 0) {
        setDisplayText('');
        setIsTyping(false);
      }
    };

    const typeText = () => {
      let currentIndex = 0;
      setDisplayText('');

      const typeNextChar = () => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, 50);
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    };

    // Initial load
    typeText();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Sci-Fi Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-emerald/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full mt-12 md:mt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left - Profile Image (Scrapbook photograph style) */}
            <div className="lg:col-span-5 relative perspective-1000 order-2 lg:order-1 mt-12 lg:mt-0">
                <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full"></div>
                
                <div className="photo-frame !rotate-[-2deg] p-4 pb-16 bg-[#fdfbf7] tape-edge relative z-10 mx-auto max-w-sm shadow-2xl border border-gray-300">
                    <div className="relative overflow-hidden border border-gray-300 aspect-square shadow-inner">
                        <img
                            src="/headshot.jpeg"
                            alt="Niya Shroff"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Subtle film grain overlay effect without making it B&W */}
                        <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay pointer-events-none"></div>
                        
                        {/* HUD Elements */}
                        <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-900 dark:text-white bg-black/50 backdrop-blur-sm px-1">SYS.CAM_01</div>
                        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-red-500 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            REC
                        </div>
                    </div>
                    
                    <div className="absolute bottom-3 left-0 w-full text-center flex flex-col justify-center items-center">
                        <h3 className="text-3xl font-handwriting text-gray-900 rotate-[-1deg]">Niya Shroff ☻</h3>
                        <p className="text-gray-600 dark:text-gray-500 font-mono text-[9px] flex items-center justify-center gap-1 mt-1 uppercase tracking-widest">
                            <MapPin size={10} />
                            NEW_YORK, NY
                        </p>
                    </div>
                </div>
                <div className="absolute -left-8 top-1/2 w-4 h-[1px] bg-gray-600 hidden lg:block"></div>
                <div className="absolute -right-8 top-1/2 w-4 h-[1px] bg-gray-600 hidden lg:block"></div>
            </div>

            {/* Right - Terminal Block */}
            <div className="lg:col-span-7 relative perspective-1000 w-full order-1 lg:order-2">
              {/* Background offset card (Scrapbook feel) */}
              <div className="absolute inset-0 bg-surface border border-gray-800 rotate-1 transform origin-center rounded-sm opacity-50"></div>

              <div className="card rotate-[-1deg] p-8 md:p-12 shadow-2xl relative z-10 tape-edge bg-surface/95 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-2 mb-6 border-b border-gray-800 pb-4 w-full">
                  <Terminal size={18} className="text-primary" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{displayText}<span className="animate-pulse">_</span></span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight font-sans">
                  NIYA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-emerald">SHROFF</span>
                </h1>

                <div className="font-mono text-xs text-muted mb-6 flex justify-center gap-4 w-full">
                  <span>[ TYPE: HUMAN ]</span>
                  <span>[ STATUS: EXPLORING ]</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed text-sm mx-auto">
                  Transforming ideas into reality through code and creativity. Blending technical expertise with artistic vision to build things that solve problems, or just look really cool.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#about" className="btn-primary">
                    BEGIN_EXPLORATION
                  </a>
                  <a href="/technical" className="px-6 py-2 border border-gray-800 text-gray-600 dark:text-gray-400 font-mono text-sm hover:border-primary/50 hover:text-primary transition-colors uppercase tracking-wider relative group">
                    <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    VIEW_PROJECTS
                  </a>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -left-8 -bottom-8 w-24 h-24 border-l border-b border-accent-crimson/30 rounded-bl-3xl hidden lg:block"></div>
              <div className="absolute -right-4 -bottom-12 font-mono text-[10px] text-muted rotate-90 transform origin-bottom-right hidden lg:block">
                COORD // 40.7128° N, 74.0060° W
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="text-muted hover:text-primary transition-colors flex flex-col items-center gap-2 group">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll_Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;