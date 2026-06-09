'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AppIcon } from '@/app/components/AppIcon'
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  Mic,
  FileText,
  Check,
  Clock,
  Search,
  Shield,
  Users,
  BookOpen,
  Bell,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const MESSAGES = [
  {
    id: '1',
    title: 'For Emma, on your wedding day',
    recipient: 'Emma Chen',
    type: 'video' as const,
    status: 'finalized' as const,
    deliveryRule: 'On my passing',
    category: 'Love',
    updated: 'Jun 2025',
    excerpt: 'My dearest Emma, if you\'re reading this...',
  },
  {
    id: '2',
    title: 'A letter to my brother James',
    recipient: 'James Wilson',
    type: 'text' as const,
    status: 'finalized' as const,
    deliveryRule: '18 months inactivity',
    category: 'Family',
    updated: 'Apr 2025',
    excerpt: 'James, there are things I never said out loud...',
  },
  {
    id: '3',
    title: 'Life lessons for my children',
    recipient: 'Emma & Liam Chen',
    type: 'audio' as const,
    status: 'draft' as const,
    deliveryRule: 'Specific date: Jan 2026',
    category: 'Wisdom',
    updated: 'Mar 2025',
    excerpt: 'Things I want you to remember when I\'m gone...',
  },
]

const CANVAS_HIGHLIGHTS = [
  { decade: '1980s', emoji: '🌉', title: 'Born in San Francisco', year: '1985', cat: 'Milestone' },
  { decade: '2000s', emoji: '💍', title: 'Married David', year: '2006', cat: 'Milestone' },
  { decade: '2000s', emoji: '👶', title: 'Emma was born', year: '2008', cat: 'Milestone' },
  { decade: '2010s', emoji: '⛩️', title: 'Family trip to Kyoto', year: '2015', cat: 'Memory' },
  { decade: '2020s', emoji: '📝', title: 'Created my vault', year: '2022', cat: 'Milestone' },
]

type VerifyStatus = 'verified' | 'pending' | 'unverified'

const TRUSTED = [
  { name: 'Emma Chen', role: 'Daughter · Trusted Verifier', initials: 'EC', verified: true, verifyStatus: 'verified' as VerifyStatus },
  { name: 'James Wilson', role: 'Brother · Trusted Verifier', initials: 'JW', verified: true, verifyStatus: 'verified' as VerifyStatus },
  { name: 'Dr. Patricia Mills', role: 'Attorney · Pending', initials: 'PM', verified: false, verifyStatus: 'pending' as VerifyStatus },
]

function VerifyChip({ status }: { status: VerifyStatus }) {
  if (status === 'verified')
    return (
      <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-forest bg-sage-light/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
        <Check className="w-2 h-2" strokeWidth={2.5} />
        Verified
      </span>
    )
  if (status === 'pending')
    return (
      <span className="text-[9px] font-semibold text-charcoal-soft bg-lavender/40 px-1.5 py-0.5 rounded-full flex-shrink-0">
        Pending
      </span>
    )
  return (
    <span className="text-[9px] font-semibold text-stone bg-stone-light px-1.5 py-0.5 rounded-full flex-shrink-0">
      Unverified
    </span>
  )
}

const TYPE_ICONS = { text: FileText, audio: Mic, video: Video } as const
const TYPE_COLORS = {
  text: 'bg-lavender/50 text-charcoal-soft',
  audio: 'bg-sage-light/30 text-forest',
  video: 'bg-mist text-charcoal-soft',
} as const

const CAT_COLORS: Record<string, string> = {
  Love: 'bg-blush text-charcoal-soft',
  Family: 'bg-lavender/50 text-charcoal-soft',
  Wisdom: 'bg-sage-light/25 text-forest',
}

const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PersonalVaultPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'text' | 'audio' | 'video'>('all')

  const filtered = MESSAGES.filter((m) => {
    const matchesQuery =
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.recipient.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'all' || m.type === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-stone-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-charcoal-soft hover:text-charcoal transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="w-px h-4 bg-stone-light" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-forest rounded-md flex items-center justify-center">
                <AppIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-charcoal">Personal Vault</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage rounded-full" />
              <span className="text-xs text-charcoal-soft font-medium">End-to-end encrypted</span>
            </div>
            <button className="relative w-8 h-8 bg-mist rounded-xl flex items-center justify-center hover:bg-ivory-dark transition-colors">
              <Bell className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-forest rounded-full" />
            </button>
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">S</span>
            </div>
          </div>
        </div>
      </header>

      {/* Vault summary hero */}
      <motion.section
        variants={fade}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-warm-white border-b border-stone-light"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-forest uppercase tracking-widest mb-1.5">
                Your Legacy
              </p>
              <h1 className="text-2xl font-semibold text-charcoal mb-1">Sarah's Vault</h1>
              <p className="text-sm text-charcoal-soft">Last updated June 2025 · 3 messages secured</p>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              {[
                { icon: Lock, value: '3', label: 'Messages', sub: '2 finalized' },
                { icon: Users, value: '3', label: 'Contacts', sub: '2 verified' },
                { icon: Shield, value: '87%', label: 'Complete', sub: 'Vault health' },
                { icon: BookOpen, value: '12', label: 'Canvas', sub: 'Life entries' },
              ].map(({ icon: Icon, value, label, sub }, i) => (
                <div key={label} className="flex items-center gap-5">
                  {i > 0 && <div className="w-px h-10 bg-stone-light hidden sm:block" />}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-mist rounded-xl flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-forest" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-charcoal leading-tight">{value}</p>
                      <p className="text-xs font-medium text-charcoal-soft">{label}</p>
                      <p className="text-[10px] text-stone">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="flex items-center gap-2 bg-forest text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors shadow-btn">
                <Plus className="w-4 h-4" />
                Add Message
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* Left: Vault messages */}
          <div className="lg:col-span-2 space-y-5">
            {/* Search + filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Search messages…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-warm-white border border-stone-light rounded-xl text-sm text-charcoal placeholder-stone focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/8 transition-all shadow-card"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {(['all', 'text', 'audio', 'video'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl capitalize transition-colors ${
                      filter === f
                        ? 'bg-forest text-white'
                        : 'bg-warm-white border border-stone-light text-charcoal-soft hover:bg-mist'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Message grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((msg, i) => {
                const Icon = TYPE_ICONS[msg.type]
                return (
                  <motion.div
                    key={msg.id}
                    variants={fade}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[msg.category] ?? 'bg-mist text-charcoal-soft'}`}
                      >
                        {msg.category}
                      </span>
                      {msg.status === 'finalized' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest bg-sage-light/40 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                          Finalized
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-charcoal-soft bg-stone-light px-2 py-0.5 rounded-full flex-shrink-0">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-charcoal leading-snug mb-1.5 group-hover:text-forest transition-colors">
                      {msg.title}
                    </h3>
                    <p className="text-xs text-charcoal-soft leading-relaxed mb-3 line-clamp-2">
                      {msg.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[msg.type]}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="capitalize">{msg.type}</span>
                      </span>
                      <span className="text-xs text-stone">→ {msg.recipient}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-light/60">
                      <div className="flex items-center gap-1 text-[11px] text-charcoal-soft">
                        <Clock className="w-3 h-3 text-stone" />
                        {msg.deliveryRule}
                      </div>
                      <span className="text-[10px] text-stone">{msg.updated}</span>
                    </div>
                  </motion.div>
                )
              })}

              {/* Add new */}
              <motion.button
                variants={fade}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4, delay: filtered.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="border-2 border-dashed border-stone-light rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 min-h-[180px] hover:border-sage hover:bg-warm-white transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center group-hover:bg-forest/8 transition-colors">
                  <Plus className="w-4 h-4 text-stone group-hover:text-forest transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-charcoal-soft group-hover:text-charcoal transition-colors">
                    Add a message
                  </p>
                  <p className="text-xs text-stone mt-0.5">Text, audio, or video</p>
                </div>
              </motion.button>
            </div>

            {filtered.length === 0 && query && (
              <div className="py-16 text-center">
                <p className="text-sm text-charcoal-soft">No messages match &quot;{query}&quot;</p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Life Canvas preview */}
            <motion.div
              variants={fade}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden shadow-card"
            >
              <div className="px-5 pt-5 pb-4 border-b border-stone-light">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-forest" strokeWidth={1.75} />
                    <p className="text-sm font-semibold text-charcoal">Life Canvas</p>
                  </div>
                  <Link href="/user" className="text-xs text-forest font-semibold hover:text-forest-light transition-colors">
                    Edit
                    <ChevronRight className="w-3 h-3 inline ml-0.5" />
                  </Link>
                </div>
                <p className="text-xs text-charcoal-soft mt-1">{CANVAS_HIGHLIGHTS.length} milestones recorded</p>
              </div>

              <div className="px-5 py-4 space-y-3">
                {CANVAS_HIGHLIGHTS.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span className="text-base leading-none">{entry.emoji}</span>
                      {i < CANVAS_HIGHLIGHTS.length - 1 && (
                        <div className="w-px h-4 bg-stone-light" />
                      )}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold text-stone">{entry.year}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            entry.cat === 'Milestone'
                              ? 'bg-forest/10 text-forest'
                              : 'bg-blush text-charcoal-soft'
                          }`}
                        >
                          {entry.cat}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-charcoal leading-snug">{entry.title}</p>
                    </div>
                  </div>
                ))}

                <button className="w-full mt-1 border border-dashed border-stone-light rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs text-stone hover:border-forest/30 hover:text-forest transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add memory
                </button>
              </div>
            </motion.div>

            {/* Trusted contacts */}
            <motion.div
              variants={fade}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden shadow-card"
            >
              <div className="px-5 pt-5 pb-4 border-b border-stone-light">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-forest" strokeWidth={1.75} />
                    <p className="text-sm font-semibold text-charcoal">Trusted Contacts</p>
                  </div>
                  <Link href="/user" className="text-xs text-forest font-semibold hover:text-forest-light transition-colors">
                    Manage
                    <ChevronRight className="w-3 h-3 inline ml-0.5" />
                  </Link>
                </div>
                <p className="text-xs text-charcoal-soft mt-1">3 contacts · 2 verified</p>
              </div>

              <div className="divide-y divide-stone-light/60">
                {TRUSTED.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-ivory/40 transition-colors">
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 bg-mist rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-forest">{c.initials}</span>
                      </div>
                      {c.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-forest rounded-full border-2 border-warm-white flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal">{c.name}</p>
                      <p className="text-xs text-charcoal-soft truncate">{c.role}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <VerifyChip status={c.verifyStatus} />
                      <ChevronRight className="w-4 h-4 text-stone" />
                    </div>
                  </div>
                ))}
                <div className="px-5 py-3.5">
                  <button className="w-full flex items-center gap-2 text-xs font-semibold text-forest hover:text-forest-light transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    Invite a contact
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Security note */}
            <motion.div
              variants={fade}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="bg-sage-light/15 border border-sage-light/40 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="text-xs font-semibold text-charcoal mb-1">Vault security</p>
                  <p className="text-xs text-charcoal-soft leading-relaxed">
                    All messages are encrypted with AES-256-GCM. Only your chosen recipients can
                    access them, upon verified delivery conditions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
