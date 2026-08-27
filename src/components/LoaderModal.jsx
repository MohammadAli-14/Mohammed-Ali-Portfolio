const LoaderModal = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
      style={{ 
        animation: 'fadeIn 0.1s ease-out',
      }}
    >
      <div className="relative bg-zinc-950/90 border border-white/15 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 backdrop-blur-md">
        {/* Simple spinner */}
        <div className="flex justify-center mb-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-3 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-3 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-3">
          <p className="text-white text-base font-semibold mb-2">
            Loading Certificate
          </p>
          
          {/* Progress indicator */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-progress"></div>
          </div>
          
          {/* Hint text */}
          <p className="text-zinc-500 text-xs mt-2 font-mono">
            Preparing certificate...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderModal;