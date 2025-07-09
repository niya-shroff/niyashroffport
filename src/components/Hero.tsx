import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Hello, I'm";
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
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
          timeoutId = setTimeout(typeNextChar, 100);
        } else {
          setIsTyping(false);
        }
      };
      
      typeNextChar();
    };

    // Initial load
    typeText();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)`
             }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Dynamic Greeting - Now above the name */}
          <p className="text-emerald-400 text-lg mb-4 animate-fade-in min-h-[28px] flex items-center justify-center">
            <span>
              {displayText}
              <span className={`inline-block w-0.5 h-5 bg-emerald-400 ml-1 ${isTyping ? 'animate-pulse' : 'animate-ping'}`}></span>
            </span>
          </p>
          
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Niya Shroff
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 animate-slide-up-delayed">
            Software Engineer
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            I transform ideas into reality through code, blending technical expertise with creative problem-solving. 
            Specializing in full-stack development, AI innovation, and strategic thinking, I craft solutions that 
            don't just work—they inspire and revolutionize how we interact with technology.
          </p>
          
          {/* CTA */}
          <div className="flex justify-center animate-fade-in-delayed mb-8">
            <a
              href="#projects"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              View My Work
            </a>
          </div>

          {/* Scroll Indicator - Centered with page and button */}
          <div className="flex justify-center animate-bounce">
            <a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 flex items-center justify-center">
              <ChevronDown size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;