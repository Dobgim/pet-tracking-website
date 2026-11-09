import React, { useEffect, useState } from 'react'
import PawIcon from './PawIcon'
import { X, CheckCircle2, Plane, Clock, MapPin, SearchX, AlertTriangle } from 'lucide-react'
import { findShipment, statusMeta, subscribe, getDB } from '../lib/store'

const fmt = (d) => new Date(d).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

export default function TrackModal({ isOpen, onClose, trackingCode }) {
  const [, force] = useState(0)
  useEffect(() => subscribe(() => force((n) => n + 1)), [])

  if (!isOpen) return null

  const code = (trackingCode || 'PPT-84SW-AR8D-QK3Z').trim().toUpperCase()
  const s = findShipment(code)
  const phone = getDB().settings.supportPhone

  const header = (title) => (
    <div className="bg-gradient-to-r from-teal-dark to-teal p-6 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-coral grid place-items-center flex-none shadow-md">
          <PawIcon className="w-5 h-5 fill-white" />
        </span>
        <div>
          <span className="block text-[12px] font-bold uppercase tracking-wider text-coral-light">Live Pet Tracking</span>
          <h3 className="text-[20px] font-heading font-black text-white leading-tight">{title}</h3>
        </div>
      </div>
      <button type="button" onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
  )

  const footer = (
    <div className="p-4 px-6 bg-[#f8f5f0] border-t border-[#eae3d9] flex flex-wrap gap-3 justify-between items-center text-[13px]">
      <span className="text-soft">Need immediate update? Call coordinator: <b>{phone}</b></span>
      <button type="button" onClick={onClose} className="px-5 py-2 rounded-full bg-teal hover:bg-teal-dark text-white font-heading font-bold text-[13.5px] transition-colors">
        Close
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-teal-darkdeep/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-ink rounded-[32px] shadow-2xl overflow-hidden border border-[#eae3d9] my-8 animate-in zoom-in-95 duration-200">
        {!s ? (
          <>
            {header('Tracking number not found')}
            <div className="p-8 text-center space-y-3">
              <span className="mx-auto w-14 h-14 rounded-full bg-coral/10 grid place-items-center">
                <SearchX className="w-7 h-7 text-coral" />
              </span>
              <p className="font-heading font-black text-[18px]">We couldn't find <code className="text-coral">{code}</code></p>
              <p className="text-soft text-[14px] max-w-md mx-auto">
                Check the tracking number in your booking email (format <b>PPT-XXXX-XXXX-XXXX</b>) or contact your coordinator.
              </p>
            </div>
            {footer}
          </>
        ) : (
          <>
            {header(`${s.pet.name}'s Journey Tracker`)}
            <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-cream border border-[#e3ddd3]">
                <img src={s.pet.photo} alt={s.pet.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md flex-none" />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-[22px] font-heading font-black text-ink">{s.pet.name}</h4>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-extrabold uppercase ${s.status === 'on_hold' ? 'bg-red-100 text-red-700' : 'bg-[#7cf3c2]/30 text-teal-dark'}`}>
                      <span className={`w-2 h-2 rounded-full ${s.status === 'on_hold' ? 'bg-red-500' : 'bg-teal animate-pulse-glow'}`}></span>
                      {statusMeta(s.status).label}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-soft mt-0.5">{[s.pet.breed, s.pet.age, s.pet.weight].filter(Boolean).join(', ')}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[13px] text-ink/80 mt-2">
                    <span><b>From:</b> {s.from}</span>
                    <span><b>To:</b> {s.to}</span>
                    <span><b>Tracking:</b> <code className="bg-white px-2 py-0.5 rounded text-coral font-bold">{s.code}</code></span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 justify-between items-center text-[13.5px] font-heading font-extrabold">
                  <span className="text-teal flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-coral" /> {s.carrier || 'PawPath coordinator'}
                  </span>
                  <span className="text-soft">{s.status === 'delivered' ? 'Delivered' : 'Estimated arrival'}: <b>{fmt(s.eta)}</b></span>
                </div>
                <div className="h-3 w-full bg-[#f0e8dc] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-coral to-coral-dark rounded-full transition-all duration-500" style={{ width: `${s.progress}%` }} />
                </div>
              </div>

              {s.status === 'on_hold' && (
                <div className="flex gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-[13.5px] text-red-800">
                  <AlertTriangle className="w-5 h-5 flex-none" />
                  <span>This journey is temporarily on hold. Your coordinator will contact you with next steps.</span>
                </div>
              )}

              <div className="space-y-4 pt-2">
                <h5 className="font-heading font-bold text-[16px] text-ink">Journey Timeline</h5>
                <div className="space-y-4 border-l-2 border-teal/20 pl-4 ml-2">
                  {s.events.map((e, i) => {
                    const latest = i === s.events.length - 1 && s.status !== 'delivered'
                    return (
                      <div key={e.id} className="relative">
                        <span className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full grid place-items-center text-white ${latest ? 'bg-coral animate-pulse' : 'bg-teal'}`}>
                          {latest ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                        <b className={`block text-[14.5px] font-heading font-bold ${latest ? 'text-coral-dark' : 'text-ink'}`}>{statusMeta(e.status).label}</b>
                        <p className="text-[13px] text-soft">{e.note}</p>
                        <time className={`text-[11.5px] ${latest ? 'text-coral font-bold' : 'text-soft/80'}`}>
                          {fmt(e.at)}{e.location ? ` · ${e.location}` : ''}
                        </time>
                      </div>
                    )
                  })}
                  {s.status !== 'delivered' && (
                    <div className="relative opacity-60">
                      <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-gray-300 grid place-items-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </span>
                      <b className="block text-[14.5px] font-heading font-bold text-ink">Door delivery & happy reunion</b>
                      <p className="text-[13px] text-soft">Hand-delivered to {s.to} with travel logbook.</p>
                      <time className="text-[11.5px] text-soft/80">Scheduled for {fmt(s.eta)}</time>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <h5 className="font-heading font-bold text-[16px] text-ink mb-3">Live Photos from Handlers</h5>
                <div className="grid grid-cols-3 gap-3">
                  {['/assets/img/pt-air.jpg', '/assets/img/pt-boarding.jpg', s.pet.photo].map((src, i) => (
                    <div key={i} className="h-24 sm:h-28 rounded-xl bg-cover bg-center border border-[#e3ddd3] shadow-sm" style={{ backgroundImage: `url('${src}')` }} />
                  ))}
                </div>
              </div>
            </div>
            {footer}
          </>
        )}
      </div>
    </div>
  )
}
