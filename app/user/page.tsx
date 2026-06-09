'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  Home,
  Archive,
  BookOpen,
  Users,
  MoreHorizontal,
  Lock,
  ChevronRight,
  ChevronLeft,
  Plus,
  Video,
  Mic,
  FileText,
  Check,
  Clock,
  User,
  Shield,
  Camera,
  Link2,
} from 'lucide-react'
import { MobileFrame } from '@/app/components/MobileFrame'

// ─── Types ──────────────────────────────────────────────────────────────────

type Tab = 'home' | 'vault' | 'canvas' | 'network' | 'more'
type MsgType = 'text' | 'audio' | 'video'
type MsgStatus = 'draft' | 'finalized'
type VerifyStatus = 'verified' | 'pending' | 'unverified'
type CreateStep = 'type' | 'recipient' | 'delivery' | 'verifier' | 'preview'

interface Msg {
  id: string
  title: string
  recipient: string
  type: MsgType
  status: MsgStatus
  deliveryRule: string
  category: string
  updated: string
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const MESSAGES: Msg[] = [
  {
    id: '1',
    title: 'For Emma, on your wedding day',
    recipient: 'Emma Chen',
    type: 'video',
    status: 'finalized',
    deliveryRule: 'On my passing',
    category: 'Love',
    updated: 'Updated Jun 2025',
  },
  {
    id: '2',
    title: 'A letter to my brother James',
    recipient: 'James Wilson',
    type: 'text',
    status: 'finalized',
    deliveryRule: '18 months inactivity',
    category: 'Family',
    updated: 'Updated Apr 2025',
  },
  {
    id: '3',
    title: 'Life lessons for my children',
    recipient: 'Emma & Liam Chen',
    type: 'audio',
    status: 'draft',
    deliveryRule: 'Specific date: Jan 2026',
    category: 'Wisdom',
    updated: 'Draft · Mar 2025',
  },
]

const TRUSTED = [
  { name: 'Emma Chen', role: 'Daughter', initials: 'EC', verified: true, verifyStatus: 'verified' as VerifyStatus },
  { name: 'James Wilson', role: 'Brother', initials: 'JW', verified: true, verifyStatus: 'verified' as VerifyStatus },
  { name: 'Dr. Patricia Mills', role: 'Attorney', initials: 'PM', verified: false, verifyStatus: 'pending' as VerifyStatus },
]

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Check-in overdue',
    body: "Your vault hasn't been updated in 87 days. A brief check-in keeps everything active.",
    time: '2 days ago',
    unread: true,
  },
  {
    id: '2',
    title: 'Emma Chen confirmed',
    body: 'Emma has confirmed her contact details and is ready to receive your messages.',
    time: '4 days ago',
    unread: false,
  },
  {
    id: '3',
    title: 'Draft message pending',
    body: '"Life lessons for my children" is still a draft. Finalize it to secure delivery.',
    time: '1 week ago',
    unread: false,
  },
  {
    id: '4',
    title: 'Delivery acknowledgment',
    body: 'Dr. Patricia Mills has acknowledged your delivery preferences.',
    time: '2 weeks ago',
    unread: false,
  },
]

const CANVAS = [
  {
    decade: '1980s',
    label: 'Early Years',
    memories: [
      { year: '1985', cat: 'Milestone', title: 'Born in San Francisco', emoji: '🌉' },
      { year: '1991', cat: 'Memory', title: 'First piano recital at Sunset Community Hall', emoji: '🎹', media: ['audio'] },
    ],
  },
  {
    decade: '1990s',
    label: 'Coming of Age',
    memories: [
      { year: '1995', cat: 'Lesson', title: 'Patience is not passive — it is a discipline', emoji: '💭' },
      { year: '1997', cat: 'Memory', title: 'Road trip to Yosemite with Dad', emoji: '⛺', media: ['photo'] },
      { year: '1999', cat: 'Milestone', title: 'High school graduation', emoji: '🎓' },
    ],
  },
  {
    decade: '2000s',
    label: 'Building a Life',
    memories: [
      { year: '2003', cat: 'Milestone', title: 'Graduated from UC Berkeley', emoji: '📚' },
      { year: '2006', cat: 'Milestone', title: 'Married David', emoji: '💍' },
      { year: '2008', cat: 'Milestone', title: 'Emma was born', emoji: '👶' },
    ],
  },
  {
    decade: '2010s',
    label: 'Roots & Growth',
    memories: [
      { year: '2011', cat: 'Milestone', title: 'Liam was born', emoji: '👶' },
      { year: '2015', cat: 'Memory', title: 'Family trip to Kyoto', emoji: '⛩️', media: ['photo', 'linked'] },
      { year: '2018', cat: 'Lesson', title: 'The year I stopped waiting for the right moment', emoji: '💭' },
    ],
  },
  {
    decade: '2020s',
    label: 'Present',
    memories: [
      { year: '2022', cat: 'Milestone', title: 'Created my vault on My Last Words', emoji: '📝' },
      { year: '2024', cat: 'Memory', title: "Emma's first independent international trip", emoji: '✈️' },
    ],
  },
]

const NETWORK = [
  { name: 'Emma Chen', role: 'Daughter · Trusted Verifier', initials: 'EC', group: 'trusted' as const, verifyStatus: 'verified' as VerifyStatus },
  { name: 'James Wilson', role: 'Brother · Trusted Verifier', initials: 'JW', group: 'trusted' as const, verifyStatus: 'verified' as VerifyStatus },
  { name: 'Dr. Patricia Mills', role: 'Attorney · Pending verification', initials: 'PM', group: 'trusted' as const, verifyStatus: 'pending' as VerifyStatus },
  { name: 'David Chen', role: 'Husband', initials: 'DC', group: 'personal' as const, verifyStatus: 'verified' as VerifyStatus },
  { name: 'Rachel Yamamoto', role: 'Best friend', initials: 'RY', group: 'personal' as const, verifyStatus: 'pending' as VerifyStatus },
  { name: 'Michael Torres', role: 'Brother-in-law', initials: 'MT', group: 'personal' as const, verifyStatus: 'unverified' as VerifyStatus },
  { name: 'Dr. Linda Park', role: 'Colleague · Cardiologist', initials: 'LP', group: 'professional' as const, verifyStatus: 'verified' as VerifyStatus },
  { name: 'Sarah Okafor', role: 'Colleague · Researcher', initials: 'SO', group: 'professional' as const, verifyStatus: 'pending' as VerifyStatus },
]

// ─── Shared micro-components ──────────────────────────────────────────────────

function StatusBadge({ status }: { status: MsgStatus }) {
  if (status === 'finalized')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest bg-sage-light/40 px-2 py-0.5 rounded-full">
        <Check className="w-2.5 h-2.5" />
        Finalized
      </span>
    )
  return (
    <span className="text-[10px] font-semibold text-charcoal-soft bg-stone-light px-2 py-0.5 rounded-full">
      Draft
    </span>
  )
}

function VerifyChip({ status }: { status: VerifyStatus }) {
  if (status === 'verified')
    return (
      <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-forest bg-sage-light/30 px-1.5 py-0.5 rounded-full">
        <Check className="w-2 h-2" strokeWidth={2.5} />
        Verified
      </span>
    )
  if (status === 'pending')
    return (
      <span className="text-[9px] font-semibold text-charcoal-soft bg-lavender/40 px-1.5 py-0.5 rounded-full">
        Pending
      </span>
    )
  return (
    <span className="text-[9px] font-semibold text-stone bg-stone-light px-1.5 py-0.5 rounded-full">
      Unverified
    </span>
  )
}

const TYPE_COLORS: Record<MsgType, string> = {
  text: 'bg-lavender/50 text-charcoal-soft',
  audio: 'bg-sage-light/30 text-forest',
  video: 'bg-mist text-charcoal-soft',
}

const TYPE_ICONS: Record<MsgType, LucideIcon> = {
  text: FileText,
  audio: Mic,
  video: Video,
}

function MessageCard({ msg, onTap }: { msg: Msg; onTap?: () => void }) {
  const Icon = TYPE_ICONS[msg.type]
  return (
    <div
      onClick={onTap}
      className="bg-warm-white border border-stone-light rounded-2xl p-4 cursor-pointer active:scale-[0.985] transition-transform"
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-stone uppercase tracking-wider mb-0.5">
            {msg.category}
          </p>
          <p className="text-sm font-semibold text-charcoal leading-snug">{msg.title}</p>
        </div>
        <StatusBadge status={msg.status} />
      </div>

      <div className="flex items-center gap-2 mb-2.5">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[msg.type]}`}
        >
          <Icon className="w-3 h-3" />
          <span className="capitalize">{msg.type}</span>
        </span>
        <span className="text-xs text-stone">→ {msg.recipient}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-charcoal-soft">
          <Clock className="w-3 h-3 text-stone" />
          {msg.deliveryRule}
        </div>
        <span className="text-[10px] text-stone">{msg.updated}</span>
      </div>
    </div>
  )
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────

function HomeTab({ onTabChange }: { onTabChange: (t: Tab) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      {/* Top bar */}
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">S</span>
            </div>
            <div>
              <p className="text-[11px] text-charcoal-soft">Good morning</p>
              <p className="text-sm font-semibold text-charcoal">Sarah Chen</p>
            </div>
          </div>
          <button className="relative w-9 h-9 bg-mist rounded-xl flex items-center justify-center">
            <Bell className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-forest rounded-full border-2 border-warm-white" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4 space-y-4">
        {/* Vault health */}
        <div
          className="bg-forest rounded-2xl p-4 text-white"
          style={{ boxShadow: '0 2px 8px rgba(91,75,115,0.22), 0 8px 24px rgba(91,75,115,0.14)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-sage-light" strokeWidth={1.75} />
              <span className="text-[11px] font-semibold text-sage-light uppercase tracking-wide">
                Vault Status
              </span>
            </div>
            <span className="text-[10px] font-semibold bg-white/10 text-white/80 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-base font-semibold mb-1">Your vault is secure</p>
          <p className="text-xs text-white/55 mb-4">
            3 messages · 2 finalized · Last updated June 2025
          </p>
          <div className="flex items-center gap-0">
            {[
              { value: '3', label: 'Messages' },
              { value: '3', label: 'Contacts' },
              { value: '87%', label: 'Complete' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-white/15 mx-4" />}
                <div className="text-center">
                  <p className="text-lg font-semibold leading-tight">{value}</p>
                  <p className="text-[10px] text-white/50 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-semibold text-charcoal">Recent Messages</p>
            <button
              onClick={() => onTabChange('vault')}
              className="text-xs text-forest font-semibold"
            >
              View all
            </button>
          </div>
          <div className="space-y-2.5">
            {MESSAGES.slice(0, 2).map((m) => (
              <MessageCard key={m.id} msg={m} />
            ))}
          </div>
        </div>

        {/* Trusted contacts */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-semibold text-charcoal">Trusted Contacts</p>
            <button
              onClick={() => onTabChange('network')}
              className="text-xs text-forest font-semibold"
            >
              Manage
            </button>
          </div>
          <div className="flex items-center gap-4">
            {TRUSTED.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1">
                <div className="relative">
                  <div className="w-11 h-11 bg-mist border border-stone-light rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-forest">{c.initials}</span>
                  </div>
                  {c.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-forest rounded-full border-2 border-warm-white flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-charcoal-soft max-w-[44px] text-center leading-tight truncate">
                  {c.name.split(' ')[0]}
                </p>
                <VerifyChip status={c.verifyStatus} />
              </div>
            ))}
            <div className="flex flex-col items-center gap-1">
              <button className="w-11 h-11 border border-dashed border-stone-light rounded-full flex items-center justify-center hover:border-forest transition-colors">
                <Plus className="w-4 h-4 text-stone" />
              </button>
              <p className="text-[10px] text-stone">Invite</p>
            </div>
          </div>
        </div>

        {/* Reminder card */}
        <div className="bg-warm-white border border-stone-light rounded-2xl p-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04)' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blush rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-3.5 h-3.5 text-charcoal-soft" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-charcoal mb-1">Check-in reminder</p>
              <p className="text-xs text-charcoal-soft leading-relaxed">
                Your vault hasn't been updated in 87 days. A brief check-in keeps your messages
                active and delivery ready.
              </p>
              <button className="mt-2.5 text-xs font-semibold text-forest">
                Check in now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Create Message Flow ──────────────────────────────────────────────────────

function CreateFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<CreateStep>('type')
  const [selectedType, setSelectedType] = useState<MsgType | null>(null)
  const [selectedVerifier, setSelectedVerifier] = useState<string | null>(null)

  const STEPS: CreateStep[] = ['type', 'recipient', 'delivery', 'verifier', 'preview']
  const stepIdx = STEPS.indexOf(step)

  const typeOptions: Array<{ type: MsgType; icon: LucideIcon; label: string; desc: string }> = [
    { type: 'text', icon: FileText, label: 'Written Letter', desc: 'Compose a personal message in your own words.' },
    { type: 'audio', icon: Mic, label: 'Audio Message', desc: 'Record your voice for a more intimate connection.' },
    { type: 'video', icon: Video, label: 'Video Message', desc: 'Leave a video — the most personal way to be remembered.' },
  ]

  const deliveryRules = [
    { label: 'On my passing', desc: 'Delivered after verified notification from trusted contacts' },
    { label: 'After 18 months inactivity', desc: 'Triggered if no check-in received within 18 months' },
    { label: 'On a specific date', desc: 'Delivered automatically on a date you choose' },
    { label: 'Manually by a trusted contact', desc: 'Your chosen verifier initiates delivery when ready' },
  ]

  const STEP_LABELS = ['Type', 'Recipient', 'Delivery', 'Verifier', 'Finalize']

  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      {/* Header */}
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={stepIdx === 0 ? onBack : () => setStep(STEPS[stepIdx - 1])}
            className="w-8 h-8 bg-mist rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-charcoal-soft" />
          </button>
          <div>
            <p className="text-sm font-semibold text-charcoal">Create Message</p>
            <p className="text-[11px] text-charcoal-soft">
              Step {stepIdx + 1} of {STEPS.length} · {STEP_LABELS[stepIdx]}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                i <= stepIdx ? 'bg-forest' : 'bg-stone-light'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 pb-6">
        {step === 'type' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">
              What type of message?
            </p>
            <p className="text-xs text-charcoal-soft mb-4">
              Choose the format that feels most natural for what you want to say.
            </p>
            <div className="space-y-3">
              {typeOptions.map(({ type, icon: Icon, label, desc }) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type)
                    setStep('recipient')
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-stone-light bg-warm-white hover:border-forest/40 hover:bg-forest/4 transition-all text-left"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-forest" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{label}</p>
                    <p className="text-xs text-charcoal-soft">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'recipient' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">Who is this for?</p>
            <p className="text-xs text-charcoal-soft mb-4">
              Select a contact or add someone new to your network.
            </p>
            <div className="space-y-2">
              {[
                ...TRUSTED,
                { name: 'David Chen', role: 'Husband', initials: 'DC', verified: true, verifyStatus: 'verified' as VerifyStatus },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setStep('delivery')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-light bg-warm-white hover:border-forest/40 hover:bg-forest/4 transition-all text-left"
                >
                  <div className="w-9 h-9 bg-mist rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-forest">{c.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal">{c.name}</p>
                    <p className="text-xs text-charcoal-soft">{c.role}</p>
                  </div>
                  <VerifyChip status={c.verifyStatus} />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-stone-light text-charcoal-soft hover:border-forest/40 hover:text-forest transition-all">
                <div className="w-9 h-9 bg-mist/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Add a new contact</span>
              </button>
            </div>
          </div>
        )}

        {step === 'delivery' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">
              When should this be delivered?
            </p>
            <p className="text-xs text-charcoal-soft mb-4">
              Choose the condition that triggers delivery to your recipient.
            </p>
            <div className="space-y-3">
              {deliveryRules.map((rule) => (
                <button
                  key={rule.label}
                  onClick={() => setStep('verifier')}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-stone-light bg-warm-white hover:border-forest/40 hover:bg-forest/4 transition-all text-left"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-9 h-9 bg-mist rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-forest" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{rule.label}</p>
                    <p className="text-xs text-charcoal-soft">{rule.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'verifier' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">Choose a verifier</p>
            <p className="text-xs text-charcoal-soft mb-4">
              Your verifier confirms delivery conditions are met before your message is released.
            </p>
            <div className="space-y-2">
              {TRUSTED.map((v) => (
                <button
                  key={v.name}
                  onClick={() => {
                    setSelectedVerifier(v.name)
                    setStep('preview')
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-light bg-warm-white hover:border-forest/40 hover:bg-forest/4 transition-all text-left"
                >
                  <div className="w-9 h-9 bg-mist rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-forest">{v.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal">{v.name}</p>
                    <p className="text-xs text-charcoal-soft">{v.role}</p>
                  </div>
                  <VerifyChip status={v.verifyStatus} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">Review & Finalize</p>
            <p className="text-xs text-charcoal-soft mb-4">
              Once finalized, this message is secured and delivery scheduled.
            </p>
            <div
              className="bg-warm-white border border-stone-light rounded-2xl p-4 mb-4"
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04)' }}
            >
              {[
                { label: 'Format', value: `${selectedType ?? 'text'} message` },
                { label: 'Recipient', value: 'Emma Chen' },
                { label: 'Delivery', value: 'On my passing' },
                { label: 'Verifier', value: selectedVerifier ?? 'Not selected' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5 border-b border-stone-light/50 last:border-0"
                >
                  <span className="text-xs text-charcoal-soft">{label}</span>
                  <span className="text-xs font-semibold text-charcoal capitalize">{value}</span>
                </div>
              ))}
            </div>
            <div className="bg-sage-light/20 border border-sage-light/40 rounded-xl p-3 mb-5">
              <p className="text-xs text-charcoal-soft leading-relaxed">
                By finalizing, you confirm this message will be securely stored and delivered
                according to your chosen conditions.
              </p>
            </div>
            <button
              onClick={onBack}
              className="w-full bg-forest text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors"
              style={{ boxShadow: '0 2px 6px rgba(91,75,115,0.22)' }}
            >
              Finalize & Secure Message
            </button>
            <button
              onClick={onBack}
              className="w-full mt-2.5 text-xs text-charcoal-soft py-2"
            >
              Save as Draft
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Vault Tab ────────────────────────────────────────────────────────────────

function VaultTab() {
  const [filter, setFilter] = useState<'all' | MsgType>('all')
  const [creating, setCreating] = useState(false)

  const FILTERS: Array<{ label: string; value: 'all' | MsgType }> = [
    { label: 'All', value: 'all' },
    { label: 'Text', value: 'text' },
    { label: 'Audio', value: 'audio' },
    { label: 'Video', value: 'video' },
  ]

  const filtered = filter === 'all' ? MESSAGES : MESSAGES.filter((m) => m.type === filter)

  if (creating) return <CreateFlow onBack={() => setCreating(false)} />

  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-forest" strokeWidth={1.75} />
            <h2 className="text-base font-semibold text-charcoal">My Vault</h2>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="w-8 h-8 bg-forest rounded-xl flex items-center justify-center hover:bg-forest-light transition-colors"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-charcoal-soft mt-1">3 messages · End-to-end encrypted</p>
      </div>

      <div className="px-4 pt-3 flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
              filter === f.value
                ? 'bg-forest text-white'
                : 'bg-warm-white border border-stone-light text-charcoal-soft hover:bg-mist'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-3 pb-4 space-y-3">
        {filtered.map((m) => (
          <MessageCard key={m.id} msg={m} />
        ))}
        <button
          onClick={() => setCreating(true)}
          className="w-full border border-dashed border-stone-light rounded-2xl p-4 flex items-center justify-center gap-2 text-sm text-stone hover:border-stone hover:text-charcoal-soft transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add a new message
        </button>
      </div>
    </div>
  )
}

// ─── Canvas Tab ───────────────────────────────────────────────────────────────

const CAT_STYLES: Record<string, string> = {
  Milestone: 'bg-forest/10 text-forest',
  Lesson: 'bg-lavender/50 text-charcoal-soft',
  Memory: 'bg-blush text-charcoal-soft',
}

function CanvasTab() {
  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-forest" strokeWidth={1.75} />
          <h2 className="text-base font-semibold text-charcoal">MyLife Canvas</h2>
        </div>
        <p className="text-xs text-charcoal-soft mt-1">Your life story, decade by decade</p>
      </div>

      <div className="px-4 pt-4 pb-4 space-y-6">
        {CANVAS.map((decade) => (
          <div key={decade.decade}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-stone-light" />
              <div className="flex items-center gap-2 bg-warm-white border border-stone-light px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-forest">{decade.decade}</span>
                <span className="text-[10px] text-charcoal-soft">{decade.label}</span>
              </div>
              <div className="h-px flex-1 bg-stone-light" />
            </div>
            <div className="space-y-2">
              {decade.memories.map((m) => (
                <div
                  key={m.title}
                  className="bg-warm-white border border-stone-light rounded-xl p-3 flex items-start gap-3"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.03)' }}
                >
                  <span className="text-base flex-shrink-0 leading-none mt-0.5">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${CAT_STYLES[m.cat]}`}
                      >
                        {m.cat}
                      </span>
                      <span className="text-[10px] text-stone">{m.year}</span>
                    </div>
                    <p className="text-sm font-medium text-charcoal leading-snug">{m.title}</p>
                    {m.media && m.media.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1">
                        {m.media.includes('photo') && <Camera className="w-2.5 h-2.5 text-stone" strokeWidth={1.75} />}
                        {m.media.includes('audio') && <Mic className="w-2.5 h-2.5 text-stone" strokeWidth={1.75} />}
                        {m.media.includes('linked') && <Link2 className="w-2.5 h-2.5 text-stone" strokeWidth={1.75} />}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full border border-dashed border-stone-light rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-stone hover:border-stone hover:text-charcoal-soft transition-colors">
          <Plus className="w-4 h-4" />
          Add a memory
        </button>
      </div>
    </div>
  )
}

// ─── Network Tab ──────────────────────────────────────────────────────────────

function NetworkTab() {
  const groups = [
    { label: 'Trusted Verifiers', note: 'Will confirm delivery conditions', key: 'trusted' as const },
    { label: 'Personal', note: '', key: 'personal' as const },
    { label: 'Professional', note: '', key: 'professional' as const },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-forest" strokeWidth={1.75} />
          <h2 className="text-base font-semibold text-charcoal">My Network</h2>
        </div>
        <p className="text-xs text-charcoal-soft mt-1">8 contacts across 3 groups</p>
      </div>

      <div className="px-4 pt-4 pb-4 space-y-5">
        {groups.map(({ label, note, key }) => {
          const contacts = NETWORK.filter((c) => c.group === key)
          return (
            <div key={key}>
              <div className="flex items-baseline gap-2 mb-2.5">
                <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                  {label}
                </p>
                {note && <p className="text-[10px] text-charcoal-soft">{note}</p>}
              </div>
              <div
                className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04)' }}
              >
                {contacts.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 px-4 py-3 active:bg-mist transition-colors">
                    <div className="w-9 h-9 bg-mist rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-forest">{c.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal leading-tight">{c.name}</p>
                      <p className="text-xs text-charcoal-soft">{c.role}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <VerifyChip status={c.verifyStatus} />
                      <ChevronRight className="w-4 h-4 text-stone" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="border border-dashed border-stone-light rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center mx-auto mb-3">
            <Plus className="w-4 h-4 text-forest" />
          </div>
          <p className="text-sm font-semibold text-charcoal mb-1">Add a contact</p>
          <p className="text-xs text-charcoal-soft mb-4">
            Invite someone to join your trusted network.
          </p>
          <button className="text-xs font-semibold text-forest border border-forest/25 px-4 py-2 rounded-lg hover:bg-forest/5 transition-colors">
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── More / Notifications Tab ─────────────────────────────────────────────────

function MoreTab() {
  const accountItems = [
    { label: 'Sarah Chen', sub: 'sarah.chen@email.com', icon: User },
    { label: 'Security Settings', sub: 'Encryption · 2FA active', icon: Shield },
    { label: 'Delivery Preferences', sub: 'Manage delivery rules', icon: Clock },
    { label: 'Legacy Readiness', sub: 'Your vault is prepared for secure delivery', icon: BookOpen },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-ivory">
      <div className="bg-warm-white px-5 pt-2 pb-4 border-b border-stone-light">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-forest" strokeWidth={1.75} />
          <h2 className="text-base font-semibold text-charcoal">Notifications</h2>
        </div>
        <p className="text-xs text-charcoal-soft mt-1">1 unread</p>
      </div>

      <div className="px-4 pt-4 pb-4 space-y-3">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`rounded-2xl p-4 border ${
              n.unread
                ? 'bg-lavender-light/60 border-lavender-deep/35'
                : 'bg-warm-white border-stone-light'
            }`}
            style={{ boxShadow: n.unread ? '0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(140,120,176,0.10)' : '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.03)' }}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                  n.unread ? 'bg-lavender-deep' : 'bg-stone-light'
                }`}
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-charcoal mb-1">{n.title}</p>
                <p className="text-xs text-charcoal-soft leading-relaxed">{n.body}</p>
                <p className="text-[10px] text-stone mt-2">{n.time}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Account section */}
        <div className="pt-1">
          <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2.5">
            Account
          </p>
          <div
            className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.04)' }}
          >
            {accountItems.map(({ label, sub, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-mist rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-forest" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{label}</p>
                  <p className="text-xs text-charcoal-soft">{sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-stone flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────

const NAV_ITEMS: Array<{ key: Tab; label: string; icon: LucideIcon }> = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'vault', label: 'Vault', icon: Archive },
  { key: 'canvas', label: 'Canvas', icon: BookOpen },
  { key: 'network', label: 'Network', icon: Users },
  { key: 'more', label: 'More', icon: MoreHorizontal },
]

function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <div className="flex-shrink-0 bg-warm-white border-t border-stone-light px-1 py-1">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 relative"
          >
            <div
              className={`w-10 h-7 flex items-center justify-center rounded-xl transition-colors duration-200 ${
                active === key ? 'bg-forest/10' : 'bg-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  active === key ? 'text-forest' : 'text-stone'
                }`}
                strokeWidth={active === key ? 2 : 1.75}
              />
            </div>
            <span
              className={`text-[10px] font-medium transition-colors ${
                active === key ? 'text-forest' : 'text-stone'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
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

  const TAB_CONTENT: Record<Tab, React.ReactNode> = {
    home: <HomeTab onTabChange={setActiveTab} />,
    vault: <VaultTab />,
    canvas: <CanvasTab />,
    network: <NetworkTab />,
    more: <MoreTab />,
  }

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
          <p className="text-xs font-semibold text-charcoal-soft">User Experience</p>
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
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {TAB_CONTENT[activeTab]}
                </motion.div>
              </AnimatePresence>
              <BottomNav active={activeTab} onChange={setActiveTab} />
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  )
}
