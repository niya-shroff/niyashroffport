import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import SmileyBackground from '../components/SmileyBackground';

const slides = [
  {
    type: 'title',
    content: "she was the love of my life, and i want the chance to choose her again"
  },
  {
    type: 'point',
    title: "1. I will never talk about breaking up again.",
    content: "I will never use breaking up as an escape when I'm scared, overwhelmed, hurt, or uncertain. In April 2026, I made the decision to end something that meant more to me than I understood at the time because I thought I needed space and growth. I know now that problems should be something we work through, not a reason to threaten our relationship or leave it. I will choose to stay in the conversation, even when it is difficult."
  },
  {
    type: 'point',
    title: "2. I will not confuse needing to grow with needing to leave you.",
    content: "I needed growth, independence, and time to understand myself, but I know now those things can happen while loving someone. I think about everything we built starting in March 2025, and how I chose to walk away from it because I thought I needed to figure myself out alone. Being overwhelmed is not a reason to vanish or leave. I will give myself grace and patience while allowing you to be next to me through that growth."
  },
  {
    type: 'point',
    title: "3. I will communicate before I reach a breaking point.",
    content: "I won't wait until I've built up enough emotions that leaving feels like the only option. I will tell you when something is bothering me while there is still something we can do about it, and I will listen more than I talk. Your problems and emotions will matter to me too, and I will give you space to breathe and talk when you're ready. I want to learn from the times when I didn't communicate what I was feeling until it became too much, rather than repeating them."
  },
  {
    type: 'point',
    title: "4. I will stop letting fear make decisions for me.",
    content: "The physical distance between us, our differences, and questions about the future sometimes scared me. Instead of letting that fear determine what our relationship means, I will stay present and enjoy the time we have. We traveled through so many countries together during our three months in Europe, and somehow the person I loved was able to feel close even when the rest of the world was changing around us. I will put what I cannot control into the hands of the universe, life, God, or whatever it is meant to be, rather than turning uncertainty into fear. What is out of my control does not need to become something I am afraid of."
  },
  {
    type: 'point',
    title: "5. I will choose you, not try to choose your life for you.",
    content: "I will actively choose you and the life we build together without expecting either of us to be perfect. I will support your ambitions, friendships, career, travels, and choices even when they are different from what I might choose for myself. Loving you means loving who you are, not trying to shape you into who I think you should be or who I want you to be for me. I will unconditionally support your path forward, whatever that looks like, and aim to be there in the way you actually need and want me to be."
  },
  {
    type: 'point',
    title: "6. I will listen to understand you, not to defend myself.",
    content: "When you tell me something hurts you, I will focus on understanding why before explaining my intentions or defending my actions. I will hear you, process, and reflect before responding out of emotion. I want you to feel heard, not like you have to convince me that your feelings are valid. I want to approach our differences in faith, culture, money, food, and our future with curiosity rather than immediately assuming what something means or why you feel a certain way."
  },
  {
    type: 'point',
    title: "7. I will love you at my full capacity.",
    content: "I will show you the love you deserve, not just through words, but through the way I show up for you every day. I will be intentional about making you feel loved, appreciated, supported, and cared for, even in the small things. I will pay attention to what makes you feel loved and learn how to love you in the ways that actually matter to you, not just in the ways that come naturally to me. I want you to feel the depth of my love through my consistency, my presence, my effort, and the way I choose you every day."
  },
  {
    type: 'point',
    title: "8. I will make an effort to understand your faith before interpreting it through my own lens.",
    content: "I will do devotionals and read with you, ask questions, learn about what your faith means to you, and genuinely try to understand it. My own spiritual exploration may continue to evolve, but I can still support your relationship with your faith and the things that matter deeply to you. I will listen before I interpret and ask before I assume. My questions will come from curiosity, not from trying to make you doubt yourself or your beliefs. I want this to be something we build gradually and experience together."
  },
  {
    type: 'point',
    title: "9. I will work through our differences instead of being afraid of them.",
    content: "Our differences around faith, culture, money, and the future are real, but I won't automatically treat them as evidence that we aren't compatible. I will listen to you without feeling like every difference needs to be solved immediately or talked through until there is nothing left to say. I will give you space when you need it, let things breathe, and trust that not every feeling needs an immediate answer. I will have the important conversations with you, but I will also learn when to simply listen, understand, and let you be heard. We have already learned how to navigate so many differences together, and I want to keep learning how to build a life together with patience, understanding, and room for both of us to be ourselves."
  },
  {
    type: 'point',
    title: "10. I will keep choosing us when things aren't easy.",
    content: "I don't want to simply go back to April 2026 and pretend the breakup never happened. We know more now. I know what it feels like to lose you, to spend time apart without talking, and to realize how much I still wanted to reach you. I know what it felt like to write you letters, send the \"open when\" messages, and hope you would hear what I was trying to say. I don't want to keep proving my love through desperation. I want to build something with you through consistency, honesty, patience, and action. I can promise that I will stay honest, take responsibility, choose repair always, and never escape."
  },
  {
    type: 'outro',
    content: (
      <div className="space-y-8 text-center px-4">
        <p className="text-2xl md:text-4xl text-red-500 font-medium italic tracking-wide">
          I don't want you back simply because I miss you and deeply love you.
        </p>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-sans font-light">
          I miss you more than I know how to explain. Missing you isn't an ache anymore or a craving. Life is and will go on, but you make mine better, and I hope to add to yours as well.
        </p>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-sans font-light">
          I want another chance because I know what we had. I know the life we built together, the countries we traveled through, the memories we made, the friendship underneath our relationship, and the love that existed between us.
        </p>
      </div>
    )
  },
  {
    type: 'outro',
    content: (
      <div className="space-y-6 text-lg md:text-xl leading-relaxed text-center">
        <p>And I know now that loving someone isn't just about how strongly you feel about them.</p>
        <p>It's about how you treat them when you're scared.<br />
          How you communicate when you're hurt.<br />
          How you handle differences.<br />
          How you repair after conflict.<br />
          How you make them feel safe choosing you.<br />
          And how you keep choosing them when things aren't easy.</p>
      </div>
    )
  },
  {
    type: 'closing',
    content: (
      <div className="space-y-8 text-center mt-8">
        <div className="space-y-2 text-2xl md:text-4xl font-serif italic text-red-600">
          <p>I loved you then.</p>
          <p>I love you now.</p>
          <p>And if you let me love you again, I will love you better.</p>
        </div>
        <div className="pt-12 text-xl font-medium tracking-wide">
          <p>Yours truly,</p>
          <p className="font-serif text-3xl mt-4">Niya</p>
        </div>
        <div className="flex justify-center pt-8">
          <Heart className="w-8 h-8 text-red-600 animate-pulse fill-red-600" />
        </div>
      </div>
    )
  }
];

export default function Akp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // You can change this password to whatever you'd like it to be.
  const CORRECT_PASSWORD = 'aly';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : prev);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
    };
    if (isAuthenticated) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <SmileyBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md z-10"
        >
          <form onSubmit={handleLogin} className="space-y-8 backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/5">
            <motion.div
              className="flex justify-center mb-8"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Lock className="w-12 h-12 text-red-600/80" strokeWidth={1} />
            </motion.div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-gray-700 focus:border-red-500 text-white'} px-4 py-3 text-center text-2xl tracking-[0.3em] outline-none transition-colors rounded-none font-serif`}
                placeholder="password"
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(5px)' }}
                    className="absolute -bottom-8 left-0 right-0 text-red-500 text-sm text-center"
                  >
                    Incorrect
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full max-w-[200px] py-3 px-6 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 rounded-xl transition-all duration-300 font-serif tracking-[0.2em] flex items-center justify-center gap-3 group"
              >
                <span className="translate-x-2 group-hover:translate-x-0 transition-transform">ENTER</span>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }


  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 flex flex-col font-serif selection:bg-red-600/30 relative overflow-hidden">
      <SmileyBackground />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
        <motion.div
          className="h-full bg-red-600/50"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24 md:p-12 max-w-4xl mx-auto w-full relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.3 }}
            className="w-full"
          >
            {slide.type === 'title' && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl text-center font-style: italic leading-tight text-red-600 drop-shadow-2xl"
              >
                {slide.content}
              </motion.h1>
            )}

            {slide.type === 'point' && (
              <div className="space-y-8 backdrop-blur-md bg-black/20 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl md:text-4xl text-red-500 font-medium tracking-wide"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-lg md:text-2xl leading-relaxed text-gray-300 font-sans font-light"
                >
                  {slide.content}
                </motion.p>
              </div>
            )}

            {(slide.type === 'outro' || slide.type === 'closing') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="max-w-2xl mx-auto backdrop-blur-sm bg-black/10 p-8 rounded-3xl"
              >
                {slide.content}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center z-40">
        <button
          onClick={prevSlide}
          className={`p-3 rounded-full hover:bg-white/10 transition-colors ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'}`}
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-sm tracking-widest text-gray-500 font-sans">
          {currentSlide + 1} / {slides.length}
        </div>

        <button
          onClick={nextSlide}
          className={`p-3 rounded-full hover:bg-white/10 transition-colors ${currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'}`}
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
