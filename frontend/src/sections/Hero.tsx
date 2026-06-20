import { ChevronDown, MapPin, Camera, BookOpen, Film, PenTool, CodeIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-16">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left - Polaroid Photo Stack & Sticky Notes */}
            <div className="lg:col-span-5 relative perspective-1000 order-2 lg:order-1 mt-12 lg:mt-0 flex justify-center">

              {/* Decorative Sticky Note - Mint (Ideas) */}
              <div className="absolute -left-12 -top-10 w-32 h-32 bg-[#C1F4C5] p-4 shadow-md rotate-[-12deg] rounded-sm border border-black/5 flex flex-col justify-between z-0">
                <span className="text-[10px] font-mono text-ink/60">#IDEAS</span>
                <span className="font-handwriting text-lg text-ink/90 leading-tight"> is coding magic ??</span>
              </div>

              {/* Decorative Sticky Note - Yellow (Notes) */}
              <div className="absolute -right-12 bottom-0 w-36 h-36 bg-[#FFF4B8] p-4 shadow-md rotate-[8deg] rounded-sm border border-black/5 flex flex-col justify-between z-0">
                <span className="text-[10px] font-mono text-ink/60">#CURRENTLY</span>
                <span className="font-handwriting text-lg text-ink/90 leading-tight">working on some pretty cool stuff...</span>
              </div>

              {/* Main Polaroid Photo - Headshot */}
              <div className="polaroid-frame rotate-[-3deg] z-10 max-w-xs transition-transform duration-500 hover:rotate-[1deg] hover:scale-105">
                {/* Paperclip asset */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl drop-shadow-sm select-none z-20">📎</div>

                <div className="relative overflow-hidden aspect-square border border-black/5">
                  <img
                    src="/headshot.jpeg"
                    alt="Niya Shroff"
                    className="w-full h-full object-cover"
                  />
                  {/* Fujifilm analog leak overlay */}
                  <div className="absolute inset-0 bg-coral/5 mix-blend-color-burn pointer-events-none"></div>
                  <div className="absolute -inset-10 bg-gradient-to-tr from-coral/0 via-pink/10 to-butterYellow/15 opacity-60 mix-blend-screen pointer-events-none animate-pulse"></div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-handwriting text-ink/80 dark:text-ink/90">niya shroff.jpg</h3>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1 mt-1">
                    <MapPin size={10} />
                    NYC
                  </div>
                </div>
              </div>

            </div>

            {/* Right - Editorial Notebook Card */}
            <div className="lg:col-span-7 relative w-full order-1 lg:order-2">
              <div className="card-notebook rotate-[1deg] p-8 md:p-12 shadow-xl bg-white/80 dark:bg-[#1A2333]/80 backdrop-blur-md border border-black/5 dark:border-white/5 relative z-10">

                {/* Top tape decoration */}
                <div className="absolute -top-3 left-1/3 w-28 h-6 bg-pink/20 dark:bg-pink/10 backdrop-blur-[1px] rotate-[-2deg] border border-pink/10 shadow-sm z-20"></div>

                <div className="mb-6">
                  <span className="mono-accent bg-lavender/30 dark:bg-lavender/10 px-2.5 py-1 rounded text-ink dark:text-lavender"> #1 Smiley Face Fan</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-ink dark:text-white mb-6 leading-tight tracking-tight font-serif">
                  Niya Shroff ☻
                </h1>

                {/* Subtitle list of disciplines with colored accent highlight */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="highlight-yellow text-ink dark:text-ink font-serif text-sm px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                    <CodeIcon size={13} /> Engineer
                  </span>
                  <span className="highlight-pink text-ink dark:text-ink font-serif text-sm px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                    <Camera size={13} /> Photographer
                  </span>
                  <span className="highlight-lavender text-ink dark:text-ink font-serif text-sm px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                    <BookOpen size={13} /> Writer
                  </span>
                  <span className="highlight-mint text-ink dark:text-ink font-serif text-sm px-2 py-0.5 flex items-center gap-1.5 shadow-sm">
                    <Film size={13} /> Filmmaker
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed text-base">
                  Transforming ideas into reality through code and creativity. Blending technical expertise with artistic vision to build things that solve problems, or just look really cool.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#about" className="btn-primary">
                   A bit about me...
                  </a>
                  <a href="/technical" className="btn-secondary">
                    View my work
                  </a>
                </div>
              </div>

              {/* Graphic background binder rings ornament */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20 pointer-events-none opacity-40">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-400/50 bg-background dark:bg-[#0B0F19] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <a href="#about" className="text-slate-400 hover:text-coral transition-colors flex flex-col items-center gap-1 group">
          <span className="font-serif text-xs italic opacity-0 group-hover:opacity-100 transition-opacity">Scroll down</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
};

export default Hero;