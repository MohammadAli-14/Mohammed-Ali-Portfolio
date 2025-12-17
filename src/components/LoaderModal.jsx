const LoaderModal = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
      style={{ 
        animation: 'fadeIn 0.1s ease-out',
      }}
    >
      <div className="relative bg-black/80 border border-white/20 rounded-xl p-4 sm:p-6 shadow-2xl max-w-sm w-full mx-4">
        {/* Simple spinner without heavy animations */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-3">
          <p className="text-white text-lg font-bold mb-2">
            Loading Certificate
          </p>
          
          {/* Simple progress indicator */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"></div>
          </div>
          
          {/* Simple hint text */}
          <p className="text-white/60 text-xs sm:text-sm mt-2">
            Preparing certificate...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderModal;