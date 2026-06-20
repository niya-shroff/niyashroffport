import {
  Code,
  Database,
  Brain,
  Cloud,
  Palette,
  Settings,
  Wrench
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Database,
      title: 'Backend Development',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Java', level: 80 },
        { name: 'Node.js', level: 70 },
        { name: 'Databases', level: 70 },
      ],
      color: 'lavender',
      bgColor: 'bg-lavender',
      accentColor: 'text-lavender',
      colorClass: 'border-lavender/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      skills: [
        { name: 'RAG & LLMs', level: 70 },
        { name: 'LangChain', level: 85 },
        { name: 'Prompt Eng', level: 90 },
        { name: 'Pandas/NumPy', level: 60 }
      ],
      color: 'skyBlue',
      bgColor: 'bg-skyBlue',
      accentColor: 'text-skyBlue',
      colorClass: 'border-skyBlue/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
    {
      icon: Code,
      title: 'Frontend Development',
      skills: [
        { name: 'React / Next.js', level: 65 },
        { name: 'Angular', level: 50 },
        { name: 'TypeScript', level: 65 },
        { name: 'HTML / CSS', level: 65 },
      ],
      color: 'pink',
      bgColor: 'bg-pink',
      accentColor: 'text-pink',
      colorClass: 'border-pink/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 70 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'CI / CD', level: 80 },
      ],
      color: 'mint',
      bgColor: 'bg-mint',
      accentColor: 'text-mint',
      colorClass: 'border-mint/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
    {
      icon: Palette,
      title: 'Design & UI/UX',
      skills: [
        { name: 'Figma', level: 60 },
        { name: 'UI/UX Design', level: 70 },
        { name: 'Responsive Layouts', level: 70 },
        { name: 'Prototyping', level: 60 },
      ],
      color: 'coral',
      bgColor: 'bg-coral',
      accentColor: 'text-coral',
      colorClass: 'border-coral/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
    {
      icon: Settings,
      title: 'Methodologies & Other',
      skills: [
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 50 },
        { name: 'E2E Testing', level: 90 },
        { name: 'Agile / Scrum', level: 85 },
      ],
      color: 'butterYellow',
      bgColor: 'bg-butterYellow',
      accentColor: 'text-slate-600 dark:text-butterYellow',
      colorClass: 'border-butterYellow/30 bg-white/70 dark:bg-[#1A2333]/70'
    },
  ];

  return (
    <section id="skills" className="py-24 bg-transparent relative border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="font-serif text-coral text-2xl tracking-widest mb-2 flex items-center gap-2">
              <Wrench size={16} />
              <span>Skillset</span>
            </div>
            <h2 className="text-xl font-serif text-gray 900 dark:text-white mb-4 tracking-tight">Tools & Technologies</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`card !p-0 overflow-hidden border ${category.colorClass} hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-2.5 rounded-lg ${category.bgColor}/20 flex items-center justify-center`}>
                        <category.icon className="w-5 h-5 text-ink dark:text-white" />
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-semibold text-slate-800 dark:text-slate-100 mb-6">{category.title}</h3>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex justify-between items-center font-sans text-xs">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                            <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-[3px] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${category.bgColor} transition-all duration-1000 ease-out`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
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