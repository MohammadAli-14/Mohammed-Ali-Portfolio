import React, { useRef, useEffect } from "react";
import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => (
  <div className="flex-none flex items-center justify-center px-6 sm:px-8 py-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
    <img
      src={icon.imgPath}
      alt={icon.name || "Company Logo"}
      className="h-8 sm:h-10 md:h-12 w-auto object-contain brightness-90 contrast-125"
      loading="lazy"
    />
  </div>
);

const LogoShowcase = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track.style.animationPlayState = "running";
        } else {
          track.style.animationPlayState = "paused";
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px 100px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        track.style.animationPlayState = "paused";
      } else {
        track.style.animationPlayState = "running";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="md:my-20 my-10 relative overflow-hidden w-full">
      {/* Left/Right Edge Fades */}
      <div className="gradient-edge left-0" />
      <div className="gradient-edge right-0" />

      <div className="marquee relative w-full overflow-hidden py-4">
        <div
          ref={trackRef}
          className="marquee-track flex items-center gap-6 sm:gap-10"
          style={{
            width: "max-content",
            willChange: "transform",
            animation: "marqueeGPU 35s linear infinite",
          }}
        >
          {/* Duplicate list 3 times for seamless infinite hardware-accelerated looping */}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`logo-1-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`logo-2-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`logo-3-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogoShowcase);
