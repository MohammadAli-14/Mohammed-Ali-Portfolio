import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import WordRotator from "../components/WordRotator";
import HeroVisual from "../components/HeroVisual";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-badge-pill",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-text h1",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power2.out", delay: 0.1 }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
    );

    gsap.fromTo(
      ".hero-cta-group",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.55 }
    );
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-12 bg-black"
    >
      {/* Subtle Background Texture */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-10">
        <img src="/images/bg.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT: Hero Content (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Status Badge - Monochrome Design */}
          <div className="hero-badge-pill mb-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/70 border border-white/15 backdrop-blur-md w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-300 font-mono">
              Available for AI & Full-Stack Roles
            </span>
          </div>

          {/* Dynamic Headline */}
          <div className="hero-text text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2]">
            <h1 className="flex items-center flex-wrap gap-y-2">
              <span>Architecting</span>
              <WordRotator />
            </h1>
            <h1 className="text-white mt-1 sm:mt-2">into Functional Projects</h1>
            <h1 className="text-white mt-1 sm:mt-2">
              that Yield Value
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle mt-6 text-base sm:text-lg lg:text-xl text-zinc-400 max-w-xl leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">Mohammed Ali</span>, a Junior AI Application Engineer based in Pakistan specializing in computer vision, generative AI, and high-performance web systems.
          </p>

          {/* CTA Buttons Group */}
          <div className="hero-cta-group mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <Button
              text="See My Projects"
              className="w-48 sm:w-56 h-12 sm:h-14 font-semibold"
              id="projects"
            />

            <button
              onClick={() => handleScrollTo("contact")}
              className="px-6 py-3.5 sm:py-4 rounded-xl border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-500 active:scale-95 text-white text-sm sm:text-base font-semibold backdrop-blur-md transition-all duration-200 flex items-center gap-2 cursor-pointer group shadow-sm"
            >
              <span>Get in Touch</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Quick Tech Highlights */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200">Specialties:</span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800 text-zinc-300 font-mono font-medium">PyTorch & YOLO</span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800 text-zinc-300 font-mono font-medium">React 19 & Three.js</span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800 text-zinc-300 font-mono font-medium">Azure AI (AI-900)</span>
          </div>
        </div>

        {/* RIGHT: Visual (5 cols on desktop) */}
        <div className="lg:col-span-5 w-full flex justify-center items-center">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;