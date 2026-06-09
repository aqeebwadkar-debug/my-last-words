'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Lock, Play, Heart, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react'
import { MobileFrame } from '@/app/components/MobileFrame'

// ─── Recipient experience screens ─────────────────────────────────────────────

const MEMORY_HIGHLIGHTS = [
  { year: '2008', title: 'The year Emma was born', emoji: '👶' },
  { year: '2015', title: 'Family trip to Kyoto', emoji: '⛩️' },
  { year: '2024', title: "Emma's first independent journey", emoji: '✈️' },
]

function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-ivory overflow-y-auto">
      {/* Header */}
      <div className="bg-warm-white border-b border-stone-light px-5 pt-4 pb-6 text-center">
        <div className="w-14 h-14 bg-forest rounded-full flex items-center justify-center mx-auto mb-3" style={{ boxShadow: '0 2px 8px rgba(91,75,115,0.22), 0 8px 20px rgba(91,75,115,0.12)' }}>
          <span className="text-white text-xl font-semibold">S</span>
        </div>
        <p className="text-xs font-medium text-charcoal-soft mb-1">A message from</p>
        <h2 className="text-lg font-semibold text-charcoal">Sarah Chen</h2>
        <p className="text-xs text-stone mt-0.5">Securely delivered June 8, 2025</p>
        <p className="text-[10px] text-stone/55 mt-1.5 tracking-wide">Shared privately with Emma Chen</p>
      </div>

      <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
        {/* Unlock card */}
        <div
          className="bg-warm-white border border-stone-light rounded-2xl p-5 text-center"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="w-12 h-12 bg-lavender-light border border-lavender-deep/35 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-forest" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-semibold text-charcoal mb-2">
            Sarah left you a personal message
          </p>
          <p className="text-xs text-charcoal-soft leading-relaxed mb-5">
            This message was composed with care and held securely until this moment. It is
            meant only for you.
          </p>
          <button
            onClick={onOpen}
            className="w-full bg-forest text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors"
            style={{ boxShadow: '0 2px 6px rgba(91,75,115,0.22)' }}
          >
            Open My Message
          </button>
        </div>

        {/* Verification note */}
        <div className="bg-sage-light/20 border border-sage-light/40 rounded-xl p-3.5 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs text-charcoal-soft leading-relaxed">
            Delivery was initiated on June 8, 2025 and verified by Dr. Patricia Mills. This
            message has been authenticated and has not been altered.
          </p>
        </div>

        {/* Delivery context */}
        <p className="text-[10px] text-stone/55 text-center -mt-1">
          Delivered after trusted verification.
        </p>

        {/* Memory preview */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-forest" strokeWidth={1.75} />
            <p className="text-sm font-semibold text-charcoal">Memory Highlights</p>
          </div>
          <div className="space-y-2">
            {MEMORY_HIGHLIGHTS.map((m) => (
              <div
                key={m.title}
                className="bg-lavender-light/70 border border-lavender-deep/30 rounded-xl p-3 flex items-center gap-3"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(140,120,176,0.06)' }}
              >
                <span className="text-base leading-none flex-shrink-0">{m.emoji}</span>
                <div>
                  <p className="text-[10px] text-stone font-medium">{m.year}</p>
                  <p className="text-sm font-medium text-charcoal">{m.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-charcoal-soft text-center mt-3">
            Open your message to explore Sarah's full life canvas.
          </p>
        </div>
      </div>
    </div>
  )
}

function MessageScreen({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex-1 flex flex-col bg-ivory overflow-y-auto">
      {/* Header */}
      <div className="bg-warm-white border-b border-stone-light px-5 pt-3 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 bg-mist rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-charcoal-soft" />
          </button>
          <div>
            <p className="text-sm font-semibold text-charcoal">For Emma, on your wedding day</p>
            <p className="text-xs text-charcoal-soft">From Sarah Chen · Video message</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 pb-6 space-y-4">
        {/* Video player */}
        <div
          className="rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative cursor-pointer"
          style={{ background: 'linear-gradient(160deg, #2C2C2E 0%, #1A1A1C 100%)' }}
          onClick={() => setPlaying(!playing)}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,28,0.6)' }} />
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/12 rounded-full flex items-center justify-center border border-white/15 backdrop-blur-sm">
              <Play className="w-6 h-6 text-white ml-0.5" fill="white" strokeWidth={0} />
            </div>
            <p className="text-white/55 text-xs">Tap to play · 4:32</p>
          </div>
        </div>

        {playing && (
          <div className="bg-warm-white border border-stone-light rounded-xl px-4 py-3" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-stone-light rounded-full overflow-hidden">
                <div className="h-full bg-forest rounded-full" style={{ width: '18%' }} />
              </div>
              <span className="text-xs text-charcoal-soft flex-shrink-0">0:48 / 4:32</span>
            </div>
          </div>
        )}

        {/* Auth meta */}
        <div className="flex items-center justify-center gap-2.5 py-0.5">
          <span className="flex items-center gap-1 text-[9px] text-stone/55 font-medium tracking-wide">
            <ShieldCheck className="w-2.5 h-2.5 flex-shrink-0" strokeWidth={1.75} />
            Authenticated delivery
          </span>
          <span className="text-stone/30 text-[9px] leading-none select-none">·</span>
          <span className="text-[9px] text-stone/55 font-medium tracking-wide">End-to-end secured</span>
          <span className="text-stone/30 text-[9px] leading-none select-none">·</span>
          <span className="text-[9px] text-stone/55 font-medium tracking-wide">Verified release</span>
        </div>

        {/* Written portion */}
        <div
          className="bg-warm-white border border-stone-light rounded-2xl p-5"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-forest rounded-full" />
            <p className="text-[11px] font-semibold text-forest uppercase tracking-wider">
              Personal Note
            </p>
          </div>
          <p className="text-sm text-charcoal leading-relaxed">My dearest Emma,</p>
          <p className="text-sm text-charcoal leading-relaxed mt-3">
            If you're watching this, then I wasn't there to hold your hand today. I want you to
            know — I have imagined this day for you since the morning you were born.
          </p>
          <p className="text-sm text-charcoal leading-relaxed mt-3">
            You were always braver than me. Kinder. More patient. You saw the world with
            something I spent years trying to learn. Marry someone who sees that in you.
          </p>
          <p className="text-sm text-charcoal leading-relaxed mt-3">
            I love you beyond words. Be happy. That was always the only thing I wanted.
          </p>
          <p className="text-sm text-charcoal leading-relaxed mt-5 font-medium">
            With all the love a mother can give,
          </p>
          <p className="text-sm text-charcoal font-semibold">Mom</p>
        </div>

        {/* Memory canvas excerpt */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-forest" strokeWidth={1.75} />
            <p className="text-sm font-semibold text-charcoal">From Sarah's Life Canvas</p>
          </div>
          <div className="space-y-2">
            {[
              { year: '2008', emoji: '👶', text: 'Emma was born — the best day of my life.' },
              { year: '2015', emoji: '⛩️', text: 'Family trip to Kyoto. Emma made paper cranes every morning.' },
              { year: '2021', emoji: '🎓', text: 'Emma graduated. I cried the whole ceremony.' },
            ].map((m) => (
              <div
                key={m.year}
                className="bg-lavender-light/70 border border-lavender-deep/30 rounded-xl p-3 flex items-start gap-3"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(140,120,176,0.06)' }}
              >
                <span className="text-base flex-shrink-0 leading-none mt-0.5">{m.emoji}</span>
                <div>
                  <p className="text-[10px] text-stone font-medium mb-0.5">{m.year}</p>
                  <p className="text-xs text-charcoal leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-xs font-semibold text-forest border border-forest/20 py-2.5 rounded-xl hover:bg-forest/5 transition-colors flex items-center justify-center gap-1">
            View Sarah's full canvas
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Closing */}
        <div className="border-t border-stone-light pt-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" strokeWidth={1.75} />
            <p className="text-[10px] text-stone font-medium">End-to-end encrypted · Authenticated delivery</p>
          </div>
          <p className="text-xs text-charcoal-soft leading-relaxed">
            This message was composed and secured by Sarah Chen using My Last Words.
            Delivered and verified on June 8, 2025.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RecipientViewPage() {
  const [opened, setOpened] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const compute = () => {
      const availH = window.innerHeight - 96
      const availW = window.innerWidth - 32
      setScale(Math.min(1, availH / 852, availW / 400))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return (
    <div className="h-dvh bg-ivory flex flex-col items-center overflow-hidden px-4 pt-6 pb-2">
      {/* Page nav */}
      <div className="w-full max-w-sm mb-3 flex-shrink-0 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-1.5 text-charcoal-soft hover:text-charcoal transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </a>
        <div className="text-center">
          <p className="text-xs font-semibold text-charcoal-soft">Recipient Experience</p>
          <p className="text-[10px] text-stone">Interactive Preview</p>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
        <div
          style={{
            width: 393 * scale,
            height: 852 * scale,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: 393,
              height: 852,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <MobileFrame>
              <AnimatePresence mode="wait">
                {!opened ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    <WelcomeScreen onOpen={() => setOpened(true)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    <MessageScreen onBack={() => setOpened(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
