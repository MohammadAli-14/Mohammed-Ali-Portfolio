import { useEffect, useRef } from "react";

const CertificateModal = ({ certificate, onClose }) => {
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/95"
      onClick={handleBackdropClick}
      style={{ 
        animation: 'fadeIn 0.1s ease-out',
      }}
    >
      <div
        className="relative w-full max-w-4xl bg-black border border-white/20 rounded-lg md:rounded-xl overflow-hidden flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.15s ease-out' }}
      >
        {/* Header - Fixed height */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 md:p-4 border-b border-white/20 bg-black">
          <div className="flex-1 min-w-0 pr-3">
            <h1 className="text-sm md:text-base font-bold text-white truncate">
              {certificate.title}
            </h1>
            <p className="text-white/70 text-xs truncate mt-0.5">
              {certificate.organization} • {certificate.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white text-lg font-bold cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Image Container - Optimized for mobile */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-2 overflow-auto">
          <img
            ref={imageRef}
            src={certificate.img}
            alt={certificate.title}
            className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain"
            loading="eager"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231c1c21'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3EImage not available%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Footer - Stack buttons on mobile */}
        <div className="flex-shrink-0 p-3 md:p-4 border-t border-white/20 bg-black">
          <div className="flex flex-col xs:flex-row gap-2">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:flex-1 h-10 md:h-12 bg-white text-black rounded-lg font-medium hover:bg-white/90 flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              🌐 Verify Online
            </a>
            <button
              onClick={onClose}
              className="w-full xs:flex-1 h-10 md:h-12 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 cursor-pointer text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;