import { BookOpen } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Years Experience', value: '1.0', color: 'bg-lavender/30 dark:bg-lavender/10 text-ink dark:text-lavender' },
        { label: 'Locations Explored', value: '20+', color: 'bg-pink/30 dark:bg-pink/10 text-ink dark:text-pink' },
        { label: 'Tech Stack Skills', value: '15+', color: 'bg-skyBlue/30 dark:bg-skyBlue/10 text-ink dark:text-skyBlue' },
        { label: 'Creative Outlets', value: '5+', color: 'bg-butterYellow/30 dark:bg-butterYellow/10 text-ink dark:text-butterYellow' },
    ];

    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-12 border-b border-black/5 dark:border-white/5 pb-4">
                        <BookOpen className="text-coral" size={22} />
                        <h2 className="text-3xl font-serif text-gray-900 dark:text-white tracking-tight">The Story So Far</h2>
                        <div className="flex-grow h-[1px] bg-black/5 dark:bg-white/5 ml-4"></div>
                        <span className="font-serif italic text-xs text-slate-500">Chapter 01</span>
                    </div>

                    <div className="space-y-16">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-12 max-w-4xl mx-auto w-full relative">
                                <div className="card-notebook p-8 relative z-10 bg-white/70 dark:bg-[#1A2333]/70 backdrop-blur-md">
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base font-sans font-light">
                                        Who am I? What a great question to ask, yet so hard to answer what defines me. What sets my soul on fire?
                                        Let's circle back to that next meeting. I'm still working on it...
                                        <br />
                                        <br />
                                        Anyways, I graduated in December 2024 with a B.S.
                                        in Computer Science and B.A. in Economics from UMass Amherst.
                                        <br />
                                        <br />
                                        Now I work at JPMorgan Chase & Co. as a Software Engineer... how cool is that?
                                        I feel very lucky to be here and I'm excited for what the future holds.
                                        Btw, I adore smiley faces! ☻
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Stats Grid (Notebook Cards/Tickets style) */}
                        <div className="w-full">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className={`card ${stat.color} p-6 flex flex-col justify-center items-center py-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md`}>
                                        {/* Paperclip emoji decoration */}
                                        <div className="absolute top-2 right-2 text-xs opacity-50">📎</div>

                                        <div className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-sans text-slate-600 dark:text-slate-300 text-center">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
