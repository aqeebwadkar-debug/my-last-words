'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Lock,
  ShieldCheck,
  Send,
  Activity,
  AlertTriangle,
  Check,
  Clock,
  ChevronRight,
  Bell,
  TrendingUp,
  Users,
  RefreshCw,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const VERIFICATION_QUEUE = [
  {
    id: 'V-001',
    user: 'Sarah Chen',
    trigger: 'Inactivity — 87 days',
    lastCheckIn: 'Mar 15, 2025',
    verifier: 'Emma Chen',
    status: 'Pending' as const,
    urgency: 'high' as const,
    daysPending: 12,
  },
  {
    id: 'V-002',
    user: 'David Reyes',
    trigger: 'Inactivity — 94 days',
    lastCheckIn: 'Feb 20, 2025',
    verifier: 'Ana Reyes',
    status: 'Acknowledged' as const,
    urgency: 'medium' as const,
    daysPending: 8,
  },
  {
    id: 'V-003',
    user: 'James Adeyemi',
    trigger: 'Manual trigger',
    lastCheckIn: 'Jun 1, 2025',
    verifier: 'Maria Adeyemi',
    status: 'Confirmed' as const,
    urgency: 'low' as const,
    daysPending: 3,
  },
  {
    id: 'V-004',
    user: 'Emma Yamamoto',
    trigger: 'Account setup',
    lastCheckIn: '—',
    verifier: 'Kenji Yamamoto',
    status: 'Pending' as const,
    urgency: 'medium' as const,
    daysPending: 30,
  },
]

const DELIVERY_PIPELINE = [
  { id: 'D-041', sender: 'James Adeyemi', recipient: 'Maria Adeyemi', type: 'Text', trigger: 'Confirmed — processing', status: 'Ready' as const },
  { id: 'D-038', sender: 'Sarah Chen', recipient: 'Emma Chen', type: 'Video', trigger: 'On passing', status: 'Holding' as const },
  { id: 'D-037', sender: 'Linda Okafor', recipient: 'Kwame Okafor', type: 'Audio', trigger: 'On passing', status: 'Holding' as const },
  { id: 'D-036', sender: 'Michael Torres', recipient: '3 recipients', type: 'Video + Audio', trigger: 'On passing', status: 'Holding' as const },
  { id: 'D-035', sender: 'Patricia Mills', recipient: 'Estate recipients', type: 'Text', trigger: 'On passing', status: 'Holding' as const },
  { id: 'D-034', sender: 'David Reyes', recipient: 'Ana & Luis Reyes', type: 'Text', trigger: 'Delivered Mar 5, 2025', status: 'Delivered' as const },
]

const ACTIVITY = [
  { msg: 'Verification confirmed — James Adeyemi · D-041 queued for delivery', type: 'delivery', time: '3 min ago' },
  { msg: 'Check-in reminder sent — Sarah Chen (day 87)', type: 'system', time: '12 min ago' },
  { msg: 'Verifier contacted — Emma Yamamoto case V-004', type: 'system', time: '1 hour ago' },
  { msg: 'Delivery acknowledged — David Reyes case resolved', type: 'delivery', time: '4 hours ago' },
  { msg: 'Inactivity threshold reached — David Reyes (day 94)', type: 'alert', time: '8 hours ago' },
  { msg: 'Backup completed — all vault data secured', type: 'system', time: '10 hours ago' },
  { msg: 'New verification opened — Emma Yamamoto', type: 'system', time: 'Jun 7, 2025' },
]

const STATUS_STYLES = {
  Ready: 'bg-forest/10 text-forest',
  Holding: 'bg-stone-light text-charcoal-soft',
  Delivered: 'bg-sage-light/40 text-forest',
} as const

const URGENCY_DOT = {
  high: 'bg-gold',
  medium: 'bg-sage',
  low: 'bg-stone-light',
} as const

const VERIFIER_STATUS_STYLES = {
  Pending: 'bg-gold-light/60 text-charcoal-soft',
  Acknowledged: 'bg-lavender/50 text-charcoal-soft',
  Confirmed: 'bg-sage-light/40 text-forest',
} as const

const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OperationsConsolePage() {
  const [lastRefresh] = useState('Jun 8, 2025 · 11:42 AM')

  const readyCount = DELIVERY_PIPELINE.filter((d) => d.status === 'Ready').length
  const pendingVerif = VERIFICATION_QUEUE.filter((v) => v.status === 'Pending').length

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
                <Activity className="w-3 h-3 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-charcoal">Operations Console</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage rounded-full" />
              <span className="text-xs text-charcoal-soft font-medium">All systems operational</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-stone">
              <RefreshCw className="w-3 h-3" strokeWidth={1.75} />
              {lastRefresh}
            </div>
            <button className="relative w-8 h-8 bg-mist rounded-xl flex items-center justify-center hover:bg-ivory-dark transition-colors">
              <Bell className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-forest rounded-full" />
            </button>
            <div className="w-8 h-8 bg-forest rounded-xl flex items-center justify-center shadow-card">
              <span className="text-white text-xs font-bold">O</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-7">

        {/* Stats row */}
        <motion.div
          variants={fade}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {[
            {
              icon: ShieldCheck,
              label: 'Active Verifications',
              value: VERIFICATION_QUEUE.length,
              sub: `${pendingVerif} pending response`,
              accent: false,
            },
            {
              icon: Send,
              label: 'Delivery Queue',
              value: DELIVERY_PIPELINE.filter((d) => d.status !== 'Delivered').length,
              sub: `${readyCount} ready to process`,
              accent: true,
            },
            {
              icon: Users,
              label: 'Checked In Today',
              value: 34,
              sub: 'of 2,847 active users',
              accent: false,
            },
            {
              icon: TrendingUp,
              label: 'Delivery Success',
              value: '99.2%',
              sub: '142 total deliveries',
              accent: false,
            },
          ].map(({ icon: Icon, label, value, sub, accent }, i) => (
            <motion.div
              key={label}
              variants={fade}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl p-5 border transition-all ${
                accent
                  ? 'bg-forest text-white border-forest shadow-forest'
                  : 'bg-warm-white border-stone-light shadow-card'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accent ? 'bg-white/10' : 'bg-mist'}`}>
                <Icon className={`w-4 h-4 ${accent ? 'text-sage-light' : 'text-forest'}`} strokeWidth={1.75} />
              </div>
              <p className={`text-2xl font-semibold tracking-tight mb-0.5 ${accent ? 'text-white' : 'text-charcoal'}`}>
                {value}
              </p>
              <p className={`text-xs font-medium ${accent ? 'text-white/70' : 'text-charcoal-soft'}`}>{label}</p>
              <p className={`text-[11px] mt-1 ${accent ? 'text-white/45' : 'text-stone'}`}>{sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

          {/* Verification queue */}
          <motion.div
            variants={fade}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-charcoal">Verification Queue</h2>
                <p className="text-xs text-charcoal-soft mt-0.5">{VERIFICATION_QUEUE.length} active cases</p>
              </div>
              <Link href="/admin" className="text-xs font-semibold text-forest hover:text-forest-light transition-colors">
                Full view
                <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {VERIFICATION_QUEUE.map((v, i) => (
                <motion.div
                  key={v.id}
                  variants={fade}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.35, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-warm-white border border-stone-light rounded-2xl p-4 shadow-card"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${URGENCY_DOT[v.urgency]}`} />
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{v.user}</p>
                        <p className="text-xs text-charcoal-soft mt-0.5">{v.trigger}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${VERIFIER_STATUS_STYLES[v.status]}`}>
                        {v.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { label: 'Case', value: v.id },
                      { label: 'Verifier', value: v.verifier.split(' ')[0] },
                      { label: 'Days open', value: `${v.daysPending}d` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-ivory rounded-lg p-2">
                        <p className="text-[9px] font-semibold text-stone uppercase tracking-wide mb-0.5">{label}</p>
                        <p className="text-xs font-semibold text-charcoal">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {v.status === 'Confirmed' ? (
                      <button className="flex-1 bg-forest text-white text-xs font-semibold py-2 rounded-xl hover:bg-forest-light transition-colors">
                        Process Delivery
                      </button>
                    ) : (
                      <>
                        <button className="flex-1 bg-mist text-charcoal border border-stone-light text-xs font-semibold py-2 rounded-xl hover:bg-ivory-dark transition-colors">
                          Notify Verifier
                        </button>
                        <button className="flex-1 border border-stone-light text-charcoal-soft text-xs font-semibold py-2 rounded-xl hover:bg-mist transition-colors">
                          Review
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Delivery pipeline */}
          <motion.div
            variants={fade}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-charcoal">Delivery Pipeline</h2>
                <p className="text-xs text-charcoal-soft mt-0.5">{DELIVERY_PIPELINE.length} deliveries tracked</p>
              </div>
              <Link href="/admin" className="text-xs font-semibold text-forest hover:text-forest-light transition-colors">
                Full view
                <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
              </Link>
            </div>

            <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden shadow-card">
              <div className="bg-ivory/60 border-b border-stone-light px-5 py-3 grid grid-cols-12 gap-2">
                {['ID', 'Sender', 'Recipient', 'Type', 'Status'].map((h) => (
                  <p
                    key={h}
                    className={`text-[10px] font-semibold text-charcoal-soft uppercase tracking-wider ${
                      h === 'ID' ? 'col-span-2' : h === 'Sender' || h === 'Recipient' ? 'col-span-3' : h === 'Type' ? 'col-span-2' : 'col-span-2'
                    }`}
                  >
                    {h}
                  </p>
                ))}
              </div>

              <div className="divide-y divide-stone-light/60">
                {DELIVERY_PIPELINE.map((d, i) => (
                  <motion.div
                    key={d.id}
                    variants={fade}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.3, delay: 0.22 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="px-5 py-3.5 grid grid-cols-12 gap-2 items-center hover:bg-ivory/40 transition-colors"
                  >
                    <p className="col-span-2 text-[11px] font-semibold text-charcoal-soft">{d.id}</p>
                    <p className="col-span-3 text-xs font-medium text-charcoal truncate">{d.sender.split(' ')[0]}</p>
                    <p className="col-span-3 text-xs text-charcoal-soft truncate">{d.recipient.split(' ')[0]}</p>
                    <p className="col-span-2 text-[11px] text-charcoal-soft truncate">{d.type.split(' ')[0]}</p>
                    <div className="col-span-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${STATUS_STYLES[d.status]}`}>
                        {d.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ready to process highlight */}
              {readyCount > 0 && (
                <div className="px-5 py-3 border-t border-stone-light bg-sage-light/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-forest/10 rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-forest" strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-semibold text-forest">
                      {readyCount} delivery ready to process
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-forest hover:text-forest-light transition-colors">
                    Process →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Activity feed */}
        <motion.div
          variants={fade}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-warm-white border border-stone-light rounded-2xl shadow-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-stone-light flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-charcoal">Operations Log</h2>
              <p className="text-xs text-charcoal-soft mt-0.5">Real-time system activity</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
              <span className="text-xs text-charcoal-soft font-medium">Live</span>
            </div>
          </div>

          <div className="divide-y divide-stone-light/40">
            {ACTIVITY.map((log, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-3.5 hover:bg-ivory/30 transition-colors">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    log.type === 'delivery'
                      ? 'bg-forest'
                      : log.type === 'alert'
                      ? 'bg-gold'
                      : 'bg-stone-light'
                  }`}
                />
                <p className="flex-1 text-xs text-charcoal leading-relaxed">{log.msg}</p>
                <span className="text-[10px] text-stone flex-shrink-0 whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance / system status strip */}
        <motion.div
          variants={fade}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-warm-white border border-stone-light rounded-2xl px-6 py-4 shadow-card"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-forest" strokeWidth={1.75} />
              <p className="text-xs font-semibold text-charcoal">System Status</p>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {[
                { label: 'Encryption', value: 'AES-256-GCM' },
                { label: 'Last backup', value: 'Jun 8, 2025 · 02:00 UTC' },
                { label: 'Uptime', value: '99.98%' },
                { label: 'Active sessions', value: '1,247' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs text-stone">{label}:</span>
                  <span className="text-xs font-semibold text-charcoal">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-sage" strokeWidth={1.75} />
              <span className="text-xs font-semibold text-sage">SOC 2 Compliant</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
