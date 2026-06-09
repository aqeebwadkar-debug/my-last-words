'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { AppIcon } from '@/app/components/AppIcon'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Send,
  Flag,
  BarChart2,
  Settings,
  ChevronRight,
  Check,
  AlertTriangle,
  Bell,
  Search,
  TrendingUp,
  Activity,
  LogOut,
  CheckCircle,
  Circle,
  ChevronLeft,
  X,
  Gift,
  Mail,
  Pencil,
  Eye,
  User,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Section =
  | 'dashboard'
  | 'users'
  | 'verification'
  | 'deliveries'
  | 'moderation'
  | 'analytics'
  | 'settings'

type UserRecord = {
  id: string
  name: string
  email: string
  mobile: string
  age: number
  gender: string
  status: 'Active' | 'Inactive' | 'Suspended'
  location: string
  vaults: number
  verified: boolean
  trustedVerifiers: string[]
  emergencyContacts: string[]
  deliveryPreferences: string
  lastActivity: string
  accountCreated: string
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const USERS_DATA: UserRecord[] = [
  {
    id: 'USR-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    mobile: '+1 (415) 555-0182',
    age: 38,
    gender: 'Female',
    status: 'Active',
    location: 'San Francisco, CA',
    vaults: 3,
    verified: true,
    trustedVerifiers: ['Michael Chen', 'Lisa Wong'],
    emergencyContacts: ['Michael Chen · +1 (415) 555-0183'],
    deliveryPreferences: 'On passing — email + SMS',
    lastActivity: 'Jun 7, 2025',
    accountCreated: 'Mar 12, 2023',
  },
  {
    id: 'USR-002',
    name: 'Michael Torres',
    email: 'm.torres@email.com',
    mobile: '+1 (212) 555-0147',
    age: 45,
    gender: 'Male',
    status: 'Active',
    location: 'New York, NY',
    vaults: 5,
    verified: true,
    trustedVerifiers: ['Anna Torres', 'Carlos Mendez'],
    emergencyContacts: ['Anna Torres · +1 (212) 555-0148'],
    deliveryPreferences: 'On passing — email only',
    lastActivity: 'Jun 6, 2025',
    accountCreated: 'Jan 5, 2023',
  },
  {
    id: 'USR-003',
    name: 'Emma Yamamoto',
    email: 'e.yamamoto@email.com',
    mobile: '+1 (206) 555-0193',
    age: 29,
    gender: 'Female',
    status: 'Active',
    location: 'Seattle, WA',
    vaults: 2,
    verified: false,
    trustedVerifiers: [],
    emergencyContacts: ['Kenji Yamamoto · +1 (206) 555-0194'],
    deliveryPreferences: 'Scheduled date — email + SMS',
    lastActivity: 'May 20, 2025',
    accountCreated: 'Nov 8, 2024',
  },
  {
    id: 'USR-004',
    name: 'James Adeyemi',
    email: 'j.adeyemi@email.com',
    mobile: '+1 (512) 555-0161',
    age: 52,
    gender: 'Male',
    status: 'Active',
    location: 'Austin, TX',
    vaults: 7,
    verified: true,
    trustedVerifiers: ['Maria Adeyemi', 'Emeka Obi', 'Tunde Bello'],
    emergencyContacts: [
      'Maria Adeyemi · +1 (512) 555-0162',
      'Dr. Emeka Obi · +1 (512) 555-0175',
    ],
    deliveryPreferences: 'On passing — email + SMS + legal notification',
    lastActivity: 'Jun 8, 2025',
    accountCreated: 'Sep 3, 2022',
  },
  {
    id: 'USR-005',
    name: 'Patricia Mills',
    email: 'p.mills@lawfirm.com',
    mobile: '+1 (312) 555-0209',
    age: 61,
    gender: 'Female',
    status: 'Inactive',
    location: 'Chicago, IL',
    vaults: 1,
    verified: false,
    trustedVerifiers: ['Robert Mills'],
    emergencyContacts: ['Robert Mills · +1 (312) 555-0210'],
    deliveryPreferences: 'On passing — legal representative',
    lastActivity: 'Nov 14, 2024',
    accountCreated: 'Jul 22, 2023',
  },
  {
    id: 'USR-006',
    name: 'David Reyes',
    email: 'd.reyes@email.com',
    mobile: '+1 (305) 555-0134',
    age: 41,
    gender: 'Male',
    status: 'Active',
    location: 'Miami, FL',
    vaults: 4,
    verified: true,
    trustedVerifiers: ['Ana Reyes'],
    emergencyContacts: [
      'Ana Reyes · +1 (305) 555-0135',
      'Luis Reyes · +1 (305) 555-0136',
    ],
    deliveryPreferences: 'On passing — email + SMS',
    lastActivity: 'Jun 5, 2025',
    accountCreated: 'Apr 18, 2023',
  },
  {
    id: 'USR-007',
    name: 'Linda Okafor',
    email: 'l.okafor@email.com',
    mobile: '+44 7700 900182',
    age: 35,
    gender: 'Female',
    status: 'Active',
    location: 'London, UK',
    vaults: 3,
    verified: true,
    trustedVerifiers: ['Kwame Okafor', 'Adaeze Nwosu'],
    emergencyContacts: ['Kwame Okafor · +44 7700 900183'],
    deliveryPreferences: 'On passing — email only',
    lastActivity: 'Jun 7, 2025',
    accountCreated: 'Feb 14, 2024',
  },
  {
    id: 'USR-008',
    name: 'Robert Kim',
    email: 'r.kim@email.com',
    mobile: '+1 (416) 555-0178',
    age: 33,
    gender: 'Male',
    status: 'Suspended',
    location: 'Toronto, CA',
    vaults: 2,
    verified: true,
    trustedVerifiers: ['Ji-Young Kim'],
    emergencyContacts: ['Ji-Young Kim · +1 (416) 555-0179'],
    deliveryPreferences: 'On passing — email + SMS',
    lastActivity: 'Jun 3, 2025',
    accountCreated: 'May 29, 2024',
  },
]

const VERIFICATIONS = [
  {
    user: 'Sarah Chen',
    trigger: 'Inactivity (87 days)',
    lastCheckIn: 'Mar 15, 2025',
    verifierStatus: 'Pending',
    daysPending: 12,
    deathCertStatus: 'Pending',
    identityStatus: 'Verified',
    verifierDocsStatus: 'Pending',
  },
  {
    user: 'James Adeyemi',
    trigger: 'Manual trigger',
    lastCheckIn: 'Jun 1, 2025',
    verifierStatus: 'Confirmed',
    daysPending: 3,
    deathCertStatus: 'Uploaded',
    identityStatus: 'Verified',
    verifierDocsStatus: 'Submitted',
  },
  {
    user: 'Emma Yamamoto',
    trigger: 'Account setup',
    lastCheckIn: '—',
    verifierStatus: 'Pending',
    daysPending: 30,
    deathCertStatus: 'Pending',
    identityStatus: 'Pending',
    verifierDocsStatus: 'Pending',
  },
  {
    user: 'David Reyes',
    trigger: 'Inactivity (94 days)',
    lastCheckIn: 'Feb 20, 2025',
    verifierStatus: 'Acknowledged',
    daysPending: 8,
    deathCertStatus: 'Uploaded',
    identityStatus: 'Verified',
    verifierDocsStatus: 'Pending',
  },
]

const DELIVERIES = [
  { sender: 'Sarah Chen', recipient: 'Emma Chen', type: 'Video', scheduled: 'On passing', status: 'Pending' },
  { sender: 'James Adeyemi', recipient: 'Maria Adeyemi', type: 'Text', scheduled: 'Jan 15, 2026', status: 'Scheduled' },
  { sender: 'Michael Torres', recipient: '3 recipients', type: 'Video + Audio', scheduled: 'On passing', status: 'Pending' },
  { sender: 'Linda Okafor', recipient: 'Kwame Okafor', type: 'Audio', scheduled: 'On passing', status: 'Pending' },
  { sender: 'David Reyes', recipient: 'Ana & Luis Reyes', type: 'Text', scheduled: 'Mar 5, 2025', status: 'Delivered' },
  { sender: 'Patricia Mills', recipient: 'Estate recipients', type: 'Text', scheduled: 'On passing', status: 'Pending' },
]

const MODERATION = [
  {
    user: 'Robert Kim',
    content: 'Video message',
    severity: 'Medium',
    reason: 'Potentially inappropriate content requiring review',
    date: 'Jun 5, 2025',
  },
  {
    user: 'Anonymous',
    content: 'Text message',
    severity: 'Low',
    reason: 'Contains external contact information not linked to network',
    date: 'Jun 3, 2025',
  },
]

const ACTIVITY_LOG = [
  { action: 'Reviewed flagged content (Robert Kim)', type: 'moderation', time: '2 min ago' },
  { action: 'Verification triggered — Sarah Chen', type: 'system', time: '15 min ago' },
  { action: 'Delivery processed — James Adeyemi', type: 'delivery', time: '1 hour ago' },
  { action: '5 new user registrations', type: 'system', time: '2 hours ago' },
  { action: 'Low-severity alert resolved', type: 'moderation', time: '3 hours ago' },
  { action: 'System backup completed', type: 'system', time: '4 hours ago' },
  { action: 'Delivery confirmed — David Reyes', type: 'delivery', time: '8 hours ago' },
]

const MONTHLY_USERS = [40, 55, 48, 62, 70, 58, 75, 82, 68, 78, 85, 90]
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

// ─── Shared micro-components ──────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  icon: LucideIcon
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-200 ${
        accent
          ? 'bg-forest text-white border-forest shadow-forest'
          : 'bg-warm-white border-stone-light shadow-card hover:shadow-card-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent ? 'bg-white/10' : 'bg-mist'
          }`}
        >
          <Icon
            className={`w-4 h-4 ${accent ? 'text-sage-light' : 'text-forest'}`}
            strokeWidth={1.75}
          />
        </div>
      </div>
      <p className={`text-2xl font-semibold mb-0.5 tracking-tight ${accent ? 'text-white' : 'text-charcoal'}`}>
        {value}
      </p>
      <p className={`text-xs font-medium ${accent ? 'text-white/70' : 'text-charcoal-soft'}`}>
        {label}
      </p>
      {sub && (
        <p className={`text-[11px] mt-1.5 ${accent ? 'text-white/45' : 'text-stone'}`}>{sub}</p>
      )}
    </div>
  )
}

function StatusPill({
  status,
}: {
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending' | 'Confirmed' | 'Acknowledged' | 'Delivered' | 'Scheduled'
}) {
  const styles: Record<string, string> = {
    Active: 'bg-sage-light/40 text-forest',
    Confirmed: 'bg-sage-light/40 text-forest',
    Delivered: 'bg-sage-light/40 text-forest',
    Inactive: 'bg-stone-light text-charcoal-soft',
    Pending: 'bg-gold-light/60 text-charcoal-soft',
    Acknowledged: 'bg-lavender/50 text-charcoal-soft',
    Scheduled: 'bg-lavender/50 text-charcoal-soft',
    Suspended: 'bg-rose-50 text-rose-400',
  }
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
        styles[status] ?? 'bg-stone-light text-charcoal-soft'
      }`}
    >
      {status}
    </span>
  )
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
        enabled ? 'bg-forest' : 'bg-stone-light'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

// ─── User Details Drawer ──────────────────────────────────────────────────────

function UserDrawer({ user, onClose }: { user: UserRecord; onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-charcoal/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[420px] bg-warm-white border-l border-stone-light z-50 overflow-y-auto shadow-card-lg">
        <div className="sticky top-0 bg-warm-white/95 backdrop-blur-sm border-b border-stone-light px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-charcoal">{user.name}</p>
            <p className="text-xs text-stone mt-0.5">{user.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-mist flex items-center justify-center hover:bg-ivory-dark transition-colors"
          >
            <X className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <StatusPill status={user.status} />
            {user.verified ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sage-light/40 text-forest">
                <CheckCircle className="w-3 h-3" strokeWidth={2} />
                ID Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-stone-light text-charcoal-soft">
                <Circle className="w-3 h-3" strokeWidth={2} />
                Unverified
              </span>
            )}
          </div>

          {/* Personal Details */}
          <div className="bg-ivory rounded-2xl p-4 border border-stone-light">
            <p className="text-[10px] font-semibold text-stone uppercase tracking-widest mb-3">Personal Details</p>
            <div className="space-y-2.5">
              {[
                { label: 'Full Name', value: user.name },
                { label: 'Email', value: user.email },
                { label: 'Mobile', value: user.mobile },
                { label: 'Age', value: String(user.age) },
                { label: 'Gender', value: user.gender },
                { label: 'Location', value: user.location },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-3">
                  <span className="text-xs text-stone flex-shrink-0 w-24">{label}</span>
                  <span className="text-xs font-medium text-charcoal text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-ivory rounded-2xl p-4 border border-stone-light">
            <p className="text-[10px] font-semibold text-stone uppercase tracking-widest mb-3">Account</p>
            <div className="space-y-2.5">
              {[
                { label: 'User ID', value: user.id },
                { label: 'Vault Count', value: String(user.vaults) },
                { label: 'Last Activity', value: user.lastActivity },
                { label: 'Created', value: user.accountCreated },
                { label: 'Delivery Prefs', value: user.deliveryPreferences },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-3">
                  <span className="text-xs text-stone flex-shrink-0 w-24">{label}</span>
                  <span className="text-xs font-medium text-charcoal text-right flex-1">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Verifiers */}
          <div className="bg-ivory rounded-2xl p-4 border border-stone-light">
            <p className="text-[10px] font-semibold text-stone uppercase tracking-widest mb-3">Trusted Verifiers</p>
            {user.trustedVerifiers.length > 0 ? (
              <div className="space-y-2">
                {user.trustedVerifiers.map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-sage-light/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-forest" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-medium text-charcoal">{v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone">No verifiers assigned</p>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-ivory rounded-2xl p-4 border border-stone-light">
            <p className="text-[10px] font-semibold text-stone uppercase tracking-widest mb-3">Emergency Contacts</p>
            <div className="space-y-2">
              {user.emergencyContacts.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-mist rounded-full flex items-center justify-center flex-shrink-0 border border-stone-light">
                    <User className="w-2.5 h-2.5 text-charcoal-soft" strokeWidth={2} />
                  </div>
                  <span className="text-xs text-charcoal">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Dashboard Section ────────────────────────────────────────────────────────

function DashboardSection() {
  return (
    <div className="p-8 space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Overview</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">Platform health as of June 8, 2025</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="2,847" sub="+34 this week" icon={Users} />
        <StatCard label="Active Users" value="1,893" sub="66.5% of total" icon={Activity} accent />
        <StatCard label="Pending Verifications" value="23" sub="4 require attention" icon={ShieldCheck} />
        <StatCard label="Delivery Success Rate" value="99.2%" sub="142 deliveries total" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Moderation alerts */}
        <div className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-charcoal">Moderation Alerts</h3>
            <span className="text-xs bg-gold-light/60 text-charcoal-soft font-semibold px-2.5 py-1 rounded-full">
              2 open
            </span>
          </div>
          <div className="space-y-3">
            {MODERATION.map((m) => (
              <div
                key={m.user}
                className="flex items-start gap-3 p-3.5 bg-ivory rounded-xl border border-stone-light"
              >
                <AlertTriangle
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    m.severity === 'Medium' ? 'text-gold' : 'text-stone'
                  }`}
                  strokeWidth={1.75}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-charcoal">
                    {m.user} · {m.content}
                  </p>
                  <p className="text-xs text-charcoal-soft mt-0.5 leading-relaxed">{m.reason}</p>
                </div>
                <span
                  className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    m.severity === 'Medium'
                      ? 'bg-gold-light/60 text-charcoal-soft'
                      : 'bg-stone-light text-charcoal-soft'
                  }`}
                >
                  {m.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity log */}
        <div className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-charcoal mb-5">Recent Activity</h3>
          <div className="space-y-3.5">
            {ACTIVITY_LOG.map((log, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    log.type === 'moderation'
                      ? 'bg-gold'
                      : log.type === 'delivery'
                      ? 'bg-forest'
                      : 'bg-stone-light'
                  }`}
                />
                <p className="flex-1 text-xs text-charcoal leading-relaxed">{log.action}</p>
                <span className="text-[10px] text-stone flex-shrink-0 whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Users Section ────────────────────────────────────────────────────────────

function UsersSection() {
  const [query, setQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null)

  const filtered = USERS_DATA.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-charcoal">User Management</h2>
          <p className="text-sm text-charcoal-soft mt-0.5">{USERS_DATA.length} registered accounts</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-warm-white border border-stone-light rounded-xl text-sm text-charcoal placeholder-stone focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/8 transition-all shadow-card"
        />
      </div>

      <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-light bg-ivory/60">
                <th className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5">
                  Name
                </th>
                <th className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5">
                  Status
                </th>
                <th className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5">
                  Location
                </th>
                <th className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5">
                  Vaults
                </th>
                <th className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5">
                  Verified
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-light/60">
              {filtered.map((u) => (
                <tr key={u.email} className="hover:bg-ivory/50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{u.name}</p>
                      <p className="text-xs text-stone mt-0.5">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={u.status} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-charcoal-soft">{u.location}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-charcoal">{u.vaults}</span>
                  </td>
                  <td className="px-5 py-4">
                    {u.verified ? (
                      <CheckCircle className="w-4 h-4 text-forest" strokeWidth={1.75} />
                    ) : (
                      <Circle className="w-4 h-4 text-stone" strokeWidth={1.75} />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="text-xs text-forest font-semibold hover:text-forest-light transition-colors"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <p className="text-sm text-charcoal-soft">No users match your search.</p>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}

// ─── Verification Section ─────────────────────────────────────────────────────

function VerificationSection() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Verification Queue</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">
          {VERIFICATIONS.length} active cases · 2 require attention
        </p>
      </div>

      <div className="space-y-4">
        {VERIFICATIONS.map((v) => (
          <div key={v.user} className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-charcoal">{v.user}</p>
                <p className="text-xs text-charcoal-soft mt-0.5">Trigger: {v.trigger}</p>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <StatusPill status={v.verifierStatus as 'Pending' | 'Confirmed' | 'Acknowledged'} />
                <span className="text-[11px] text-stone font-medium">{v.daysPending}d pending</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-ivory rounded-xl p-3">
                <p className="text-[10px] font-semibold text-stone uppercase tracking-wider mb-1">
                  Last check-in
                </p>
                <p className="text-sm font-medium text-charcoal">{v.lastCheckIn}</p>
              </div>
              <div className="bg-ivory rounded-xl p-3">
                <p className="text-[10px] font-semibold text-stone uppercase tracking-wider mb-1">
                  Verifier status
                </p>
                <p className="text-sm font-medium text-charcoal">{v.verifierStatus}</p>
              </div>
            </div>

            {/* Supporting Documents */}
            <div className="mb-4 p-3 bg-ivory rounded-xl border border-stone-light">
              <p className="text-[10px] font-semibold text-stone uppercase tracking-wider mb-2">
                Supporting Documents
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg ${
                    v.deathCertStatus === 'Uploaded'
                      ? 'bg-sage-light/40 text-forest'
                      : 'bg-gold-light/60 text-charcoal-soft'
                  }`}
                >
                  {v.deathCertStatus === 'Uploaded' ? (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <Circle className="w-3 h-3" strokeWidth={2} />
                  )}
                  Death Certificate {v.deathCertStatus === 'Uploaded' ? 'Uploaded' : 'Pending'}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg ${
                    v.identityStatus === 'Verified'
                      ? 'bg-sage-light/40 text-forest'
                      : 'bg-gold-light/60 text-charcoal-soft'
                  }`}
                >
                  {v.identityStatus === 'Verified' ? (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <Circle className="w-3 h-3" strokeWidth={2} />
                  )}
                  Identity {v.identityStatus}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg ${
                    v.verifierDocsStatus === 'Submitted'
                      ? 'bg-sage-light/40 text-forest'
                      : 'bg-stone-light text-charcoal-soft'
                  }`}
                >
                  {v.verifierDocsStatus === 'Submitted' ? (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <Circle className="w-3 h-3" strokeWidth={2} />
                  )}
                  Verifier Documents {v.verifierDocsStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {v.verifierStatus === 'Confirmed' ? (
                <button className="flex-1 bg-forest text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-forest-light transition-colors">
                  Process Delivery
                </button>
              ) : (
                <>
                  <button className="flex-1 bg-mist text-charcoal text-xs font-semibold py-2.5 rounded-xl hover:bg-ivory-dark transition-colors border border-stone-light">
                    Notify Verifier
                  </button>
                  <button className="flex-1 border border-stone-light text-charcoal-soft text-xs font-semibold py-2.5 rounded-xl hover:bg-mist transition-colors">
                    Review Case
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
        <h3 className="text-sm font-semibold text-charcoal mb-4">Verification Log</h3>
        <div className="space-y-3.5">
          {[
            { text: 'Emma Yamamoto — account verification email sent', time: '10 min ago' },
            { text: 'James Adeyemi — verifier confirmation received', time: '3 hours ago' },
            { text: 'David Reyes — inactivity trigger activated after 94 days', time: '8 hours ago' },
            { text: 'Patricia Mills — account marked inactive (no login 180d)', time: 'Jun 6, 2025' },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 bg-sage-light/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-forest" strokeWidth={2.5} />
              </div>
              <p className="flex-1 text-xs text-charcoal leading-relaxed">{log.text}</p>
              <span className="text-[10px] text-stone flex-shrink-0 whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Deliveries Section ───────────────────────────────────────────────────────

function DeliveriesSection() {
  const [tab, setTab] = useState<'all' | 'pending' | 'scheduled' | 'delivered'>('all')

  const filtered =
    tab === 'all' ? DELIVERIES : DELIVERIES.filter((d) => d.status.toLowerCase() === tab)

  const tabs: Array<{ key: typeof tab; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'delivered', label: 'Delivered' },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Delivery Management</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">
          {DELIVERIES.length} total deliveries · 1 completed
        </p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${
              tab === t.key
                ? 'bg-forest text-white shadow-btn'
                : 'bg-warm-white border border-stone-light text-charcoal-soft hover:bg-mist'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden shadow-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-light bg-ivory/60">
              {['Sender', 'Recipient', 'Type', 'Delivery Trigger', 'Status'].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-semibold text-charcoal-soft uppercase tracking-wider px-5 py-3.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-light/60">
            {filtered.map((d, i) => (
              <tr key={i} className="hover:bg-ivory/50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-charcoal">{d.sender}</td>
                <td className="px-5 py-4 text-sm text-charcoal-soft">{d.recipient}</td>
                <td className="px-5 py-4 text-xs text-charcoal-soft">{d.type}</td>
                <td className="px-5 py-4 text-xs text-charcoal-soft">{d.scheduled}</td>
                <td className="px-5 py-4">
                  <StatusPill status={d.status as 'Pending' | 'Scheduled' | 'Delivered'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-charcoal-soft">No deliveries in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Moderation Section ───────────────────────────────────────────────────────

function ModerationSection() {
  const [resolved, setResolved] = useState<number[]>([])

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Moderation</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">
          {MODERATION.length - resolved.length} open alerts
        </p>
      </div>

      <div className="space-y-4">
        {MODERATION.map((m, i) => (
          <div
            key={i}
            className={`bg-warm-white border rounded-2xl p-5 shadow-card transition-opacity ${
              resolved.includes(i) ? 'opacity-40 border-stone-light' : 'border-stone-light'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.severity === 'Medium' ? 'bg-gold-light/60' : 'bg-stone-light/60'
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 ${m.severity === 'Medium' ? 'text-gold' : 'text-stone'}`}
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {m.user} · {m.content}
                  </p>
                  <p className="text-xs text-charcoal-soft mt-0.5">{m.date}</p>
                </div>
              </div>
              <span
                className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  m.severity === 'Medium'
                    ? 'bg-gold-light/60 text-charcoal-soft'
                    : 'bg-stone-light text-charcoal-soft'
                }`}
              >
                {m.severity} severity
              </span>
            </div>
            <div className="bg-ivory rounded-xl p-3.5 mb-4 border border-stone-light">
              <p className="text-[10px] font-semibold text-stone uppercase tracking-wider mb-1.5">
                Reason
              </p>
              <p className="text-sm text-charcoal">{m.reason}</p>
            </div>
            {resolved.includes(i) ? (
              <p className="text-xs font-semibold text-sage">Resolved · No further action</p>
            ) : (
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-forest text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-forest-light transition-colors">
                  Review Content
                </button>
                <button
                  onClick={() => setResolved((r) => [...r, i])}
                  className="flex-1 border border-stone-light text-charcoal-soft text-xs font-semibold py-2.5 rounded-xl hover:bg-mist transition-colors"
                >
                  Dismiss
                </button>
                <button className="flex-1 bg-blush text-charcoal-soft text-xs font-semibold py-2.5 rounded-xl hover:bg-ivory-dark transition-colors border border-stone-light">
                  Escalate
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-mist border border-stone-light rounded-2xl p-5">
        <p className="text-xs font-semibold text-charcoal mb-3">Moderation guidelines</p>
        <ul className="space-y-2">
          {[
            'Low: External references or formatting concerns — review and dismiss if benign.',
            'Medium: Potentially harmful or inappropriate content — escalate for secondary review.',
            'High: Illegal content or serious violations — escalate and suspend immediately.',
          ].map((g) => (
            <li key={g} className="flex items-start gap-2">
              <ChevronRight className="w-3 h-3 text-stone flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-soft leading-relaxed">{g}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Analytics Section ────────────────────────────────────────────────────────

function AnalyticsSection() {
  const metrics = [
    { label: 'Vault completion rate', value: 68, note: '68% avg across all users' },
    { label: 'Verified contacts per user', value: 62, note: '1.8 avg verifiers assigned' },
    { label: 'Messages finalized', value: 74, note: '74% of created messages finalized' },
    { label: 'Active within 90 days', value: 66, note: '66.5% of registered users' },
  ]

  const peak = Math.max(...MONTHLY_USERS)

  return (
    <div className="p-8 space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Analytics</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">Platform overview · Last 12 months</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: '3,847', icon: Bell },
          { label: 'Deliveries Sent', value: '142', icon: Send },
          { label: 'Verified Contacts', value: '4,201', icon: ShieldCheck },
          { label: 'Canvas Entries', value: '12,384', icon: Activity },
        ].map(({ label, value }) => (
          <div key={label} className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
            <p className="text-2xl font-semibold text-charcoal mb-1 tracking-tight">{value}</p>
            <p className="text-xs text-charcoal-soft">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-charcoal mb-1">New Users — Monthly</h3>
          <p className="text-xs text-charcoal-soft mb-6">Jul 2024 – Jun 2025</p>
          <div className="flex items-end gap-1.5 h-24 mb-2">
            {MONTHLY_USERS.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className="bg-sage rounded-t-sm hover:bg-forest transition-colors cursor-default"
                  style={{ height: `${(v / peak) * 100}%` }}
                  title={`${MONTHS[i]}: ${v * 12} new users`}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1.5">
            {MONTHS.map((m) => (
              <div key={m} className="flex-1 text-center">
                <span className="text-[9px] text-stone">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-white border border-stone-light rounded-2xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-charcoal mb-6">Engagement Metrics</h3>
          <div className="space-y-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-charcoal">{m.label}</span>
                  <span className="text-xs font-semibold text-charcoal">{m.value}%</span>
                </div>
                <div className="h-1.5 bg-stone-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest/70 rounded-full"
                    style={{ width: `${m.value}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone mt-1">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Settings Section ─────────────────────────────────────────────────────────

function SettingsSection() {
  const [giftSettings, setGiftSettings] = useState({
    freeCredits: '3',
    premiumExperiences: true,
    adminAllocation: '10',
    inventoryStatus: 'Available',
    manualApproval: false,
  })

  const [notifSettings, setNotifSettings] = useState({
    inactivityInterval: '30',
    annualReminder: true,
    verifierFrequency: 'Monthly',
    deliveryConfirmation: true,
    recipientTiming: 'Immediate',
  })

  const coreSettings = [
    {
      group: 'System',
      items: [
        { label: 'System Status', value: 'Operational', note: 'All services running normally' },
        { label: 'Encryption Standard', value: 'AES-256-GCM', note: 'End-to-end on all vaults' },
        { label: 'Daily Backup', value: '2:00 AM UTC', note: 'Last backup: Jun 8, 2025 02:00' },
        { label: 'Data Retention', value: 'Per user preference', note: 'Configurable per account' },
      ],
    },
    {
      group: 'Notifications',
      items: [
        { label: 'Email Alerts', value: 'Enabled', note: 'Admin and delivery notifications' },
        { label: 'SMS Verification', value: 'Enabled', note: 'Two-factor and verifier alerts' },
        { label: 'Inactivity Threshold', value: '18 months default', note: 'Per user configurable' },
      ],
    },
    {
      group: 'Access Control',
      items: [
        { label: 'Admin Roles', value: '3 roles configured', note: 'Admin, Moderator, Viewer' },
        { label: 'Audit Logging', value: 'Full', note: 'All admin actions are logged' },
        { label: 'Session Timeout', value: '30 minutes', note: 'Idle sessions auto-expire' },
      ],
    },
  ]

  const templates = [
    {
      name: 'Verification Email',
      desc: 'Sent when death verification is triggered',
      lastUpdated: 'Mar 15, 2025',
    },
    {
      name: 'Delivery Notification',
      desc: 'Notifies admin when delivery is processed',
      lastUpdated: 'Jan 8, 2025',
    },
    {
      name: 'Recipient Access Email',
      desc: 'Sent to recipients when content is unlocked',
      lastUpdated: 'Feb 22, 2025',
    },
    {
      name: 'Inactivity Reminder',
      desc: 'Reminder sent to users after inactivity period',
      lastUpdated: 'Apr 3, 2025',
    },
  ]

  return (
    <div className="p-8 space-y-7">
      <div>
        <h2 className="text-xl font-semibold text-charcoal">Settings</h2>
        <p className="text-sm text-charcoal-soft mt-0.5">Platform configuration overview</p>
      </div>

      {/* Existing core settings */}
      {coreSettings.map(({ group, items }) => (
        <div key={group}>
          <p className="text-xs font-semibold text-charcoal-soft uppercase tracking-widest mb-3">
            {group}
          </p>
          <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60 shadow-card">
            {items.map(({ label, value, note }) => (
              <div key={label} className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
                <div>
                  <p className="text-sm font-medium text-charcoal">{label}</p>
                  <p className="text-xs text-stone mt-0.5">{note}</p>
                </div>
                <span className="text-sm font-semibold text-charcoal-soft flex-shrink-0 ml-4">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Gift Allocation */}
      <div>
        <p className="text-xs font-semibold text-charcoal-soft uppercase tracking-widest mb-3">
          Gift Allocation
        </p>
        <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60 shadow-card">
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Free Gift Credits per User</p>
              <p className="text-xs text-stone mt-0.5">Default credits allocated on account creation</p>
            </div>
            <input
              type="number"
              min={0}
              max={99}
              value={giftSettings.freeCredits}
              onChange={(e) => setGiftSettings((s) => ({ ...s, freeCredits: e.target.value }))}
              className="w-16 text-sm font-semibold text-charcoal text-right bg-mist border border-stone-light rounded-lg px-2 py-1 focus:outline-none focus:border-forest/40 ml-4"
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Premium Gift Experiences</p>
              <p className="text-xs text-stone mt-0.5">Enable premium gift options for eligible users</p>
            </div>
            <Toggle
              enabled={giftSettings.premiumExperiences}
              onToggle={() => setGiftSettings((s) => ({ ...s, premiumExperiences: !s.premiumExperiences }))}
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Additional Admin Gift Allocation</p>
              <p className="text-xs text-stone mt-0.5">Extra credits an admin can grant manually</p>
            </div>
            <input
              type="number"
              min={0}
              max={99}
              value={giftSettings.adminAllocation}
              onChange={(e) => setGiftSettings((s) => ({ ...s, adminAllocation: e.target.value }))}
              className="w-16 text-sm font-semibold text-charcoal text-right bg-mist border border-stone-light rounded-lg px-2 py-1 focus:outline-none focus:border-forest/40 ml-4"
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Gift Inventory Status</p>
              <p className="text-xs text-stone mt-0.5">Current availability of gift credit pool</p>
            </div>
            <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sage-light/40 text-forest ml-4">
              {giftSettings.inventoryStatus}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Manual Gift Approval</p>
              <p className="text-xs text-stone mt-0.5">Require admin approval before gift is sent</p>
            </div>
            <Toggle
              enabled={giftSettings.manualApproval}
              onToggle={() => setGiftSettings((s) => ({ ...s, manualApproval: !s.manualApproval }))}
            />
          </div>
        </div>
      </div>

      {/* Notification Rules */}
      <div>
        <p className="text-xs font-semibold text-charcoal-soft uppercase tracking-widest mb-3">
          Notification Rules
        </p>
        <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60 shadow-card">
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Inactivity Reminder Interval</p>
              <p className="text-xs text-stone mt-0.5">Days before sending inactivity reminder</p>
            </div>
            <select
              value={notifSettings.inactivityInterval}
              onChange={(e) => setNotifSettings((s) => ({ ...s, inactivityInterval: e.target.value }))}
              className="text-sm font-semibold text-charcoal bg-mist border border-stone-light rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest/40 ml-4"
            >
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Annual Reminder Enabled</p>
              <p className="text-xs text-stone mt-0.5">Send yearly check-in reminder to all active users</p>
            </div>
            <Toggle
              enabled={notifSettings.annualReminder}
              onToggle={() => setNotifSettings((s) => ({ ...s, annualReminder: !s.annualReminder }))}
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Verifier Reminder Frequency</p>
              <p className="text-xs text-stone mt-0.5">How often to remind pending verifiers</p>
            </div>
            <select
              value={notifSettings.verifierFrequency}
              onChange={(e) => setNotifSettings((s) => ({ ...s, verifierFrequency: e.target.value }))}
              className="text-sm font-semibold text-charcoal bg-mist border border-stone-light rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest/40 ml-4"
            >
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Delivery Confirmation Alerts</p>
              <p className="text-xs text-stone mt-0.5">Notify admin when a delivery is confirmed</p>
            </div>
            <Toggle
              enabled={notifSettings.deliveryConfirmation}
              onToggle={() => setNotifSettings((s) => ({ ...s, deliveryConfirmation: !s.deliveryConfirmation }))}
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
            <div>
              <p className="text-sm font-medium text-charcoal">Recipient Notification Timing</p>
              <p className="text-xs text-stone mt-0.5">When to notify recipient after delivery trigger</p>
            </div>
            <select
              value={notifSettings.recipientTiming}
              onChange={(e) => setNotifSettings((s) => ({ ...s, recipientTiming: e.target.value }))}
              className="text-sm font-semibold text-charcoal bg-mist border border-stone-light rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest/40 ml-4"
            >
              <option value="Immediate">Immediate</option>
              <option value="24h delay">24h delay</option>
              <option value="48h delay">48h delay</option>
              <option value="72h delay">72h delay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message Templates */}
      <div>
        <p className="text-xs font-semibold text-charcoal-soft uppercase tracking-widest mb-3">
          Message Templates
        </p>
        <div className="bg-warm-white border border-stone-light rounded-2xl overflow-hidden divide-y divide-stone-light/60 shadow-card">
          {templates.map((t) => (
            <div key={t.name} className="flex items-center justify-between px-5 py-4 hover:bg-ivory/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-mist rounded-xl flex items-center justify-center flex-shrink-0 border border-stone-light">
                  <Mail className="w-3.5 h-3.5 text-charcoal-soft" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-stone mt-0.5 truncate">{t.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className="text-[10px] text-stone mr-1 whitespace-nowrap hidden lg:block">
                  Updated {t.lastUpdated}
                </span>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-soft bg-mist border border-stone-light px-2.5 py-1.5 rounded-lg hover:bg-ivory-dark transition-colors">
                  <Eye className="w-3 h-3" strokeWidth={1.75} />
                  Preview
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-forest bg-sage-light/40 px-2.5 py-1.5 rounded-lg hover:bg-sage-light/60 transition-colors">
                  <Pencil className="w-3 h-3" strokeWidth={1.75} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV: Array<{ key: Section; label: string; icon: LucideIcon }> = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'verification', label: 'Verification', icon: ShieldCheck },
  { key: 'deliveries', label: 'Deliveries', icon: Send },
  { key: 'moderation', label: 'Moderation', icon: Flag },
  { key: 'analytics', label: 'Analytics', icon: BarChart2 },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const ALERTS: Partial<Record<Section, number>> = {
  moderation: 2,
  verification: 4,
}

function Sidebar({
  active,
  onChange,
}: {
  active: Section
  onChange: (s: Section) => void
}) {
  return (
    <nav className="w-60 flex-shrink-0 bg-forest flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
            <AppIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">My Last Words</span>
        </div>
        <p className="text-[10px] text-white/40 mt-2 font-semibold uppercase tracking-wider">
          Admin Console
        </p>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
              active === key
                ? 'bg-white/15 text-white'
                : 'text-white/55 hover:bg-white/8 hover:text-white/85'
            }`}
          >
            <Icon
              className={`w-4 h-4 flex-shrink-0 ${active === key ? 'text-white' : 'text-white/55'}`}
              strokeWidth={active === key ? 2 : 1.75}
            />
            <span className="text-sm font-medium flex-1">{label}</span>
            {ALERTS[key] && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  active === key
                    ? 'bg-white/20 text-white'
                    : 'bg-gold/25 text-gold'
                }`}
              >
                {ALERTS[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <a
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/55 hover:bg-white/8 hover:text-white/85 transition-all duration-150"
        >
          <ChevronLeft className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="text-sm font-medium">Back to Site</span>
        </a>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/55 hover:bg-white/8 hover:text-white/85 transition-all duration-150">
          <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTION_COMPONENTS: Record<Section, React.ReactNode> = {
  dashboard: <DashboardSection />,
  users: <UsersSection />,
  verification: <VerificationSection />,
  deliveries: <DeliveriesSection />,
  moderation: <ModerationSection />,
  analytics: <AnalyticsSection />,
  settings: <SettingsSection />,
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')

  return (
    <div className="flex h-screen bg-ivory overflow-hidden">
      <Sidebar active={activeSection} onChange={setActiveSection} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-warm-white/95 backdrop-blur-sm border-b border-stone-light px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {NAV.find((n) => n.key === activeSection) && (() => {
              const item = NAV.find((n) => n.key === activeSection)!
              const Icon = item.icon
              return (
                <>
                  <Icon className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
                  <span className="text-sm font-semibold text-charcoal">{item.label}</span>
                </>
              )
            })()}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-sage rounded-full" />
              <span className="text-xs text-charcoal-soft">All systems operational</span>
            </div>
            <button className="relative w-8 h-8 bg-mist rounded-xl flex items-center justify-center hover:bg-ivory-dark transition-colors">
              <Bell className="w-4 h-4 text-charcoal-soft" strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-forest rounded-full" />
            </button>
            <div className="w-8 h-8 bg-forest rounded-xl flex items-center justify-center shadow-card">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {SECTION_COMPONENTS[activeSection]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
