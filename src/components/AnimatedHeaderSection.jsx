import { useRef } from 'react'; // Add this import
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({ subTitle, title, text, textColor, withScrollTrigger = true }) => {
  const headerRef = useRef(null); // Now useRef is defined

  useGSAP(() => {
    if (withScrollTrigger) {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      });
    } else {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3
      });
    }
  }, []);

  return (
    <div ref={headerRef} className={`flex flex-col items-center justify-center gap-6 py-16 px-4 text-center ${textColor}`}>
      <p className="text-lg font-medium opacity-80">{subTitle}</p>
      <h1 className="text-5xl md:text-7xl font-bold">{title}</h1>
      <p className="text-xl md:text-2xl max-w-2xl mt-4 whitespace-pre-line">{text}</p>
    </div>
  );
};

export default AnimatedHeaderSection;