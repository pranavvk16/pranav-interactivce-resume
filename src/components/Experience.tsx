
import { useState } from "react";
import AnimatedCard from "./AnimatedCard";
import { applyAlternatingAnimation } from "../utils/animations";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  expanded?: boolean;
}

const Experience = () => {
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);

  const toggleJob = (id: number) => {
    if (expandedJobs.includes(id)) {
      setExpandedJobs(expandedJobs.filter((jobId) => jobId !== id));
    } else {
      setExpandedJobs([...expandedJobs, id]);
    }
  };

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Arizon Systems",
      period: "February 2023 - Present",
      location: "Remote",
      description: "Leading development of high-quality web and mobile applications, mentoring team members, and optimizing performance.",
      responsibilities: [
        "Developed prototypes, production software, and reusable React components, reducing new feature development time.",
        "Conducted testing, debugging, and documentation, resulting in a 30% decrease in user-reported issues.",
        "Developed React Native and Three.js applications, enhancing app performance and 3D rendering.",
        "Led cross-functional teams, mentoring new members to increase productivity and reduce onboarding time.",
        "Conducted technical workshops and audits, improving team skills and identifying performance bottlenecks.",
        "Migrated MongoDB to SQL with Prisma, improving query performance by 20% and reducing costs.",
        "Streamlined codebase management with submodules, enhancing modularity.",
        "Optimized APIs through indexing and pagination, reducing query response times by 30%."
      ],
      skills: ["React", "React Native", "Three.js", "MongoDB", "SQL", "Prisma"]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "SmartQ",
      period: "November 2021 - January 2023",
      location: "Remote",
      description: "Developed front-end solutions, created intuitive UI/UX designs, and maintained existing codebases to improve functionality and performance.",
      responsibilities: [
        "Implemented front-end solutions using HTML, CSS, and JavaScript, ensuring project requirements were met.",
        "Contributed to creating intuitive UI/UX designs, translating concepts into interactive prototypes.",
        "Maintained and updated existing codebases, improving functionality and performance.",
        "Developed new features and UI components using React or Vue.js based on user feedback.",
        "Managed client relationships, gathering requirements and providing regular updates.",
        "Mentored junior team members to enhance their skills in front-end development.",
        "Collaborated with QA teams to analyze and resolve bugs, ensuring high-quality deliverables.",
        "Implemented responsive design and cross-browser compatibility for seamless user experiences."
      ],
      skills: ["React", "Vue.js", "HTML", "CSS", "JavaScript", "UI/UX Design"]
    },
    {
      id: 3,
      title: "Full Stack Web Development Intern",
      company: "Newton School (Firefox Batch)",
      period: "March 2021",
      location: "Remote",
      description: "Learned and applied full-stack development skills, participated in coding contests, and built various projects.",
      responsibilities: [
        "Learned Full Stack Development along with Problem Solving",
        "Technical Skill Learned: React, DSA, HTML, CSS, JavaScript, and Bootstrap",
        "Participated in various Coding contests organized by the platform",
        "Worked on various Projects like To-do-list, Calculator, IMDb clone",
        "Created various games like Snake and Tic-Tac-Toe"
      ],
      skills: ["React", "DSA", "HTML", "CSS", "JavaScript", "Bootstrap"]
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work <span className="text-gradient">Experience</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Over 5 years of professional experience in software development, focusing on creating engaging and high-performance applications.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-futuristic-blue/30 z-0 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((job, index) => {
              const isExpanded = expandedJobs.includes(job.id);
              const isEven = index % 2 === 0;

              return (
                <div key={job.id} className={`relative ${applyAlternatingAnimation(index)}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-futuristic-accent z-10"></div>

                  <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                    <AnimatedCard 
                    className="relative backdrop-blur-md border border-gray-700/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                     glowEffect={true}>

                    <div className="absolute inset-0 pointer-events-none">
  <div className="h-full w-full opacity-10 animate-pulse bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:15px_15px]"></div>
</div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        <button
                          onClick={() => toggleJob(job.id)}
                          className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp size={18} className="text-white/70" />
                          ) : (
                            <ChevronDown size={18} className="text-white/70" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-futuristic-accent mb-1">
                        <Briefcase size={14} />
                        <span className="text-sm font-medium">{job.company}</span>
                      </div>

                      <div className="flex items-center gap-1 text-white/60 mb-3">
                        <Calendar size={14} />
                        <span className="text-sm">{job.period}</span>
                      </div>

                      <p className="text-white/80 text-sm mb-4">{job.description}</p>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                          <h4 className="text-sm font-semibold text-white mb-2">Responsibilities:</h4>
                          <ul className="space-y-2 mb-4">
                            {job.responsibilities.map((responsibility, idx) => (
                              <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                                <span className="min-w-[6px] h-[6px] mt-1.5 bg-futuristic-accent rounded-full"></span>
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>

                          <h4 className="text-sm font-semibold text-white mb-2">Skills Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </AnimatedCard>
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

export default Experience;
