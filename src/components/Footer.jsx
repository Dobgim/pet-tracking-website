import React, { useState } from 'react'
import PawIcon from './PawIcon'
import { addSubscriber } from '../lib/store'
import { ArrowUpRight, Phone, Mail } from 'lucide-react'

export default function Footer({ onOpenQuote }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      addSubscriber(email)
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="contact" className="bg-[#17302d] text-white rounded-t-[36px] md:rounded-t-[48px] overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-8">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-10 md:gap-8 pb-14">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-5">
            <a href="/" className="flex items-center gap-2.5 text-white no-underline group select-none">
              <span className="w-11 h-11 rounded-full bg-coral grid place-items-center flex-none shadow-md">
                <PawIcon className="w-6 h-6 fill-white" />
              </span>
              <span className="flex flex-col justify-center leading-none">
                <b className="font-fredoka text-[24px] tracking-tight text-white leading-none">PawPath</b>
                <small className="font-semibold text-[11.5px] text-[#9ccfc7] mt-1 tracking-wide">
                  Pet <em className="not-italic text-coral">Travel</em>
                </small>
              </span>
            </a>

            <p className="text-[14px] text-white/80 max-w-[280px] leading-relaxed font-sans">
              Safe pet travel by air and road, with one coordinator from first quote to happy reunion.
            </p>

            <div className="space-y-2 text-[14px] pt-1">
              <div>
                <span className="text-white/60 text-[12px] block uppercase tracking-wider font-semibold">Phone</span>
                <a href="tel:+15550100199" className="font-heading font-bold text-white hover:text-coral transition-colors inline-flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-coral" /> +1 555 010 0199
                </a>
              </div>
              <div className="pt-1">
                <span className="text-white/60 text-[12px] block uppercase tracking-wider font-semibold">Email</span>
                <a href="mailto:hello@pawpath.example" className="font-heading font-bold text-white hover:text-coral transition-colors inline-flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-coral" /> hello@pawpath.example
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="font-heading font-bold text-[16px] text-white mb-4 tracking-normal">
              Company
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/80 font-sans">
              <li><a href="/how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="/industries" className="hover:text-white transition-colors">Who we help</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/locations" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/reunions" className="hover:text-white transition-colors">Happy reunions</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div>
            <h4 className="font-heading font-bold text-[16px] text-white mb-4 tracking-normal">
              Services
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/80 font-sans">
              <li><a href="/services/air" className="hover:text-white transition-colors">Pet air travel</a></li>
              <li><a href="/services/road" className="hover:text-white transition-colors">Door to door by road</a></li>
              <li><a href="/services/international" className="hover:text-white transition-colors">International pet relocation</a></li>
              <li><a href="/services/paperwork" className="hover:text-white transition-colors">Vet and travel paperwork</a></li>
              <li><a href="/services/boarding" className="hover:text-white transition-colors">Boarding and layover care</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-[16px] text-white mb-4 tracking-normal">
              Join our newsletter
            </h4>
            
            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-[14px] text-[#7cf3c2]">
                Thanks for subscribing! You will receive our monthly travel digest.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex rounded-xl bg-white/10 border border-white/20 p-1.5 pl-4 focus-within:border-coral transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white placeholder-white/60 text-[14px] font-sans"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-lg bg-coral hover:bg-coral-dark text-white grid place-items-center flex-none transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            )}

            <p className="text-[13px] text-white/70 mt-3 font-sans">
              Pet travel tips and rule changes, once a month.
            </p>
          </div>

        </div>

        {/* Legal & Operating Hours Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/70">
          <span>&copy; 2026 PawPath Pet Travel (demo project, not a real service). All rights reserved.</span>

          <div className="flex items-center gap-6">
            <a href="/contact" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="/contact" className="hover:text-white transition-colors">Terms of service</a>
            <a href="#/admin" className="hover:text-white transition-colors">Staff login</a>
          </div>

          <span className="text-white/60">
            Mon to Fri 8:00 to 18:00, Sat 9:00 to 14:00
          </span>
        </div>

      </div>

      {/* Masked Silhouette Footer Accent */}
      <div 
        className="h-32 md:h-44 bg-cover bg-[center_70%] opacity-30 grayscale pointer-events-none"
        style={{
          backgroundImage: `url('/assets/img/pt-air.jpg')`,
          maskImage: 'linear-gradient(180deg, transparent, #000 70%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 70%)',
        }}
        aria-hidden="true"
      />
    </footer>
  )
}

