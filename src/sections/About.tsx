import { MapPin } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Years Experience', value: '1+' },
        { label: 'Countries Visited', value: '20+' },
        { label: 'Technologies Learnt', value: '15+' },
        { label: 'Side Quests', value: '5+' },
    ];

    return (
        <section id="about" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    </div>

                    <div className="space-y-16">
                        {/* Top Row - Image and Bio Text Side by Side */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left - Profile Image */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-gradient-to-br from-primary to-blue-500 rounded-2xl p-1 w-full max-w-md">
                                    <div className="bg-gray-800 rounded-2xl p-8 h-full flex flex-col justify-center">
                                        <img
                                            src="/1738873701763.jpeg"
                                            alt="Niya Shroff"
                                            className="w-48 h-48 rounded-full mx-auto object-cover mb-6 shadow-2xl"
                                        />
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-white mb-2">Niya Shroff </h3>
                                            <p className="text-primary mb-4 flex items-center justify-center gap-2">
                                                <MapPin size={16} />
                                                New York, NY
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Bio Text */}
                            <div className="flex justify-center lg:justify-start">
                                <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md h-full flex items-center">
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        Who am I? What a great question to ask, yet so hard to answer what defines me. What sets my soul on fire? 
                                        Let's circle back to that next meeting. I'm still working on it... 
                                        <br />
                                        <br />
                                        Anyways, I graduated in December 2024 with a B.S. 
                                        in Computer Science and B.A. in Economics from UMass Amherst. 
                                        Now I work at JPMorgan Chase & Co. as a Software Engineer... how cool is that?
                                        I feel very lucky to be here and I'm excited for what the future holds.
                                        Btw, I adore smiley faces! ☻
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Stats Grid (Full Width) */}
                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group aspect-square flex flex-col justify-center">
                                        <div className="text-3xl font-bold text-primary mb-3 group-hover:text-primary-hover transition-colors duration-200">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">
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
