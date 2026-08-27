import React from "react";
import TitleHeader from "../components/TitleHeader";
import AntigravityIcon from "../components/AntigravityIcon";

const FeatureCards = () => {
  const abilities = [
    {
      imgPath: "/images/seo.png",
      title: "Quality Focus",
      desc: "Delivering high-quality results while maintaining attention to every detail.",
      floatConfig: { floatY: 7, floatX: 3, rotZ: 3, duration: 3200, delay: 0 },
    },
    {
      imgPath: "/images/chat.png",
      title: "Reliable Communication",
      desc: "Keeping you updated at every step to ensure transparency and clarity.",
      floatConfig: { floatY: 9, floatX: -4, rotZ: -3.5, duration: 3600, delay: 300 },
    },
    {
      imgPath: "/images/time.png",
      title: "On-Time Delivery",
      desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
      floatConfig: { floatY: 8, floatX: 4, rotZ: 3, duration: 3000, delay: 600 },
    },
  ];

  return (
    <section className="flex-center section-padding relative bg-black">
      <div className="w-full h-full px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <TitleHeader
          title="🌟 What I Offer"
          sub="My approach to delivering exceptional results"
        />

        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {abilities.map(({ imgPath, title, desc, floatConfig }, index) => (
              <div
                key={index}
                className="card-border group rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
                style={{
                  background: "linear-gradient(180deg, rgba(18, 18, 22, 0.7) 0%, rgba(9, 9, 11, 0.95) 100%)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  transform: "translate3d(0, 0, 0)",
                  willChange: "transform",
                }}
              >
                {/* Antigravity Floating Icon */}
                <div className="mb-6 flex items-center justify-center">
                  <AntigravityIcon
                    src={imgPath}
                    alt={title}
                    name={title}
                    size="md"
                    floatY={floatConfig.floatY}
                    floatX={floatConfig.floatX}
                    rotZ={floatConfig.rotZ}
                    duration={floatConfig.duration}
                    delay={floatConfig.delay}
                    showRipples={false}
                  />
                </div>

                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 tracking-tight group-hover:text-zinc-200 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeatureCards);