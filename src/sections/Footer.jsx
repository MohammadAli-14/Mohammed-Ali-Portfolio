import { useState, useEffect } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show footer when 95% scrolled
      if (scrollTop + windowHeight >= documentHeight * 0.95) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="bg-black-100 border-t border-gray-800 py-8 px-5 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* Left: Contact Information */}
          <div className="flex-1">
            <div className="space-y-4">
              {/* Email */}
              <div>
                <p className="text-sm text-gray-400 mb-1">E-mail</p>
                <a 
                  href="mailto:mohammedali5072008@gmail.com"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  mohammedali5072008@gmail.com
                </a>
              </div>
              
              {/* Phone */}
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <a 
                  href="tel:+92833383838"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  +92 833 383838
                </a>
              </div>
            </div>
          </div>
          
          {/* Horizontal Divider for Mobile */}
          <div className="w-full h-px bg-gray-800 lg:hidden"></div>
          
          {/* Right: Social Links and Copyright */}
          <div className="flex-1 flex flex-col items-start lg:items-end gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/MohammadAli-14" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/mohammed-ali-3791062b2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Mohammed Ali. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;