import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Animate entire section
    gsap.from(containerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    // Animate image specifically
    gsap.from(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 90%",
      },
    });

    // Animate text content
    gsap.from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
      },
    });
  });

  return (
    <section id="about" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Consistent Header using TitleHeader component */}
        <TitleHeader
          title="About Me"
          sub="Learn more about my journey"
        />

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-start gap-12 md:gap-16 mt-12 md:mt-16">
          
          {/* Image Container */}
          <div className="w-full lg:w-2/5">
            <div 
              ref={imageRef}
              className="relative w-full max-w-md mx-auto group"
              style={{ aspectRatio: '464/529' }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-800 bg-black-100 p-1">
                <img
                  src="/images/image1.png"
                  alt="Mohammed Ali - AI Application Engineer"
                  className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ objectPosition: 'top center' }}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg pointer-events-none"></div>
                
                {/* Border glow effect on hover */}
                <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-gray-600/30 transition-colors duration-500 pointer-events-none"></div>
              </div>
              
              {/* Image caption */}
              <p className="text-center text-gray-500 text-sm mt-3">
                Mohammed Ali - AI Application Engineer
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-3/5" ref={textRef}>
            <div className="space-y-10">
              {/* Main Description */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-normal">
                    I'm <span className="text-gray-100 font-medium">Mohammed Ali</span>, a passionate Junior AI Application Engineer dedicated to building intelligent, scalable solutions that solve real-world problems.
                  </p>
                  
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                    With a strong foundation in computer science and specialized expertise in AI/ML, I focus on creating production-ready applications that blend cutting-edge technology with practical usability.
                  </p>
                </div>
              </div>

              {/* What Drives Me Section */}
              <div className="space-y-8 pt-10 border-t border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  What Drives Me
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-200"></div>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed font-light group-hover:text-white transition-colors duration-200">
                      Building efficient AI systems that deliver tangible value
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-200"></div>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed font-light group-hover:text-white transition-colors duration-200">
                      Creating clean, maintainable code that scales
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-2.5 h-2.5 bg-white rounded-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-200"></div>
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed font-light group-hover:text-white transition-colors duration-200">
                      Continuous learning and adapting to new technologies
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Note */}
              <div className="mt-10 p-6 bg-[#09090b]/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-300 leading-relaxed font-light">
                      Graduate with a BS in Computer Science (CGPA 3.66/4.0) from International Islamic University, Islamabad, specializing in Artificial Intelligence, Machine Learning, and Computer Vision.
                    </p>
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

export default About;