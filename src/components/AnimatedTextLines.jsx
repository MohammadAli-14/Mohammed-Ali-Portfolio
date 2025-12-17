import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lines = text.split('\n');

  useGSAP(() => {
    gsap.fromTo(containerRef.current.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`space-y-4 ${className}`}>
      {lines.map((line, index) => (
        <p key={index} className="leading-relaxed">
          {line}
        </p>
      ))}
    </div>
  );
};