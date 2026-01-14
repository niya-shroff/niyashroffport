import { GraduationCap, MapPin, Calendar, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const EDUCATION_DATA = [
    {
        degree: 'B.S. in Computer Science & B.A. in Economics (Dual Degree)',
        school: 'University of Massachusetts Amherst',
        location: 'Amherst, MA',
        period: 'December 2024',
        honors: 'Magna Cum Laude',
        description: 'Completed two Bachelor\'s degrees simultaneously, combining technical computer science expertise with economic analysis and theory.',
        courses: [
            'Artificial Intelligence',
            'Software Engineering',
            'Algorithms & Data Structures',
            'Game Theory',
            'Econometrics',
            'Programming Methods',
            'Project Management'
        ],
        activities: [
            {
                title: 'Philosophy & Open Thought Club Vice-President',
                description: 'Led E-Board planning events for 60+ members, progressed from Treasurer to Vice President'
            },
            {
                title: 'Zoola Women\'s Ultimate Frisbee Team',
                description: 'Team member and fundraising coordinator'
            }
        ]
    },
    {
        degree: 'High School Diploma',
        school: 'Chelmsford High School',
        location: 'Chelmsford, MA',
        period: 'June 2021',
        description: 'Graduated with high honors after completing numerous Honors and AP courses.',
        activities: [
            {
                title: 'Founder of Care Cardz',
                description: 'Founded nonprofit organization, partnered with 6 sponsors to distribute 1,000+ cards to healthcare workers and first responders'
            },
            {
                title: 'Co-Founder/Co-President of Philosophy Club',
                description: 'Established club from inception, led discussions and grew membership'
            },
            {
                title: 'Varsity Track & Field Athlete',
                description: 'Competed at state-level meets while maintaining academic excellence'
            },
            {
                title: 'Co-Treasurer of Student Council',
                description: 'Managed student government finances and event budget planning'
            },
            {
                title: 'TED-Ed Club Member',
                description: 'Delivered TED-Ed style talk on the American Education System'
            }
        ]
    }
];

const Education = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-emerald-400">Education</h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Academic background and achievements.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {EDUCATION_DATA.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                                        <GraduationCap className="text-blue-400" size={28} />
                                        {edu.degree}
                                    </h3>
                                    <p className="text-blue-400 font-medium text-lg mb-2">{edu.school}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{edu.period}</span>
                                        </div>
                                        {edu.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                <span>{edu.location}</span>
                                            </div>
                                        )}
                                        {edu.honors && (
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Award size={16} />
                                                <span>{edu.honors}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-8 leading-relaxed text-lg">{edu.description}</p>

                            {/* Relevant Courses */}
                            {edu.courses && (
                                <div className="mb-8">
                                    <h4 className="text-white font-medium mb-4 text-lg">Relevant Courses:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.courses.map((course, courseIndex) => (
                                            <span
                                                key={courseIndex}
                                                className="bg-blue-900/20 text-blue-300 px-4 py-2 rounded-lg text-sm border border-blue-700/30 hover:bg-blue-900/30 transition-colors"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Activities and Leadership */}
                            {edu.activities && (
                                <div>
                                    <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-lg">
                                        <Users size={20} />
                                        Activities & Leadership:
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {edu.activities.map((activity, actIndex) => (
                                            <div key={actIndex} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                                                <h5 className="text-emerald-400 font-medium mb-2">{activity.title}</h5>
                                                <p className="text-gray-400 text-sm leading-relaxed">{activity.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
