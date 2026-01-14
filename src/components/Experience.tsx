import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'JPMorgan Chase & Co.',
      location: 'Jersey City, NJ',
      period: 'Jul 2025 - Present',
      type: 'Full-time',
      description: 'Full-stack software engineer within the Asset & Wealth Management Line of Business, developing enterprise-level financial applications and contributing to critical business systems.',
      achievements: [
        'Developing scalable full-stack applications using modern technologies',
        'Contributing to enterprise-level financial software solutions',
        'Collaborating with cross-functional teams on high-impact projects'
      ],
      technologies: ['Fullstack Development', 'GraphQL', 'Java', 'React', 'Python']
    },
    {
      title: 'Sales Specialist',
      company: 'Apple',
      location: 'Holyoke, MA',
      period: 'Nov 2024 - Jan 2025',
      type: 'Seasonal',
      description: 'Provided exceptional customer support and technical expertise while contributing to store success and maintaining high customer satisfaction scores.',
      achievements: [
        'Provided customer support by sharing product knowledge',
        'Formed business connections and relationships with business owners',
        'Positively contributed to the store\'s success to maintain a high net promoter score'
      ],
      technologies: ['Sales', 'Retail Sales', 'Customer Service', 'Product Knowledge']
    },
    {
      title: 'Student IT Consultant',
      company: 'University of Massachusetts Amherst',
      location: 'Amherst, MA',
      period: 'Oct 2023 - Dec 2024',
      type: 'Part-time',
      description: 'Delivered comprehensive technical support to the university community through multiple channels including in-person assistance and remote support platforms.',
      achievements: [
        'Provided in-person technical assistance to students, staff, and faculty on campus',
        'Created and managed Tier 1 support tickets in the ServiceNow platform',
        'Offered remote chat support through Bomgar platform'
      ],
      technologies: ['ServiceNow', 'Bomgar', 'Technical Support', 'IT Consulting']
    },
    {
      title: 'Software Engineering Intern',
      company: 'J.P. Morgan Asset Management',
      location: 'Manhattan, NY',
      period: 'Jun 2024 - Aug 2024',
      type: 'Internship',
      description: 'Joined the hedge fund Highbridge\'s Engineering Team within the Asset & Wealth Management division, developing enterprise-level financial software solutions.',
      achievements: [
        'Developed two Java backend microservices and a React frontend with Beneficial Ownership data',
        'Improved codebase by abstracting core functionalities and increasing its scalability LOB-wide',
        'Collaborated with senior engineers on high-impact financial technology projects'
      ],
      technologies: ['Java', 'React', 'Microservices', 'Financial Technology', 'Backend Development']
    },
    {
      title: 'Undergraduate Researcher',
      company: 'Human Computer Interaction & Visualization Lab at UMass Amherst',
      location: 'Amherst, MA',
      period: 'Feb 2023 - Jan 2024',
      type: 'Research',
      description: 'Conducted advanced research in data visualization and network analysis, collaborating with post-doctoral researchers and faculty members on cutting-edge HCI projects.',
      achievements: [
        'Created a graph-based visualization using the Pandas framework in Python, NetworkX, and Gephi',
        'Collaborated with post-doc researcher Natkamon, Professor Ali, and Professor Narges',
        'Modeled hidden network relationships using D3, React, Express, and Sigma JavaScript libraries',
        'Ultimately modeled the supervisee and supervisor relationship to provide insight into this relationship'
      ],
      technologies: ['Python', 'Pandas', 'NetworkX', 'Gephi', 'D3.js', 'React', 'Express', 'Sigma.js'],
      links: [
        { title: 'Lab Website', url: 'https://groups.cs.umass.edu/hci-vis/' },
        { title: 'Research Presentation', url: 'https://tinyurl.com/hci-vis-presentation' }
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'JPMorgan Chase & Co.',
      location: 'Jersey City, NJ',
      period: 'Jun 2023 - Aug 2023',
      type: 'Internship',
      description: 'Worked within the Corporate Technology LOB and Legal Tech sub-division, developing full-stack applications and gaining comprehensive experience in enterprise software development lifecycle.',
      achievements: [
        'Developed a user-friendly analytics app utilizing Adobe Analytics, React.js, Flask, and Bootstrap',
        'Led weekly stand-ups and other AGILE team meetings and collaborated with senior developers',
        'Worked on JIRA stories under the Corporate Tech LOB and within the Legal Tech subfield',
        'Created a full-stack data extraction application working with partner and senior developers',
        'Certified as an AWS Cloud Practitioner'
      ],
      technologies: ['React.js', 'Flask', 'Bootstrap', 'Adobe Analytics', 'AWS', 'JIRA', 'Agile']
    },
    {
      title: 'Advancement Intern',
      company: 'School Year Abroad',
      location: 'North Andover, MA',
      period: 'Jan 2022 - May 2023',
      type: 'Internship',
      description: 'Managed donor relations and database operations for educational nonprofit organization, leading outreach initiatives and processing donor engagement activities.',
      achievements: [
        'Researched 1,000+ constituents and updated their information in their CRM database (RE)',
        'Lead an outreach volunteering project and managed communication with SYA alumni/parents',
        'Processed event registrations and converted potential donors into active donors seen via Give Campus data',
        'Certified in Raiser\'s Edge at the Fundamentals Level'
      ],
      technologies: ['Raiser\'s Edge', 'CRM Management', 'Give Campus', 'Database Management']
    },
    {
      title: 'NPO Founder',
      company: 'Care Cardz',
      location: 'Chelmsford, MA',
      period: 'Jun 2020 - May 2023',
      type: 'Founder',
      description: 'Founded and led a nonprofit organization dedicated to spreading joy in the community through handwritten cards, managing all aspects from operations to partnerships.',
      achievements: [
        'Founded a nonprofit organization dedicated to spreading joy in the community through handwritten cards',
        'Solicited 1,500+ card donations to send out and effectively communicated with top card-making companies',
        'Coordinated 5 major card projects for healthcare workers, first responders, etc. and networked globally'
      ],
      technologies: ['Nonprofit Management', 'Project Coordination', 'Partnership Development', 'Community Outreach']
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      'Seasonal': 'bg-blue-900/30 text-blue-300 border-blue-700/30',
      'Part-time': 'bg-green-900/30 text-green-300 border-green-700/30',
      'Internship': 'bg-purple-900/30 text-purple-300 border-purple-700/30',
      'Research': 'bg-amber-900/30 text-amber-300 border-amber-700/30',
      'Founder': 'bg-emerald-900/30 text-emerald-300 border-emerald-700/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-900/30 text-gray-300 border-gray-700/30';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-emerald-400">Professional Experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            My professional journey and career highlights.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-gray-700/50 hover:border-emerald-500/50 transition-colors duration-300"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-900 border-2 border-emerald-500 rounded-full"></div>

              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-sm hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getTypeColor(exp.type)}`}>
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building size={16} className="text-emerald-400" />
                      <p className="text-emerald-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div className="flex items-center gap-1 mb-1 justify-end">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                <div className="mb-6">
                  <h5 className="text-white font-medium mb-3">Key Achievements:</h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 mt-1.5 min-w-[6px] h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                {exp.links && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {exp.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-emerald-900/30 text-emerald-400 hover:text-emerald-300 rounded-md text-sm transition-colors duration-200 border border-transparent hover:border-emerald-500/30"
                        >
                          <ExternalLink size={14} />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;