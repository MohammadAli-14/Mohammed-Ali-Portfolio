const SimpleLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-white/10 rounded-full"></div>
          
          {/* Spinning ring */}
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"></div>
        </div>
        
        <p className="mt-6 text-white text-lg font-medium animate-pulse">
          {message}
        </p>
        
        <p className="mt-2 text-white/60 text-sm">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default SimpleLoader;