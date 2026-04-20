import { MapPin, Target } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'EXP_YRS', value: '1.0' },
        { label: 'LOCATIONS', value: '20+' },
        { label: 'TECH_STACK', value: '15+' },
        { label: 'SIDE_QUESTS', value: '5+' },
    ];

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden">
            {/* Background Grid Pattern is handled globally, but we can add some local flavor */}
            <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-16 border-b border-gray-800 pb-4">
                        <Target className="text-accent-crimson animate-pulse" size={24} />
                        <h2 className="text-3xl font-mono text-white tracking-tighter">ABOUT_ENTITY</h2>
                        <div className="flex-grow w-full h-[1px] bg-gray-800 ml-4"></div>
                        <span className="font-mono text-[10px] text-muted">SEC. 02</span>
                    </div>

                    <div className="space-y-24">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Left - Profile Image (Scrapbook photograph style) */}
                            <div className="lg:col-span-5 relative perspective-1000">
                                <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full"></div>
                                
                                <div className="card !rotate-[-2deg] p-4 bg-white/5 tape-edge relative z-10 mx-auto max-w-sm">
                                    <div className="relative overflow-hidden border border-gray-700 aspect-square group">
                                        <img
                                            src="/headshot.jpeg"
                                            alt="Niya Shroff"
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
                                        
                                        {/* HUD Elements */}
                                        <div className="absolute top-2 left-2 text-[8px] font-mono text-primary bg-background/80 px-1">SYS.CAM_01</div>
                                        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-primary bg-background/80 px-1">REC //</div>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-between items-end border-t border-gray-800 pt-4">
                                        <div>
                                            <h3 className="text-lg font-mono text-white tracking-widest uppercase">Niya Shroff ☻</h3>
                                            <p className="text-primary font-mono text-xs flex items-center gap-1 mt-1">
                                                <MapPin size={12} />
                                                NEW_YORK, NY
                                            </p>
                                        </div>
                                        <div className="text-[10px] text-muted font-mono">FILE_#402</div>
                                    </div>
                                </div>
                                {/* Technical decorative elements */}
                                <div className="absolute -left-8 top-1/2 w-4 h-[1px] bg-gray-600"></div>
                                <div className="absolute -right-8 top-1/2 w-4 h-[1px] bg-gray-600"></div>
                            </div>

                            {/* Right - Bio Text (Terminal style) */}
                            <div className="lg:col-span-7 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gray-800 rounded-tr-3xl"></div>
                                
                                <div className="card !p-8 relative z-10 border-l-2 border-l-primary bg-surface/40 backdrop-blur-sm">
                                    <div className="font-mono text-xs text-muted mb-6 flex gap-2">
                                        <span className="text-primary">&gt;</span>
                                        <span className="animate-pulse cursor-block w-2 h-4 bg-primary inline-block"></span>
                                        <span>EXECUTING bio. sh...</span>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-sans font-light">
                                        Who am I? What a great question to ask, yet so hard to answer what defines me. What sets my soul on fire? 
                                        Let's circle back to that next meeting. I'm still working on it... 
                                        <br />
                                        <br />
                                        <span className="relative inline-block">
                                            Anyways, I graduated in December 2024 with a B.S. 
                                            in Computer Science and B.A. in Economics from UMass Amherst.
                                            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent-emerald/30"></div>
                                        </span>
                                        <br />
                                        <br />
                                        Now I work at <span className="text-primary font-mono text-sm">[ JPMorgan Chase & Co. ]</span> as a Software Engineer... how cool is that?
                                        I feel very lucky to be here and I'm excited for what the future holds.
                                        Btw, I adore smiley faces! ☻
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Stats Grid (HUD style) */}
                        <div className="w-full">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="card group hover:border-accent-emerald/50 flex flex-col justify-center items-center py-8 relative overflow-hidden">
                                        {/* Scanline effect on hover */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-emerald shadow-[0_0_10px_#10b981] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
                                        
                                        <div className="text-3xl font-mono font-bold text-white mb-2 group-hover:text-glow-accent transition-all duration-300">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] font-mono text-primary tracking-widest uppercase">
                                            {stat.label}
                                        </div>
                                        
                                        {/* Corner brackets */}
                                        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-700 group-hover:border-accent-emerald transition-colors"></div>
                                        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-700 group-hover:border-accent-emerald transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default About;
