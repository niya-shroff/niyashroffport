import React from 'react';
import { 
  Code, 
  Database, 
  Brain, 
  Cloud, 
  Palette, 
  Settings 
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 90 },
        { name: 'JavaScript/TypeScript', level: 88 },
        { name: 'HTML/CSS', level: 92 },
        { name: 'Tailwind CSS', level: 85 },
      ],
      color: 'emerald'
    },
    {
      icon: Database,
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 90 },
        { name: 'Java', level: 80 },
        { name: 'PostgreSQL', level: 82 },
      ],
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      skills: [
        { name: 'TensorFlow/Keras', level: 85 },
        { name: 'Scikit-learn', level: 88 },
        { name: 'Pandas/NumPy', level: 90 },
        { name: 'Data Analysis', level: 87 },
      ],
      color: 'purple'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Git/GitHub', level: 90 },
        { name: 'CI/CD', level: 70 },
      ],
      color: 'amber'
    },
    {
      icon: Palette,
      title: 'Design & Tools',
      skills: [
        { name: 'Figma', level: 75 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'Responsive Design', level: 88 },
        { name: 'Prototyping', level: 75 },
      ],
      color: 'pink'
    },
    {
      icon: Settings,
      title: 'Other Technologies',
      skills: [
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 70 },
        { name: 'Testing', level: 80 },
        { name: 'Agile/Scrum', level: 85 },
      ],
      color: 'indigo'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-600 bg-emerald-500',
      blue: 'from-blue-500 to-blue-600 bg-blue-500',
      purple: 'from-purple-500 to-purple-600 bg-purple-500',
      amber: 'from-amber-500 to-amber-600 bg-amber-500',
      pink: 'from-pink-500 to-pink-600 bg-pink-500',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-500',
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorClasses(category.color)} mr-4`}>
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses(category.color)} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;