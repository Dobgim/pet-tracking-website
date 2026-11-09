import React, { useState, useEffect, useRef } from 'react'
import { Phone, MessageSquare, Mail, Headphones, X } from 'lucide-react'

export default function FloatingContact({ onOpenTrack }) {
  const [open, setOpen] = useState(false)
  const [trackCode, setTrackCode] = useState('')
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleTrack = (e) => {
    e.preventDefault()
    if (trackCode.trim()) {
      onOpenTrack(trackCode.trim())
      setOpen(false)
      setTrackCode('')
    }
  }

  return (
    <div ref={menuRef} className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[70] font-sans">
      {/* Popover Panel */}
      {open && (
        <div className="absolute right-0 bottom-[72px] w-[290px] sm:w-[310px] p-3 rounded-2xl glass-fab animate-in fade-in zoom-in-95 duration-150 text-ink shadow-2xl">
          {/* Header */}
          <div className="p-2 pb-2.5 border-b border-[#f6f0e8]">
            <b className="block text-[14.5px] font-heading font-black text-ink">How can we help?</b>
            <small className="block text-[12px] text-soft font-medium mt-0.5">
              Mon to Fri 8:00 to 18:00, Sat 9:00 to 14:00
            </small>
          </div>

          {/* Links */}
          <div className="py-1 space-y-0.5">
            <a
              href="tel:+15550100199"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fff8f1] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal/10 grid place-items-center text-teal group-hover:bg-coral group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[13.5px] font-bold text-ink">Call us</span>
                <small className="block text-[12px] text-soft">+1 555 010 0199</small>
              </div>
            </a>

            <a
              href="https://wa.me/15550100199"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fff8f1] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal/10 grid place-items-center text-teal group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[13.5px] font-bold text-ink">WhatsApp</span>
                <small className="block text-[12px] text-soft">Chat with us now</small>
              </div>
            </a>

            <a
              href="mailto:hello@pawpath.example"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#fff8f1] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal/10 grid place-items-center text-teal group-hover:bg-coral group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[13.5px] font-bold text-ink">Email us</span>
                <small className="block text-[12px] text-soft truncate max-w-[180px]">hello@pawpath.example</small>
              </div>
            </a>
          </div>

          {/* Mini Track Form */}
          <form onSubmit={handleTrack} className="flex gap-1.5 pt-2 mt-1 border-t border-[#f6f0e8]">
            <input
              type="text"
              required
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              placeholder="Tracking number"
              className="flex-1 min-w-0 bg-white border border-[#eae3d9] rounded-xl px-3 py-2 text-[13.5px] text-ink focus:outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-teal hover:bg-teal-dark text-white font-heading font-bold text-[13px] rounded-xl transition-colors"
            >
              Track
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-coral hover:bg-coral-dark text-white shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact us"
      >
        {open ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Headphones className="w-6 h-6 stroke-[2.2]" />
        )}
      </button>
    </div>
  )
}

