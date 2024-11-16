import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FuturisticInput = ({ 
  onSubmit, 
  placeholder = "Enter your name",
  glowColor = "#0EA5E9",
  className = "" 
}: {
  onSubmit: (name: string) => void;
  placeholder?: string;
  glowColor?: string;
  className?: string;
}) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit?.(name);
      console.log(name);
    }
  };

  return (
    <div className={`relative max-w-md ${className} w-80 tablet:w-auto`}>
      {/* Background with glow effect */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transform -skew-x-2 rounded-lg" />
      
      {/* Border frame */}
      <div className="relative border border-slate-700 bg-slate-900/50 rounded-lg p-1">
        {/* Diagonal corner accents */}
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 ${isFocused ? 'border-cyan-400' : 'border-cyan-500'}`} />
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300 ${isFocused ? 'border-cyan-400' : 'border-cyan-500'}`} />
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300 ${isFocused ? 'border-cyan-400' : 'border-cyan-500'}`} />
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${isFocused ? 'border-cyan-400' : 'border-cyan-500'}`} />
        
        <div className="p-4">
          {/* Title bar */}
          <div className="flex items-center mb-3 border-b border-slate-700 pb-2">
            <div className={`w-2 h-2 rounded-full mr-2 ${isFocused ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-500'}`} />
            <h3 className="text-cyan-500 font-mono text-sm uppercase tracking-wider">
              User Registration
            </h3>
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full bg-transparent border-2 border-slate-700 rounded px-4 py-2 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              style={{
                textShadow: isFocused ? `0 0 10px ${glowColor}` : 'none',
              }}
            />
            <button 
              type="submit"
              className="mt-4 w-full bg-cyan-500/20 border border-cyan-500 text-cyan-500 py-2 rounded font-mono
                       hover:bg-cyan-500/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              CONFIRM
            </button>
          </form>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-2 left-4 w-1/4 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
      <div className="absolute -top-2 right-4 w-1/4 h-1 bg-gradient-to-l from-cyan-500 to-transparent" />
    </div>
  );
};

// Add PropTypes for runtime type checking
FuturisticInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  glowColor: PropTypes.string,
  className: PropTypes.string,
};


export default FuturisticInput;