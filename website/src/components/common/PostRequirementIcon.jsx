import React from 'react';

export default function PostRequirementIcon({ className = "w-5 h-5", color = "#C98A4B" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Outer Clipboard Frame */}
      <path 
        d="M16 4H18C19.1046 4 20 4.89543 20 6V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6C4 4.89543 4.89543 4 6 4H8" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Clip Header with Bronze Fill */}
      <rect 
        x="8" 
        y="2" 
        width="8" 
        height="4" 
        rx="1.2" 
        fill={color} 
        stroke={color} 
        strokeWidth="1.5" 
      />
      {/* Spec Checklist Line */}
      <path 
        d="M8 9H16" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Architectural Villa Profile */}
      <path 
        d="M8.5 18V13.8L12 11.2L15.5 13.8V18H8.5Z" 
        fill={color} 
        fillOpacity="0.25" 
        stroke={color} 
        strokeWidth="1.6" 
        strokeLinejoin="round" 
      />
      {/* Door detail */}
      <rect 
        x="10.8" 
        y="14.5" 
        width="2.4" 
        height="3.5" 
        fill={color} 
      />
    </svg>
  );
}
