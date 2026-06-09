'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppIcon } from '@/app/components/AppIcon'
import { Eye, EyeOff, Smartphone, Shield, ChevronLeft } from 'lucide-react'

interface LoginFormProps {
  roleBadge: string
  email: string
  ctaLabel: string
  redirectTo: string
}

export function LoginForm({ roleBadge, email, ctaLabel, redirectTo }: LoginFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push(redirectTo), 700)
  }

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-stone-light">
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-forest rounded-lg flex items-center justify-center flex-shrink-0">
              <AppIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-charcoal tracking-tight">My Last Words</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-charcoal-soft hover:text-charcoal transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </nav>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px]">

          {/* Login card */}
          <div
            className="bg-warm-white border border-stone-light rounded-2xl p-8"
            style={{ boxShadow: '0 4px 12px rgba(15,23,42,0.06), 0 16px 48px rgba(15,23,42,0.09)' }}
          >
            {/* Brand header */}
            <div className="text-center mb-7">
              <div className="w-12 h-12 bg-forest/8 border border-forest/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AppIcon className="w-6 h-6 text-forest" />
              </div>
              <h1 className="text-lg font-semibold text-charcoal mb-2">Sign in to continue</h1>
              <span className="inline-flex items-center gap-1.5 bg-lavender-light border border-lavender-deep/30 text-forest text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-forest rounded-full flex-shrink-0" />
                {roleBadge}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue={email}
                  readOnly
                  className="w-full px-3.5 py-2.5 bg-ivory border border-stone-light rounded-xl text-sm text-charcoal focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/8 transition-all duration-200 cursor-default select-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-charcoal">Password</label>
                  <button
                    type="button"
                    className="text-xs text-forest font-medium hover:text-forest-light transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="demo·demo"
                    className="w-full px-3.5 py-2.5 pr-10 bg-ivory border border-stone-light rounded-xl text-sm text-charcoal focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/8 transition-all duration-200"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal-soft transition-colors"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                      : <Eye className="w-4 h-4" strokeWidth={1.75} />
                    }
                  </button>
                </div>
              </div>

              {/* Remember device */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-0.5">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-light accent-forest flex-shrink-0"
                />
                <span className="text-xs text-charcoal-soft">Remember this device</span>
              </label>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forest text-white py-3 rounded-xl text-sm font-semibold hover:bg-forest-light transition-colors duration-200 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 1px 3px rgba(91,75,115,0.18), 0 4px 12px rgba(91,75,115,0.14)' }}
              >
                {loading ? 'Signing in…' : ctaLabel}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-stone-light" />
              <span className="text-xs text-stone font-medium whitespace-nowrap">or continue with</span>
              <div className="flex-1 h-px bg-stone-light" />
            </div>

            {/* SSO buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"

                className="flex items-center justify-center gap-2 border border-stone-light bg-ivory rounded-xl px-4 py-2.5 text-xs font-medium text-charcoal-soft hover:bg-mist transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"

                className="flex items-center justify-center gap-2 border border-stone-light bg-ivory rounded-xl px-4 py-2.5 text-xs font-medium text-charcoal-soft hover:bg-mist transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                  <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Mobile sign-in */}
            <button
              type="button"
          
              className="w-full mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-soft hover:text-charcoal transition-colors duration-200 py-2"
            >
              <Smartphone className="w-3.5 h-3.5" strokeWidth={1.75} />
              Sign in with mobile number
            </button>
          </div>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            <Shield className="w-3.5 h-3.5 text-stone" strokeWidth={1.75} />
            <p className="text-xs text-stone">256-bit encrypted · SOC 2 compliant · Demo environment</p>
          </div>
        </div>
      </div>


    </main>
  )
}
