import React from "react";
import useAntigravity from "../hooks/useAntigravity";

// Color palettes for specific tech brands or custom glows
const THEME_GLOWS = {
  react: "rgba(97, 218, 251, 0.35)",
  python: "rgba(255, 212, 59, 0.3)",
  node: "rgba(104, 160, 99, 0.35)",
  three: "rgba(168, 85, 247, 0.4)",
  git: "rgba(240, 80, 51, 0.35)",
  azure: "rgba(0, 127, 255, 0.35)",
  default: "rgba(99, 102, 241, 0.3)",
};

const getGlowColor = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.includes("react")) return THEME_GLOWS.react;
  if (lower.includes("python")) return THEME_GLOWS.python;
  if (lower.includes("node") || lower.includes("backend")) return THEME_GLOWS.node;
  if (lower.includes("three") || lower.includes("interactive")) return THEME_GLOWS.three;
  if (lower.includes("git") || lower.includes("manager")) return THEME_GLOWS.git;
  if (lower.includes("azure") || lower.includes("cloud")) return THEME_GLOWS.azure;
  return THEME_GLOWS.default;
};

const AntigravityIcon = ({
  src,
  alt = "Tech Icon",
  name = "",
  size = "md", // 'sm', 'md', 'lg', 'xl'
  floatY = 9,
  floatX = 5,
  rotZ = 4,
  duration = 3400,
  delay = 0,
  showOrb = true,
  showRipples = true,
  className = "",
}) => {
  const { containerRef, elementRef } = useAntigravity({
    floatY,
    floatX,
    rotZ,
    rotX: 5,
    rotY: 5,
    duration,
    delay,
    enableTilt: true,
    tiltStrength: 14,
    hoverLift: 12,
  });

  const glowColor = getGlowColor(name || alt);

  // Size variations
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    xl: "w-36 h-36",
  }[size] || "w-24 h-24";

  const imgSizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-18 h-18",
  }[size] || "w-12 h-12";

  return (
    <div
      ref={containerRef}
      className={`antigravity-container relative flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
      }}
    >
      {/* Background Ambient Glow & Gravitational Aura */}
      {showOrb && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-700 ease-out group-hover:scale-125"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, rgba(0,0,0,0) 70%)`,
            filter: "blur(14px)",
            transform: "translate3d(0, 0, -10px)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Floating Magnetic Core Element */}
      <div
        ref={elementRef}
        className={`antigravity-element relative flex items-center justify-center rounded-2xl ${sizeClasses}`}
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 0 20px 0 ${glowColor}`,
        }}
      >
        {/* Antigravity orbital rings */}
        {showRipples && (
          <div
            className="absolute inset-[-4px] rounded-2xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              border: `1px dashed ${glowColor}`,
              transform: "translate3d(0, 0, -2px)",
            }}
          />
        )}

        {/* Specular gloss highlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ transform: "translate3d(0, 0, 2px)" }}
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-md" />
        </div>

        {/* The Icon Graphic */}
        <img
          src={src}
          alt={alt}
          className={`${imgSizeClasses} object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
          style={{
            transform: "translate3d(0, 0, 15px)",
            WebkitTransform: "translate3d(0, 0, 15px)",
            willChange: "transform",
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default React.memo(AntigravityIcon);
