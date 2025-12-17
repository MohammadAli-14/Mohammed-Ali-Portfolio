import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  useGSAP(() => {
    gsap.utils.toArray(".edu-card").forEach((card) => {
      gsap.from(card, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Animate skills section
    gsap.from(".skills-container", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
      },
    });
  });

  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "International Islamic University H-10 Islamabad, Pakistan",
      duration: "2021 - 2025",
      grade: "CGPA: 3.66/4.0",
      details: [
        "Specialization in Computer Science with focus on AI and Machine Learning",
        "Coursework: Artificial Intelligence, Web Development, NLP, Data Structures",
        "Senior Project: GreenSnap AI: An AI-Enabled Geo-Verified Waste Reporting and Verification System"
      ]
    },
    {
      degree: "F.Sc. Pre-Engineering",
      institution: "Punjab Group of Colleges, Rawalpindi",
      duration: "2019 - 2021",
      grade: "Percentage: 88.09%",
      details: [
        "Major Subjects: Mathematics, Physics, Chemistry",
      ]
    },
    {
      degree: "Matriculation",
      institution: "Allied School System, Shahbagh",
      duration: "2017 - 2019",
      grade: "Percentage: 87.78%",
      details: [
        "Computer Science Major",
      ]
    }
  ];

  return (
    <section id="education" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="🎓 Education & Skills"
          sub="My academic journey and technical expertise"
        />
        
        {/* Main Container - Now using flex instead of grid for better alignment */}
        <div className="mt-16 flex flex-col lg:flex-row gap-8">
          {/* Education Timeline - Left Column */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="edu-card card-border rounded-xl p-6 relative pl-10 hover:border-gray-700 transition-all duration-300"
                >
                  {/* Timeline indicator */}
                  <div className="absolute left-6 top-6 w-3 h-3 bg-blue-500 rounded-full shadow-lg" />
                  <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent" />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-white-50 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 md:text-right">
                        <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium">
                          {edu.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-gray-800/50 text-white rounded-lg font-medium">
                        {edu.grade}
                      </div>
                    </div>
                    
                    <ul className="space-y-2 pt-2">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="text-white-50 text-sm flex items-start">
                          <span className="mr-2 text-blue-400">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills Section - Right Column */}
          <div className="lg:w-1/3">
            <div className="skills-container card-border rounded-xl p-6 h-full sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Technical Skills
              </h3>
              
              <div className="space-y-8">
                {/* Programming Languages */}
                <div>
                  <h4 className="text-white font-medium mb-4 text-lg">
                    Programming Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "C++", "SQL"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gray-900/80 text-white rounded-lg text-sm font-medium hover:bg-blue-900/50 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* AI/ML Frameworks */}
                <div>
                  <h4 className="text-white font-medium mb-4 text-lg">
                    AI/ML Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["TensorFlow", "PyTorch",  "OpenCV", "Hugging Face","Ultralytics"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gray-900/80 text-white rounded-lg text-sm font-medium hover:bg-purple-900/50 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Web Development */}
                <div>
                  <h4 className="text-white font-medium mb-4 text-lg">
                    Web Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Express", "MongoDB"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gray-900/80 text-white rounded-lg text-sm font-medium hover:bg-green-900/50 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tools & DevOps */}
                <div>
                  <h4 className="text-white font-medium mb-4 text-lg">
                    Tools & DevOps
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "GitHub"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gray-900/80 text-white rounded-lg text-sm font-medium hover:bg-yellow-900/50 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;