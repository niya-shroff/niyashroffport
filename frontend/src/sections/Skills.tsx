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
      icon: Database,
      title: 'BACKEND_DEV',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Java', level: 80 },
        { name: 'Node.js', level: 70 },
        { name: 'Databases', level: 70 },
      ],
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'ARTIFICIAL_INTELLIGENCE',
      skills: [
        { name: 'RAG & LLMs', level: 70 },
        { name: 'LangChain', level: 85 },
        { name: 'Prompt Eng', level: 90 },
        { name: 'Pandas/NumPy', level: 60 }
      ],
      color: 'purple'
    },
    {
      icon: Code,
      title: 'FRONTEND_DEV',
      skills: [
        { name: 'React/Next.js', level: 65 },
        { name: 'Angular', level: 50 },
        { name: 'TypeScript', level: 65 },
        { name: 'HTML/CSS', level: 65 },
      ],
      color: 'emerald'
    },
    {
      icon: Cloud,
      title: 'CLOUD_&_DEVOPS',
      skills: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 70 },
        { name: 'Git/GitHub', level: 90 },
        { name: 'CI/CD', level: 80 },
      ],
      color: 'amber'
    },
    {
      icon: Palette,
      title: 'DESIGN_&_TOOLS',
      skills: [
        { name: 'Figma', level: 60 },
        { name: 'UI/UX Design', level: 70 },
        { name: 'Responsive', level: 70 },
        { name: 'Prototyping', level: 60 },
      ],
      color: 'pink'
    },
    {
      icon: Settings,
      title: 'OTHER_FRAMEWORKS',
      skills: [
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 50 },
        { name: 'E2E Testing', level: 90 },
        { name: 'Agile/Scrum', level: 85 },
      ],
      color: 'indigo'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'text-accent-emerald border-accent-emerald/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-accent-emerald',
      blue: 'text-primary border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.2)] bg-primary',
      purple: 'text-purple-400 border-purple-400/30 shadow-[0_0_15px_rgba(192,132,252,0.2)] bg-purple-400',
      amber: 'text-amber-400 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.2)] bg-amber-400',
      pink: 'text-accent-crimson border-accent-crimson/30 shadow-[0_0_15px_rgba(225,29,72,0.2)] bg-accent-crimson',
      indigo: 'text-indigo-400 border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.2)] bg-indigo-400',
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <section id="skills" className="py-24 bg-background relative border-t border-gray-800">
      {/* Decorative floating lines */}
      <div className="absolute top-0 right-[10%] w-[1px] h-32 bg-gradient-to-b from-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-[10%] w-[1px] h-32 bg-gradient-to-t from-accent-emerald/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="font-mono text-primary text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-primary block"></span>
              SYS.MODULE
              <span className="w-4 h-[1px] bg-primary block"></span>
            </div>
            <h2 className="text-3xl font-mono text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">TECHNICAL_ARSENAL</h2>
            <p className="text-muted font-mono text-xs max-w-xl mx-auto uppercase tracking-wider">
              &gt; A visual overview of technical capabilities and specialized modules. Always optimizing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const colorClasses = getColorClasses(category.color);
              const textColor = colorClasses.split(' ')[0];
              const borderColor = colorClasses.split(' ')[1];
              const shadowColor = colorClasses.split(' ')[2];
              const bgColor = colorClasses.split(' ')[3];

              return (
                <div
                  key={index}
                  className={`card !p-0 overflow-hidden group hover:${borderColor} hover:${shadowColor}`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-2 border border-gray-700/50 rounded flex items-center justify-center group-hover:border-transparent group-hover:${bgColor} transition-colors duration-300`}>
                        <category.icon className={`w-5 h-5 ${textColor} group-hover:text-background transition-colors duration-300`} />
                      </div>
                      <div className="text-[10px] font-mono text-muted uppercase">ID: {index + 1}0</div>
                    </div>

                    <h3 className={`text-sm font-mono tracking-widest ${textColor} mb-6`}>{category.title}</h3>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex justify-between items-center font-mono text-[10px] uppercase">
                            <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className={textColor}>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-[2px]">
                            <div
                              className={`h-full ${bgColor} transition-all duration-1000 ease-out`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative Footer */}
                  <div className="bg-surfaceHover px-6 py-2 border-t border-gray-800 flex justify-between items-center">
                    <span className="font-mono text-[8px] text-muted">STATUS: ONLINE</span>
                    <div className="flex gap-1">
                      <div className={`w-1 h-1 rounded-full ${bgColor} animate-pulse`}></div>
                      <div className={`w-1 h-1 rounded-full ${bgColor} opacity-30`}></div>
                      <div className={`w-1 h-1 rounded-full ${bgColor} opacity-30`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;