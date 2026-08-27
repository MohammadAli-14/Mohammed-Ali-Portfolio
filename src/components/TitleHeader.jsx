import React from "react";

const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      {sub && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/70 border border-white/10 text-zinc-300 text-xs sm:text-sm font-mono tracking-wide shadow-sm backdrop-blur-md">
          <p>{sub}</p>
        </div>
      )}
      <div>
        <h2 className="font-bold md:text-5xl text-3xl text-center tracking-tight text-white">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default React.memo(TitleHeader);
