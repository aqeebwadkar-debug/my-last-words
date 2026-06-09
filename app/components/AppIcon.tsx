'use client'

export function AppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lock shackle */}
      <path
        d="M8 12V9A4 4 0 0 1 16 9V12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lock body */}
      <rect
        x="4.5" y="11.5" width="15" height="11" rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Note lines inside the lock body */}
      <line x1="7.5" y1="15" x2="16.5" y2="15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="7.5" y1="17.5" x2="16.5" y2="17.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="7.5" y1="20" x2="13" y2="20" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}
