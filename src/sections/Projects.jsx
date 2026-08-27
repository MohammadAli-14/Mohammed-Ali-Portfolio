import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: '🚀 Talent Quotient Platform',
    desc: 'The premier platform for collaborative coding interviews. Experience seamless pair programming, real-time collaborations.',
    ss: '/talent-quotient.png',
    tech: ['React.js', 'JavaScript', 'Tailwind', 'MongoDB', 'Node.js'],
    live: 'https://talent-quotient-frontend.vercel.app/',
    code: 'https://github.com/MohammadAli-14/Talent-Quotient-V-2'
  },
  {
    title: '💬 Real-time Chat Application',
    desc: 'Scalable chat application with real-time messaging, user authentication, and Redis caching for optimal performance.',
    ss: '/thug-slayers.png',
    tech: ['Redis', 'Socket.io', 'React.js', 'Express', 'Tailwind', 'Node.js'],
    live: 'https://thug-slayers-chat-app-frontend.vercel.app/',
    code: 'https://github.com/MohammadAli-14/ts-redis-chat-app'
  },
  {
    title: '📝 NoteBook App',
    desc: 'Modern note-taking application with rich text editing, organization features, and cloud synchronization.',
    ss: '/noteboard.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'DaisyUi'],
    live: 'https://note-book-app-frontend.vercel.app/',
    code: 'https://github.com/MohammadAli-14/Note-Book-App'
  },
  {
    title: '🌿 GreenSnap Admin Dashboard',
    desc: 'Admin dashboard for waste reports tracking, worker and supervisor management',
    ss: '/greensnap.png',
    tech: ['React', 'MobileNet v3 Large', 'YOLO v11', 'Node.js', 'Express'],
    live: 'https://web-admin-greensnap.vercel.app/',
    code: 'https://github.com/Muhammad5Ali/web-admin-greensnap'
  }
];

const Projects = () => {
  useGSAP(() => {
    // Only run animations on non-mobile devices
    if (window.innerWidth > 768) {
      gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none none",
            once: true // Only animate once
          },
        });
      });
    }
  });

  return (
    <section id="projects" className="flex-center section-padding">
      <div className="w-full h-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <TitleHeader
          title="🚀 My Projects"
          sub="A collection of my major full-stack applications."
        />
        
        {/* Projects Grid - Optimized for mobile */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="project-card bg-[#09090b]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all duration-300 backdrop-blur-sm"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-40 sm:h-44 md:h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-transparent z-10" />
                  <img
                    src={project.ss}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-project.png';
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-full font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-full font-mono font-medium">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Buttons with Icons */}
                  <div className="flex gap-2 sm:gap-3 pt-3 border-t border-white/10">
                    {/* Code Button with GitHub Icon */}
                    <a
                      href={project.code}
                      className="flex-1 py-2.5 px-3 bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-center rounded-xl hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>Code</span>
                    </a>
                    
                    {/* Live Demo Button with External Link Icon */}
                    <a
                      href={project.live}
                      className="flex-1 py-2.5 px-3 bg-white hover:bg-zinc-200 text-black text-center rounded-xl font-semibold shadow-sm transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Tips */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-white-50 text-sm">
            💡 <span className="hidden sm:inline">Click buttons to explore code & live demos</span>
            <span className="sm:hidden">Tap buttons to explore</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;