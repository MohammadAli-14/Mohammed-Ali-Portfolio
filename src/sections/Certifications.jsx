import { useState, useCallback, useRef, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import CertificateModal from "../components/CertificateModal";
import LoaderModal from "../components/LoaderModal";
import { certifications } from "../constants/index.js";

const OrgLogo = ({ organization, title }) => {
  const org = (organization || "").toLowerCase();
  const certTitle = (title || "").toLowerCase();

  // Microsoft Official 4-Color Grid Logo
  if (org.includes("microsoft") || certTitle.includes("azure") || certTitle.includes("microsoft")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Logo">
        <rect x="1" y="1" width="10" height="10" fill="#f25022" rx="1.5" />
        <rect x="12" y="1" width="10" height="10" fill="#7fba00" rx="1.5" />
        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" rx="1.5" />
        <rect x="12" y="12" width="10" height="10" fill="#ffb900" rx="1.5" />
      </svg>
    );
  }

  // DeepLearning.AI Official Red Geometric Mark
  if (org.includes("deeplearning") || certTitle.includes("ai for everyone") || certTitle.includes("generative ai for everyone")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DeepLearning.AI Logo">
        <path d="M12 2L3 7.5L12 13L21 7.5L12 2Z" fill="#FF3E3E" opacity="0.9" />
        <path d="M3 12L12 17.5L21 12" stroke="#FF3E3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16.5L12 22L21 16.5" stroke="#FF3E3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // IBM Logo
  if (org.includes("ibm")) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="IBM Logo">
        <rect x="2" y="5" width="20" height="2" fill="#052FAD" rx="0.5" />
        <rect x="2" y="9" width="20" height="2" fill="#052FAD" rx="0.5" />
        <rect x="2" y="13" width="20" height="2" fill="#052FAD" rx="0.5" />
        <rect x="2" y="17" width="20" height="2" fill="#052FAD" rx="0.5" />
      </svg>
    );
  }

  // UETIANS & PakAngels Generative AI Developer Achievement Emblem
  if (org.includes("uetians") || org.includes("pakangels") || certTitle.includes("generative ai application developer")) {
    return (
      <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Generative AI Achievement Emblem">
        <path
          d="M12 2L14.4 7.2L20 8L16 12.2L17 18L12 15.2L7 18L8 12.2L4 8L9.6 7.2L12 2Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  // Default Achievement Emblem
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-label="Achievement Emblem">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState({});
  const loaderTimeoutRef = useRef(null);
  const imageCache = useRef({});

  const toggleSkills = useCallback((index) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  // Optimized open modal function - no heavy animations
  const openModal = useCallback((cert) => {
    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
    }

    // Show loader
    setShowLoader(true);
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Check if image is already loaded or cached
      const img = new Image();
      img.src = cert.img;
      
      // Check if image is already in cache
      if (imageCache.current[cert.img]) {
        // Image already cached, minimal loader time
        loaderTimeoutRef.current = setTimeout(() => {
          setSelectedCert(cert);
          setShowLoader(false);
        }, 300);
      } else {
        // Load image
        img.onload = () => {
          imageCache.current[cert.img] = true;
          loaderTimeoutRef.current = setTimeout(() => {
            setSelectedCert(cert);
            setShowLoader(false);
          }, 300);
        };
        
        img.onerror = () => {
          // If image fails to load, still show modal after short delay
          loaderTimeoutRef.current = setTimeout(() => {
            setSelectedCert(cert);
            setShowLoader(false);
          }, 300);
        };
      }
    });
  }, []);

  const closeModal = useCallback(() => {
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
      loaderTimeoutRef.current = null;
    }
    setSelectedCert(null);
    setShowLoader(false);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  // Stats calculation
  const stats = {
    total: certifications.length,
    platforms: new Set(certifications.map(c => c.organization)).size,
    verified: certifications.filter(c => c.verified).length
  };

  return (
    <section id="certifications" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-4 max-w-7xl mx-auto">
        <TitleHeader
          title="Certifications"
          sub="Industry-recognized credentials in AI & Technology"
        />

        {/* Certifications Grid - Responsive for all devices */}
        <div className="mt-6 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[#09090b]/80 border border-white/10 rounded-2xl p-5 md:p-6 hover:border-white/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Official Organization Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-sm">
                      <OrgLogo organization={cert.organization} title={cert.title} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    {/* Title */}
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white mb-1.5 line-clamp-2 leading-tight">
                      {cert.title}
                    </h3>
                    
                    {/* Organization and Date */}
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 md:gap-2 mb-3">
                      <span className="text-zinc-300 text-xs md:text-sm font-medium">
                        {cert.organization}
                      </span>
                      <span className="hidden xs:inline text-zinc-600">•</span>
                      <span className="text-zinc-500 text-xs md:text-sm">
                        {cert.date}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                      {(expandedSkills[index] ? cert.skills : cert.skills.slice(0, 3)).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-full font-mono font-medium transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <button
                          type="button"
                          onClick={() => toggleSkills(index)}
                          className="px-2.5 py-1 bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white text-xs rounded-full font-mono font-medium transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                          aria-label={expandedSkills[index] ? "Show fewer skills" : `Show ${cert.skills.length - 3} more skills`}
                          title={expandedSkills[index] ? "Collapse skills" : "Click to view all skills"}
                        >
                          {expandedSkills[index] ? "− less" : `+${cert.skills.length - 3}`}
                        </button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2.5 md:gap-3 pt-3.5 border-t border-white/10">
                      <button
                        onClick={() => openModal(cert)}
                        className="w-full xs:flex-1 py-2.5 md:py-3 bg-white hover:bg-zinc-200 text-black text-center rounded-xl font-semibold shadow-sm active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
                        aria-label={`View ${cert.title} certificate`}
                      >
                        <span>👁️</span>
                        <span>View Certificate</span>
                      </button>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full xs:flex-1 py-2.5 md:py-3 bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-center rounded-xl font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                        aria-label={`Verify ${cert.title} online`}
                      >
                        <span>🔗</span>
                        <span>Verify Online</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          <div className="bg-[#09090b]/80 border border-white/10 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.total}
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm font-medium">Certificates</div>
          </div>
          <div className="bg-[#09090b]/80 border border-white/10 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.platforms}
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm font-medium">Platforms</div>
          </div>
          <div className="bg-[#09090b]/80 border border-white/10 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              100%
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm font-medium">Verified</div>
          </div>
        </div>

        {/* Tips for mobile users */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs md:text-sm">
            💡 Tap buttons to view certificates or verify them online
          </p>
        </div>
      </div>

      {/* Loader Modal */}
      {showLoader && <LoaderModal />}

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal 
          certificate={selectedCert} 
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Certifications;