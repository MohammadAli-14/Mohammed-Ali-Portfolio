import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import AntigravityIcon from "../components/AntigravityIcon";
import { techStackImgs } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="skills" className="flex-center section-padding relative overflow-hidden bg-black">
      <div className="w-full h-full md:px-10 px-5 max-w-7xl mx-auto relative z-10">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="⚡ Zero-Gravity Interactive Tech Stack"
        />

        <div className="tech-grid mt-12 md:mt-16">
          {techStackImgs.map((tech, index) => {
            const floatConfigs = [
              { floatY: 9, floatX: 4, rotZ: 3, duration: 3200, delay: 0 },
              { floatY: 11, floatX: -5, rotZ: -4, duration: 3600, delay: 400 },
              { floatY: 8, floatX: 5, rotZ: 3.5, duration: 3000, delay: 800 },
              { floatY: 12, floatX: -4, rotZ: -3, duration: 3800, delay: 1200 },
              { floatY: 10, floatX: 6, rotZ: 4, duration: 3400, delay: 1600 },
            ];
            const config = floatConfigs[index % floatConfigs.length];

            return (
              <div
                key={tech.name || index}
                className="tech-card card-border group relative rounded-2xl md:rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col items-center justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                style={{
                  background: "linear-gradient(180deg, rgba(18, 18, 22, 0.75) 0%, rgba(9, 9, 11, 0.95) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {/* Dynamic hover backdrop highlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl md:rounded-3xl"
                  style={{
                    background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                  }}
                />

                {/* Floating Antigravity Icon */}
                <div className="my-4 sm:my-6 flex items-center justify-center w-full min-h-[160px]">
                  <AntigravityIcon
                    src={tech.imgPath}
                    alt={tech.name}
                    name={tech.name}
                    size="lg"
                    floatY={config.floatY}
                    floatX={config.floatX}
                    rotZ={config.rotZ}
                    duration={config.duration}
                    delay={config.delay}
                  />
                </div>

                {/* Tech Title & Role */}
                <div className="w-full text-center relative z-10 mt-2">
                  <h3 className="text-white text-base sm:text-lg font-semibold tracking-wide group-hover:text-zinc-200 transition-colors duration-200">
                    {tech.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Active Skill</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TechStack);
