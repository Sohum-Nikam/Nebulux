import React from 'react';

const HeroVideoBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video background with reduced opacity */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 object-cover w-full h-full opacity-150"
      >
        <source src="/Ufiao - Made with Clipchamp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
    </div>
  );
};

export default HeroVideoBg;