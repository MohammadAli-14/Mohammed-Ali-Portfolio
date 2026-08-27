import React, { useState, useEffect } from "react";

const uniqueWords = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const WordRotator = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % uniqueWords.length);
        setIsTransitioning(false);
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const current = uniqueWords[index];

  return (
    <span className="inline-flex items-center align-middle mx-1.5 sm:mx-2.5 relative select-none">
      <span
        className={`inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-zinc-900/70 border border-white/15 backdrop-blur-md shadow-lg shadow-black/50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isTransitioning
            ? "translate-y-2 opacity-0 scale-95"
            : "translate-y-0 opacity-100 scale-100"
        }`}
      >
        <img
          src={current.imgPath}
          alt={current.text}
          className="size-6 sm:size-8 md:size-9 object-contain rounded-full bg-white/5 p-1 border border-white/10"
        />
        <span className="text-white font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight">
          {current.text}
        </span>
      </span>
    </span>
  );
};

export default React.memo(WordRotator);
