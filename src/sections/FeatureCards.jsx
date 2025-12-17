import TitleHeader from "../components/TitleHeader";

const FeatureCards = () => {
  const abilities = [
    {
      imgPath: "/images/seo.png",
      title: "Quality Focus",
      desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
      imgPath: "/images/chat.png",
      title: "Reliable Communication",
      desc: "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
      imgPath: "/images/time.png",
      title: "On-Time Delivery",
      desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
  ];

  return (
    <section className="flex-center section-padding">
      <div className="w-full h-full px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <TitleHeader
          title="🌟 What I Offer"
          sub="My approach to delivering exceptional results"
        />
        
        <div className="mt-8 md:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {abilities.map(({ imgPath, title, desc }, index) => (
              <div
                key={index}
                className="card-border rounded-xl p-5 sm:p-6 md:p-8 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="size-12 sm:size-14 md:size-16 flex items-center justify-center rounded-full bg-black-50 mb-4">
                  <img 
                    src={imgPath} 
                    alt={title} 
                    className="size-6 sm:size-7 md:size-8"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                  {title}
                </h3>
                <p className="text-white-50 text-sm sm:text-base md:text-lg">
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

export default FeatureCards;