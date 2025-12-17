import { useState, useCallback, useRef, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import CertificateModal from "../components/CertificateModal";
import LoaderModal from "../components/LoaderModal";
import { certifications } from "../constants/index.js";

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const loaderTimeoutRef = useRef(null);
  const imageCache = useRef({});

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
          title="🏆 Certifications"
          sub="Industry-recognized credentials in AI & Technology"
        />

        {/* Certifications Grid - Responsive for all devices */}
        <div className="mt-6 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-black-100 border border-black-50 rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6"
                // Removed hover effects for better performance
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                  {/* Icon - Simplified */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-white text-lg">📜</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    {/* Title - Fixed for small screens */}
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white mb-1 md:mb-2 line-clamp-2 leading-tight">
                      {cert.title}
                    </h3>
                    
                    {/* Organization and Date - Stack on mobile */}
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 md:gap-2 mb-2 md:mb-3">
                      <span className="text-white/70 text-xs md:text-sm">
                        {cert.organization}
                      </span>
                      <span className="hidden xs:inline text-white/40">•</span>
                      <span className="text-white/70 text-xs md:text-sm">
                        {cert.date}
                      </span>
                    </div>

                    {/* Skills - Improved for mobile */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-black-50 text-white/80 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-black-50 text-white/80 text-xs rounded-full">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons - Stack on mobile */}
                    <div className="flex flex-col xs:flex-row gap-2 md:gap-3 pt-3 md:pt-4 border-t border-black-50">
                      <button
                        onClick={() => openModal(cert)}
                        className="w-full xs:flex-1 py-2 md:py-3 bg-white text-black text-center rounded-lg font-medium hover:bg-white/90 active:bg-white/80 transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm md:text-base"
                        aria-label={`View ${cert.title} certificate`}
                      >
                        <span>👁️</span>
                        View Certificate
                      </button>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full xs:flex-1 py-2 md:py-3 bg-black-50 text-white text-center rounded-lg font-medium hover:bg-black-200 active:bg-black-300 transition-colors duration-150 flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                        aria-label={`Verify ${cert.title} online`}
                      >
                        <span>🔗</span>
                        Verify Online
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Stack on mobile */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          <div className="bg-black/40 border border-white/10 rounded-lg md:rounded-xl p-4 md:p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.total}
            </div>
            <div className="text-white/60 text-sm md:text-base">Certificates</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg md:rounded-xl p-4 md:p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.platforms}
            </div>
            <div className="text-white/60 text-sm md:text-base">Platforms</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg md:rounded-xl p-4 md:p-5 text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              100%
            </div>
            <div className="text-white/60 text-sm md:text-base">Verified</div>
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