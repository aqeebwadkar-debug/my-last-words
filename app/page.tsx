'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { AppIcon } from '@/app/components/AppIcon'

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-stone-light">
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-forest rounded-lg flex items-center justify-center flex-shrink-0">
              <AppIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-charcoal tracking-tight">My Last Words</span>
          </div>

          <span className="hidden sm:block text-xs text-stone font-medium tracking-widest uppercase">
            Secure · Private · Trusted
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-center px-6 pt-20 sm:pt-28 pb-28 sm:pb-36 max-w-3xl mx-auto">
        {/* Ambient radial bloom */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 720,
            height: 600,
            background: 'radial-gradient(ellipse at center, rgba(91,75,115,0.055) 0%, transparent 68%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="relative z-10">
          <motion.div
            variants={fade}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-forest/8 border border-forest/15 text-forest text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 bg-forest rounded-full" />
              Digital Legacy Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-charcoal leading-[1.08] tracking-tight mb-6">
              Your final gift
              <br />
              <span className="text-forest">deserves to be heard.</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-soft leading-relaxed max-w-xl mx-auto mb-10">
              A private archive for the messages, memories, and wisdom you want to leave behind
              — delivered securely to the people who matter most.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link
                href="/login/user"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors duration-200"
                style={{ boxShadow: '0 1px 3px rgba(91,75,115,0.18), 0 4px 12px rgba(91,75,115,0.14)' }}
              >
                Continue as User
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login/admin"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-warm-white text-charcoal border border-stone-light px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-mist transition-colors duration-200"
                style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.03), 0 2px 10px rgba(15,23,42,0.05)' }}
              >
                Open Admin Panel
              </Link>
              <Link
                href="/login/recipient"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-charcoal-soft text-sm font-medium hover:text-charcoal transition-colors duration-200 py-3.5 px-4"
              >
                Recipient View
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-light py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-forest/10 rounded-md flex items-center justify-center">
              <AppIcon className="w-3 h-3 text-forest" />
            </div>
            <span className="text-xs font-semibold text-charcoal-soft">My Last Words</span>
          </div>
          <p className="text-xs text-stone">© 2025 My Last Words · All rights reserved</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map((link) => (
              <span
                key={link}
                className="text-xs text-stone hover:text-charcoal-soft cursor-pointer transition-colors duration-200"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
