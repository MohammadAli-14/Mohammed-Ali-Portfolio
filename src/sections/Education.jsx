import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "BS in Computer Science",
    institution: "International Islamic University, H-10 Islamabad",
    duration: "2021 – 2025",
    grade: "CGPA: 3.66 / 4.0",
    details: [
      "Specialized in Artificial Intelligence, Machine Learning, and Computer Vision coursework.",
      "Final Year Project: GreenSnap AI - Intelligent waste classification using YOLOv11 and MobileNetV3 Large.",
      "Core focus on deep learning, algorithms, computer vision, and distributed systems."
    ]
  },
  {
    degree: "Higher Secondary School Certificate (HSSC)",
    institution: "Punjab College of Science",
    duration: "2019 – 2021",
    grade: "Grade: A",
    details: [
      "Majored in Pre-Engineering (Mathematics, Physics, Chemistry).",
      "Built strong analytical foundation for software engineering and algorithms."
    ]
  }
];

const Education = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".edu-card",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#education",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".skills-container",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#education",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="education" className="flex-center section-padding relative bg-black">
      <div className="w-full h-full md:px-10 px-5 max-w-7xl mx-auto">
        <TitleHeader
          title="🎓 Education & Skills"
          sub="My academic journey and technical expertise"
        />

        {/* Main Container */}
        <div className="mt-16 flex flex-col lg:flex-row gap-8">
          {/* Education Timeline - Left Column */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="edu-card bg-[#09090b]/80 border border-white/10 rounded-2xl p-6 sm:p-7 relative pl-10 sm:pl-12 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Timeline indicator */}
                  <div className="absolute left-5 sm:left-6 top-7 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  <div className="absolute left-[25px] sm:left-[29px] top-7 bottom-7 w-0.5 bg-gradient-to-b from-white/40 to-transparent" />

                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1.5">
                          {edu.degree}
                        </h3>
                        <p className="text-zinc-400 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-1 md:mt-0 md:text-right">
                        <span className="inline-block px-3 py-1 bg-zinc-900/80 text-zinc-300 border border-zinc-800 rounded-full text-xs font-mono font-medium">
                          {edu.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-lg text-xs font-mono font-medium">
                        {edu.grade}
                      </div>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {edu.details.map((detail, idx) => (
                        <li key={idx} className="text-zinc-400 text-sm flex items-start">
                          <span className="mr-2 text-zinc-300">•</span>
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
            <div className="skills-container bg-[#09090b]/80 border border-white/10 rounded-2xl p-6 sm:p-7 h-full sticky top-24 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <span>⚙️</span>
                <span>Technical Skills</span>
              </h3>

              <div className="space-y-8">
                {/* Programming Languages */}
                <div>
                  <h4 className="text-white font-medium mb-3 text-base">
                    Programming Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "C++", "SQL"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-mono font-medium hover:bg-zinc-800 hover:border-white/30 hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI/ML Frameworks */}
                <div>
                  <h4 className="text-white font-medium mb-3 text-base">
                    AI/ML Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["TensorFlow", "PyTorch", "OpenCV", "Hugging Face", "Ultralytics"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-mono font-medium hover:bg-zinc-800 hover:border-white/30 hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Web Development */}
                <div>
                  <h4 className="text-white font-medium mb-3 text-base">
                    Web Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Express", "MongoDB"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-mono font-medium hover:bg-zinc-800 hover:border-white/30 hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & DevOps */}
                <div>
                  <h4 className="text-white font-medium mb-3 text-base">
                    Tools & DevOps
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "GitHub"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-mono font-medium hover:bg-zinc-800 hover:border-white/30 hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
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

export default React.memo(Education);