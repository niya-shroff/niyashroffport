import React from 'react';
import { Calendar, MapPin, Building, GraduationCap, Award, Users, ExternalLink, Code, Brain, TrendingUp } from 'lucide-react';

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

  const education = [
    {
      degree: 'BS in Computer Science & BA in Economics (Dual Degree)',
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
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Experience ☻ </h2>
            <p className="text-gray-400 text-lg">
              My professional journey and educational background
            </p>
          </div>

          {/* Professional Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Building className="text-emerald-400" size={24} />
              Professional Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-emerald-400 to-transparent"></div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-800 rounded-2xl p-6">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                            <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(exp.type)}`}>
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-emerald-400 font-medium mb-2">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                      
                      <div className="mb-4">
                        <h5 className="text-white font-medium mb-2">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-gray-400 text-sm flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Links */}
                      {exp.links && (
                        <div className="mb-4">
                          <h5 className="text-white font-medium mb-2">Related Links:</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm transition-colors duration-200"
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
                            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="text-blue-400" size={24} />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-blue-400 font-medium mb-1">{edu.school}</p>
                      {edu.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                          <MapPin size={14} />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar size={14} />
                          <span>{edu.period}</span>
                        </div>
                        {edu.honors && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Award size={14} />
                            <span>{edu.honors}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">{edu.description}</p>
                  
                  {/* Relevant Courses */}
                  {edu.courses && (
                    <div className="mb-6">
                      <h5 className="text-white font-medium mb-3">Relevant Courses:</h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-lg text-sm border border-blue-700/30"
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
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Users size={16} />
                        Activities & Leadership:
                      </h5>
                      <div className="space-y-3">
                        {edu.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="bg-gray-700/50 rounded-lg p-4">
                            <h6 className="text-emerald-400 font-medium mb-1">{activity.title}</h6>
                            <p className="text-gray-300 text-sm">{activity.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;