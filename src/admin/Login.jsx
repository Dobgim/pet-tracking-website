import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react'
import PawIcon from '../components/PawIcon'
import { login, DEFAULT_ADMIN, getDB } from '../lib/store'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const customised = !!getDB().auth

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const ok = await login(email, password)
    setBusy(false)
    if (ok) onSuccess()
    else setError('Incorrect email or password.')
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-cream font-sans text-ink">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden isolate">
        <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: "url('/assets/img/pt-reunion.jpg')" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-darkdeep/95 via-teal-dark/85 to-teal/60" />
        <a href="#/" className="flex items-center gap-2.5 w-fit">
          <span className="w-11 h-11 rounded-full bg-coral grid place-items-center shadow-md"><PawIcon className="w-5 h-5 fill-white" /></span>
          <span className="leading-none">
            <b className="block font-fredoka text-[24px]">PawPath</b>
            <small className="text-[11px] font-semibold text-teal-muted tracking-wide">Pet <em className="not-italic text-coral">Travel</em> · Operations</small>
          </span>
        </a>
        <div className="max-w-md">
          <h1 className="font-fredoka text-[44px] leading-[1.05]">Every journey,<br />one calm dashboard.</h1>
          <p className="mt-4 text-white/80 text-[16px]">
            Manage pet shipments, post live tracking updates, answer quote requests and keep owners in the loop.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[['Live', 'tracking updates'], ['24/7', 'coordinator access'], ['1', 'source of truth']].map(([a, b]) => (
              <div key={b} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
                <b className="block font-fredoka text-[24px] text-coral-light">{a}</b>
                <span className="text-[12.5px] text-white/75">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[12.5px] text-white/60">© 2026 PawPath Pet Travel · demo project, not a real service</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <span className="w-10 h-10 rounded-full bg-coral grid place-items-center"><PawIcon className="w-5 h-5 fill-white" /></span>
            <b className="font-fredoka text-[22px] text-teal-dark">PawPath Admin</b>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider text-coral">
            <ShieldCheck className="w-4 h-4" /> Staff area
          </span>
          <h2 className="mt-2 font-heading font-black text-[30px] leading-tight">Sign in to the admin dashboard</h2>
          <p className="mt-2 text-soft text-[14.5px]">Use your coordinator account to continue.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="block text-[13px] font-bold mb-1.5">Email</span>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
                <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rounded-xl bg-white border border-[#e3ddd3] focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15"
                  placeholder="you@pawpath.example" />
              </div>
            </label>
            <label className="block">
              <span className="block text-[13px] font-bold mb-1.5">Password</span>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
                <input type={show ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-11 rounded-xl bg-white border border-[#e3ddd3] focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-lg text-soft hover:bg-cream">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>

            {error && <p role="alert" className="text-[13.5px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{error}</p>}

            <button type="submit" disabled={busy}
              className="w-full h-12 rounded-xl bg-teal hover:bg-teal-dark text-white font-heading font-extrabold text-[15px] shadow-md transition-colors disabled:opacity-60">
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {!customised && (
            <div className="mt-6 rounded-xl border border-dashed border-coral/40 bg-coral/5 p-4 text-[13px]">
              <b className="block text-coral-dark mb-1">Demo credentials</b>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink/85">
                <span>Email: <code className="font-bold">{DEFAULT_ADMIN.email}</code></span>
                <span>Password: <code className="font-bold">{DEFAULT_ADMIN.password}</code></span>
              </div>
              <button type="button" onClick={() => { setEmail(DEFAULT_ADMIN.email); setPassword(DEFAULT_ADMIN.password) }}
                className="mt-2 text-teal font-bold hover:underline">Fill in for me</button>
            </div>
          )}

          <a href="#/" className="mt-8 inline-flex items-center gap-1 text-[13.5px] font-bold text-soft hover:text-teal">
            Back to website <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
