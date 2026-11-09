import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { getDB, subscribe, statusMeta } from '../lib/store'

export function useDB() {
  const [db, setDB] = useState(getDB())
  useEffect(() => subscribe(setDB), [])
  return db
}

export const fmtDate = (d, withTime = false) =>
  new Date(d).toLocaleString(undefined, withTime
    ? { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }
    : { month: 'short', day: 'numeric', year: 'numeric' })

export const fmtMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)

export const timeAgo = (d) => {
  const s = (Date.now() - new Date(d).getTime()) / 1000
  if (s < 0) return 'upcoming'
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

const TONES = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  sky: 'bg-sky-50 text-sky-800 ring-sky-200',
  teal: 'bg-teal/10 text-teal-dark ring-teal/20',
  violet: 'bg-violet-50 text-violet-800 ring-violet-200',
  coral: 'bg-coral/10 text-coral-dark ring-coral/25',
  green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
}

export function Badge({ tone = 'slate', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold ring-1 ring-inset whitespace-nowrap ${TONES[tone]}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const m = statusMeta(status)
  return <Badge tone={m.tone}><span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />{m.label}</Badge>
}

export function Card({ className = '', children }) {
  return <div className={`bg-white rounded-2xl border border-[#ece6dc] shadow-[0_1px_2px_rgba(23,48,45,0.04)] ${className}`}>{children}</div>
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
      <div>
        <h3 className="font-heading font-extrabold text-[16px] text-ink">{title}</h3>
        {subtitle && <p className="text-[13px] text-soft mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  const v = {
    primary: 'bg-teal text-white hover:bg-teal-dark shadow-sm',
    coral: 'bg-coral text-white hover:bg-coral-dark shadow-sm',
    ghost: 'bg-transparent text-ink hover:bg-[#f3eee6]',
    outline: 'bg-white text-ink ring-1 ring-inset ring-[#e3ddd3] hover:bg-[#faf6f0]',
    danger: 'bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50',
  }[variant]
  const s = { sm: 'h-8 px-3 text-[13px]', md: 'h-10 px-4 text-[14px]', icon: 'h-9 w-9 justify-center' }[size]
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-xl font-heading font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 ${v} ${s} ${className}`}
      {...props}
    />
  )
}

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[12.5px] font-bold text-ink/80 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[12px] text-soft mt-1">{hint}</span>}
    </label>
  )
}

export const inputCls = 'w-full h-10 px-3 rounded-xl bg-white border border-[#e3ddd3] text-[14px] text-ink placeholder:text-soft/60 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition'

export function Modal({ open, onClose, title, subtitle, children, footer, wide }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-teal-darkdeep/60 backdrop-blur-sm overflow-y-auto" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} bg-white rounded-2xl shadow-2xl border border-[#ece6dc] my-6`}>
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[#f0eae1]">
          <div>
            <h3 className="font-heading font-black text-[18px] text-ink">{title}</h3>
            {subtitle && <p className="text-[13px] text-soft">{subtitle}</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></Button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-[#f0eae1] bg-[#fcfaf6] rounded-b-2xl flex flex-wrap justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="text-center py-14 px-6">
      <span className="mx-auto w-12 h-12 rounded-2xl bg-cream grid place-items-center ring-1 ring-[#ece6dc]">
        <Icon className="w-6 h-6 text-teal" />
      </span>
      <p className="mt-3 font-heading font-extrabold text-ink">{title}</p>
      {text && <p className="text-[13.5px] text-soft mt-1 max-w-sm mx-auto">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

let toastFn = () => {}
export const toast = (msg) => toastFn(msg)

export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    toastFn = (msg) => {
      const id = Math.random()
      setItems((x) => [...x, { id, msg }])
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 2800)
    }
  }, [])
  return (
    <div className="fixed bottom-4 right-4 z-[300] space-y-2">
      {items.map((t) => (
        <div key={t.id} className="px-4 py-3 rounded-xl bg-teal-darkdeep text-white text-[13.5px] font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-2">
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export function downloadCSV(filename, rows) {
  if (!rows.length) return
  const cols = Object.keys(rows[0])
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
