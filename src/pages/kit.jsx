import React, { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Search } from 'lucide-react'

export function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} | PawPath Pet Travel` : 'PawPath Pet Travel | Pet Transport and Live Pet Tracking' }, [title])
}

export function PageHero({ eyebrow, title, text, photo = '/assets/img/pt-hero-m.jpg', crumbs = [], children }) {
  return (
    <section className="relative text-white overflow-hidden isolate">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url('${photo}')` }} aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-darkdeep/95 via-teal-darkdeep/80 to-teal-darkdeep/40" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/70 via-transparent to-teal-darkdeep/40" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-[140px] md:pt-[170px] pb-16 md:pb-24">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/70 mb-5">
            <a href="/" className="hover:text-white">Home</a>
            {crumbs.map(([label, href]) => (
              <React.Fragment key={label}>
                <span aria-hidden="true">/</span>
                {href ? <a href={href} className="hover:text-white">{label}</a> : <span className="text-white">{label}</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        {eyebrow && <span className="inline-block text-coral-light font-heading font-extrabold text-[13px] md:text-[14px] tracking-[0.08em] uppercase">{eyebrow}</span>}
        <h1 className="mt-3 text-[36px] sm:text-[48px] md:text-[60px] font-heading font-black leading-[1.04] tracking-[-0.02em] max-w-[820px]">{title}</h1>
        {text && <p className="mt-5 text-[17px] md:text-[19px] leading-relaxed text-white/90 max-w-[620px]">{text}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}

export function Eyebrow({ children }) {
  return <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral">{children}</span>
}

export function SectionHead({ eyebrow, title, text, center }) {
  return (
    <div className={`mb-10 md:mb-12 ${center ? 'text-center mx-auto' : ''} max-w-[720px]`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[30px] sm:text-[38px] md:text-[46px] font-heading font-black text-ink leading-[1.08] tracking-tight mt-2">{title}</h2>
      {text && <p className="mt-4 text-[16.5px] leading-relaxed text-soft">{text}</p>}
    </div>
  )
}

export function Container({ className = '', children, id }) {
  return <section id={id} className={`max-w-[1240px] mx-auto px-4 sm:px-6 py-16 md:py-24 ${className}`}>{children}</section>
}

export function WarmPanel({ children, className = '' }) {
  return (
    <section className={`mx-3 sm:mx-6 my-6 ${className}`}>
      <div className="bg-[#f6e9dc] rounded-[32px] md:rounded-[48px] py-16 md:py-20 px-6 md:px-12 max-w-[1240px] mx-auto">{children}</div>
    </section>
  )
}

export function PrimaryButton({ children, onClick, href }) {
  const cls = 'inline-flex items-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[15px] px-6 py-3.5 rounded-full shadow-lg shadow-coral/30 hover:-translate-y-0.5 transition-all'
  if (href) return <a href={href} className={cls}>{children} <ArrowRight className="w-4 h-4" /></a>
  return <button type="button" onClick={onClick} className={cls}>{children} <ArrowRight className="w-4 h-4" /></button>
}

export function GhostButton({ children, onClick, href }) {
  const cls = 'inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-heading font-extrabold text-[15px] px-6 py-3.5 rounded-full backdrop-blur transition-colors'
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type="button" onClick={onClick} className={cls}>{children}</button>
}

export function CtaBand({ onOpenQuote, title = 'Ready to plan your pet’s journey?', text = 'Tell us where you are going. A coordinator will reply with a clear, itemised quote.' }) {
  return (
    <section className="mx-3 sm:mx-6 my-10">
      <div className="relative max-w-[1240px] mx-auto rounded-[32px] md:rounded-[48px] overflow-hidden isolate text-white px-6 md:px-14 py-14 md:py-20">
        <div className="absolute inset-0 -z-20 bg-cover bg-[center_40%]" style={{ backgroundImage: "url('/assets/img/pt-reunion.jpg')" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-darkdeep/95 via-teal-dark/85 to-teal/50" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-[30px] md:text-[42px] font-heading font-black leading-[1.08]">{title}</h2>
            <p className="mt-3 text-white/85 text-[16.5px]">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton onClick={onOpenQuote}>Get a free quote</PrimaryButton>
            <GhostButton href="/contact">Talk to a coordinator</GhostButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-[#eadfd1] border-y border-[#eadfd1]">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 py-5 text-left font-heading font-extrabold text-[16.5px] text-ink hover:text-teal">
            {q}
            <ChevronDown className={`w-5 h-5 flex-none text-coral transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <p className="pb-5 -mt-1 text-[15px] leading-relaxed text-soft max-w-[760px]">{a}</p>}
        </div>
      ))}
    </div>
  )
}

export function TrackInline({ onOpenTrack, dark }) {
  const [code, setCode] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); onOpenTrack(code.trim() || 'PPT-84SW-AR8D-QK3Z') }}
      className={`flex max-w-[520px] rounded-full p-1.5 pl-5 ${dark ? 'bg-white border border-[#e3ddd3]' : 'bg-white/12 bg-white/10 border border-white/25 backdrop-blur'}`}>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Tracking number, e.g. PPT-84SW-AR8D-QK3Z"
        className={`flex-1 min-w-0 bg-transparent outline-none text-[14.5px] ${dark ? 'text-ink placeholder:text-soft/70' : 'text-white placeholder:text-white/60'}`} />
      <button type="submit" className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[14px] px-5 py-2.5 rounded-full">
        <Search className="w-4 h-4" /> Track
      </button>
    </form>
  )
}
