'use client'

import { ReactNode } from 'react'

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 393, height: 852 }}>
      {/* Outer shell */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(155deg, #3A3A3C 0%, #1C1C1E 55%, #111113 100%)',
          borderRadius: 52,
          boxShadow:
            '0 0 0 1px #3C3C3E, 0 0 0 2.5px #111113, inset 0 1px 0 rgba(255,255,255,0.06), 0 56px 140px rgba(0,0,0,0.5), 0 28px 56px rgba(0,0,0,0.3)',
        }}
      />

      {/* Left side buttons: silent toggle, volume up, volume down */}
      <div
        className="absolute"
        style={{
          left: -4,
          top: 120,
          width: 4,
          height: 28,
          background: 'linear-gradient(180deg, #4A4A4C 0%, #2E2E30 100%)',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        className="absolute"
        style={{
          left: -4,
          top: 164,
          width: 4,
          height: 58,
          background: 'linear-gradient(180deg, #4A4A4C 0%, #2E2E30 100%)',
          borderRadius: '2px 0 0 2px',
        }}
      />
      <div
        className="absolute"
        style={{
          left: -4,
          top: 234,
          width: 4,
          height: 58,
          background: 'linear-gradient(180deg, #4A4A4C 0%, #2E2E30 100%)',
          borderRadius: '2px 0 0 2px',
        }}
      />

      {/* Right side: power button */}
      <div
        className="absolute"
        style={{
          right: -4,
          top: 180,
          width: 4,
          height: 76,
          background: 'linear-gradient(180deg, #4A4A4C 0%, #2E2E30 100%)',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Screen bezel glow */}
      <div
        className="absolute"
        style={{
          inset: 10,
          borderRadius: 42,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Screen */}
      <div
        className="absolute flex flex-col"
        style={{
          inset: 12,
          borderRadius: 40,
          overflow: 'hidden',
          background: '#FFFFFF',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
        }}
      >
        {/* Status bar */}
        <div className="relative flex-shrink-0 flex items-center justify-between h-14 px-7" style={{ background: '#FFFFFF' }}>
          <span className="text-[13px] font-semibold text-charcoal relative z-10">9:41</span>

          {/* Dynamic Island */}
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 bg-black"
            style={{
              width: 122,
              height: 36,
              borderRadius: 22,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.8)',
            }}
          />

          {/* Status icons */}
          <div className="flex items-center gap-1.5 relative z-10">
            {/* Signal */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="#1F1F1F" fillOpacity="0.25" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#1F1F1F" fillOpacity="0.5" />
              <rect x="9" y="2.5" width="3" height="9.5" rx="1" fill="#1F1F1F" fillOpacity="0.75" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1F1F1F" />
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="10.5" r="1.5" fill="#1F1F1F" />
              <path
                d="M4.5 7.5C5.5 6.5 6.7 6 8 6s2.5.5 3.5 1.5"
                stroke="#1F1F1F"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M1.5 4.5C3 2.9 5.4 2 8 2s5 .9 6.5 2.5"
                stroke="#1F1F1F"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-[2px]">
              <div className="w-6 h-3 rounded-[3px] border border-charcoal/30 flex items-center px-[2px]">
                <div className="w-[17px] h-[7px] bg-charcoal rounded-[1px]" />
              </div>
              <div className="w-[3px] h-[6px] bg-charcoal/22 rounded-r-[2px]" />
            </div>
          </div>
        </div>

        {/* Main content — caller controls inner layout */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>

        {/* Home indicator */}
        <div className="flex-shrink-0 flex justify-center py-2" style={{ background: 'inherit' }}>
          <div className="w-32 h-[5px] bg-charcoal/12 rounded-full" />
        </div>
      </div>
    </div>
  )
}
