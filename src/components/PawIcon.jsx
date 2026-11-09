import React from 'react'

export default function PawIcon({ className = "w-5 h-5", fill = "currentColor" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill={fill}
      aria-hidden="true"
    >
      <ellipse cx="6" cy="9.5" rx="2.3" ry="3" />
      <ellipse cx="10" cy="5.5" rx="2.3" ry="3" />
      <ellipse cx="14.5" cy="5.5" rx="2.3" ry="3" />
      <ellipse cx="18.5" cy="9.5" rx="2.3" ry="3" />
      <path d="M12.2 11c-3.2 0-6.2 4.3-6.2 6.8 0 2 1.5 2.7 3 2.7 1.3 0 2-.6 3.2-.6s1.9.6 3.2.6c1.5 0 3-.7 3-2.7 0-2.5-3-6.8-6.2-6.8z" />
    </svg>
  )
}

