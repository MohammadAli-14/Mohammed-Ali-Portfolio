import React, { useState } from "react";
import { navLinks } from "../constants";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (link) => {
    const target = document.getElementById(link.replace("#", ""));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mohammedali5072008@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <footer className="relative z-20 pt-16 pb-12 px-4 sm:px-6 lg:px-16 overflow-hidden border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Pre-Footer Hero CTA Card with Monochromatic Double-Bezel Design */}
        <div
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-16 border border-white/15 overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.8)]"
          style={{
            background: "linear-gradient(180deg, rgba(24, 24, 28, 0.9) 0%, rgba(10, 10, 12, 0.98) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-mono font-medium text-zinc-300 mb-4">
                <span>✦</span>
                <span>Open for Collaboration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Let’s build something remarkable together.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                Looking for an AI Application Engineer or Full-Stack Developer to turn ideas into production-ready software? Let's connect.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleNavClick("#contact")}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-semibold text-sm sm:text-base shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Conversation</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-xl border border-zinc-700/80 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <span className="text-white">✓</span>
                    <span className="text-zinc-200">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-zinc-300 transition-colors"
              >
                Mohammed Ali
              </a>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] font-mono font-medium">
                AI / SWE
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Junior AI Application Engineer crafting robust machine learning pipelines, computer vision models, and responsive full-stack web applications.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Based in Islamabad, Pakistan • Remote Worldwide
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {navLinks.map(({ name, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                    className="text-zinc-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Direct Connect (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
              Connect & Profiles
            </p>

            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="https://github.com/MohammadAli-14"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white group-hover:text-zinc-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-zinc-300 group-hover:text-white font-mono text-xs">github.com/MohammadAli-14</span>
                </div>
                <span className="text-zinc-500 group-hover:text-white transition-colors">↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/mohammed-ali-3791062b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white group-hover:text-zinc-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-zinc-300 group-hover:text-white font-mono text-xs">linkedin.com/in/mohammed-ali</span>
                </div>
                <span className="text-zinc-500 group-hover:text-white transition-colors">↗</span>
              </a>

              <a
                href="mailto:mohammedali5072008@gmail.com"
                className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-white/30 hover:bg-zinc-900 transition-all duration-200"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="text-base">✉️</span>
                  <span className="text-zinc-300 group-hover:text-white truncate font-mono text-xs">mohammedali5072008@gmail.com</span>
                </div>
                <span className="text-zinc-500 group-hover:text-white transition-colors">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Mohammed Ali. All rights reserved.</p>

          <p className="flex items-center gap-1 text-center font-mono">
            <span>Engineered with React 19, Three.js, GSAP & Tailwind CSS</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-400 transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);