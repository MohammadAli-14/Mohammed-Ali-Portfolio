import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll for background and active section
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Update active section
      const sections = navLinks.map(link => link.link.replace('#', ''));
      let current = '';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = (link) => {
    setIsMenuOpen(false);
    // Smooth scroll to section
    const target = document.getElementById(link.replace('#', ''));
    if (target) {
      const offset = 80; // Account for navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`navbar fixed w-full left-0 top-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen ? "bg-black/90 backdrop-blur-sm border-b border-gray-800/30" : "bg-transparent"
        }`}
      >
        <div className="inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left side */}
            <a 
              href="#hero" 
              className="logo text-white text-lg sm:text-xl font-bold tracking-tight flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
            >
              <span className="text-gray-200 hover:text-white transition-colors duration-300">
                Mohammed Ali
              </span>
            </a>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <ul className="flex space-x-6 xl:space-x-8">
                {navLinks.map(({ link, name }) => {
                  const sectionId = link.replace('#', '');
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <li key={name} className="relative">
                      <a
                        href={link}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link);
                        }}
                        className={`px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                          isActive 
                            ? 'text-gray-100' 
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {name}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-300/80 rounded-full"></span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact Button - Right side (Desktop) */}
            <div className="hidden lg:block flex-shrink-0">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="contact-btn group px-6 py-2.5 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-300"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">
                  Contact me
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 w-full h-0.5 bg-gray-300 transform transition-all duration-300 ${
                  isMenuOpen ? 'top-2 rotate-45' : 'top-0'
                }`} />
                <span className={`absolute left-0 top-2 w-full h-0.5 bg-gray-300 transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute left-0 w-full h-0.5 bg-gray-300 transform transition-all duration-300 ${
                  isMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-sm transition-all duration-300 ${
            isMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`absolute top-20 right-0 left-0 bg-black/90 border-t border-gray-800/30 transition-all duration-300 ${
              isMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : '-translate-y-4 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map(({ link, name }) => {
                const sectionId = link.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={name}
                    href={link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gray-800/40 text-gray-100'
                        : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200'
                    }`}
                  >
                    {name}
                    {isActive && (
                      <span className="inline-block ml-2 w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
                    )}
                  </a>
                );
              })}
              
              {/* Mobile Contact Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="block mt-6 px-4 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-300 text-center"
              >
                Contact me
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;