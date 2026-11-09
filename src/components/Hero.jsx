import React, { useState } from 'react'
import PawIcon from './PawIcon'
import { ArrowRight, Search } from 'lucide-react'

export default function Hero({ onOpenQuote, onOpenTrack }) {
  const [trackCode, setTrackCode] = useState('')

  const handleTrackSubmit = (e) => {
    e.preventDefault()
    if (trackCode.trim()) {
      onOpenTrack(trackCode.trim())
    } else {
      onOpenTrack('PPT-84SW-AR8D-QK3Z')
    }
  }

  return (
    <section id="top" className="relative min-h-[760px] lg:min-h-screen flex items-center text-white overflow-hidden isolate">
      {/* Background Image with layered gradient overlays */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-[center_35%] md:bg-[70%_40%]"
        style={{ backgroundImage: `url('/assets/img/pt-hero-m.jpg')` }}
        aria-hidden="true"
      />
      
      {/* Dark Teal Gradient Vignette Matching Original */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-darkdeep/95 via-teal-darkdeep/75 to-transparent md:via-teal-darkdeep/60"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/70 via-transparent to-teal-darkdeep/30"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-[140px] md:pt-[160px] pb-[90px] md:pb-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-end">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="space-y-6 max-w-2xl">
            <span className="inline-block text-coral-light font-heading font-extrabold text-[13px] md:text-[14px] tracking-[0.08em] uppercase">
              Pet transport, door to door
            </span>

            <h1 className="text-[40px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-heading font-black leading-[1.02] tracking-[-0.025em] text-white">
              Safe journeys for <em className="text-coral-light not-italic">every pet</em>, tracked all the way home.
            </h1>

            <p className="text-[17px] md:text-[19px] leading-relaxed text-white/95 max-w-[530px] font-sans">
              By air or by road, at home or abroad. One coordinator plans the trip, our handlers care for your pet at every stop, and you follow along with live updates and photos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[15px] md:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full shadow-lg shadow-coral/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Plan my pet's trip</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/35 backdrop-blur-md font-heading font-extrabold text-[15px] md:text-[16px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full transition-all duration-200"
              >
                How it works
              </a>
            </div>

            {/* Hero Tracking Search Bar */}
            <form
              onSubmit={handleTrackSubmit}
              className="flex items-center gap-2 max-w-[540px] p-2 pl-5 rounded-full bg-white/15 border border-white/35 backdrop-blur-xl shadow-xl mt-4"
            >
              <Search className="w-5 h-5 text-white/80 flex-none" />
              <input
                type="text"
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                placeholder="Enter tracking number, e.g. PPT-7KQ4-M29X-48HD"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white placeholder-white/70 font-sans font-semibold text-[14.5px] sm:text-[15.5px]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[14px] sm:text-[15px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-md transition-all duration-200 flex-none"
              >
                <PawIcon className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Track my pet</span>
                <span className="sm:hidden">Track</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Pet Card (.hx-pc) */}
          <div className="w-full max-w-[420px] lg:justify-self-end relative">
            <div
              onClick={() => onOpenTrack('PPT-84SW-AR8D-QK3Z')}
              className="relative p-6 rounded-[28px] glass-card text-white cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
              role="button"
              tabIndex={0}
              aria-label="See an example pet tracking page"
            >
              {/* Floating Toast Notification */}
              <div className="absolute -top-6 -left-4 sm:-left-8 hidden sm:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#fff8f1]/95 text-ink font-heading font-extrabold text-[13px] shadow-2xl animate-float-slow border border-white">
                <span className="w-7 h-7 rounded-full bg-teal grid place-items-center flex-none">
                  <PawIcon className="w-3.5 h-3.5 fill-white" />
                </span>
                <span>New photo of Bella, 2 min ago</span>
              </div>

              {/* Card Header: Avatar, Name & Live Pill */}
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-14 h-14 rounded-full border-2 border-white/85 bg-cover bg-[center_30%] flex-none shadow-md"
                  style={{ backgroundImage: `url('/assets/img/pt-hero-m.jpg')` }}
                />
                <div className="flex-1 min-w-0">
                  <b className="block text-[20px] font-heading font-black leading-tight text-white">Bella</b>
                  <span className="block text-[13px] text-white/85 font-sans font-medium">Golden Retriever, 4 yrs</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-[12px] font-heading font-extrabold uppercase tracking-wider text-white">
                  <span className="w-2 h-2 rounded-full bg-[#7cf3c2] animate-pulse-glow"></span>
                  <span>Live</span>
                </div>
              </div>

              {/* Route Indicator with SVG */}
              <div className="my-5 space-y-2">
                <div className="flex justify-between items-center text-[14.5px] font-heading font-extrabold">
                  <div>
                    <span>Austin</span>
                    <small className="block text-[12px] font-sans font-medium text-white/80">Texas, USA</small>
                  </div>
                  <div className="text-right">
                    <span>Toronto</span>
                    <small className="block text-[12px] font-sans font-medium text-white/80">Ontario, Canada</small>
                  </div>
                </div>

                <div className="py-1">
                  <svg className="w-full h-7 overflow-visible" viewBox="0 0 340 30" preserveAspectRatio="none">
                    {/* Background track line */}
                    <line x1="6" y1="15" x2="334" y2="15" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeDasharray="3 8" strokeLinecap="round" />
                    {/* Completed line */}
                    <line x1="6" y1="15" x2="218" y2="15" stroke="#ffc9b9" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Origin point */}
                    <circle cx="6" cy="15" r="5" fill="#fff" />
                    {/* Destination point */}
                    <circle cx="334" cy="15" r="5" fill="none" stroke="#fff" strokeWidth="2.5" />
                    {/* Current Position Marker with Paw */}
                    <circle cx="218" cy="15" r="14" fill="#f97362" className="shadow-lg" />
                    <g transform="translate(208, 5) scale(0.85)">
                      <PawIcon className="w-5 h-5 fill-white" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex justify-between items-center p-3.5 px-4 rounded-2xl bg-white/20 border border-white/25">
                <div>
                  <span className="block text-[12px] text-white/80 font-medium">Now</span>
                  <b className="block text-[15.5px] font-heading font-black text-white">In pet care, Chicago</b>
                </div>
                <div className="text-right">
                  <span className="block text-[12px] text-white/80 font-medium">Arrives</span>
                  <b className="block text-[15.5px] font-heading font-black text-white">Fri, 10:40 AM</b>
                </div>
              </div>

              {/* Latest Handler Update */}
              <div className="flex items-center gap-3 mt-3.5 pt-1 text-[13.5px]">
                <div
                  className="w-13 h-13 w-[52px] h-[52px] rounded-xl border border-white/70 bg-cover bg-[center_60%] flex-none shadow-sm"
                  style={{ backgroundImage: `url('/assets/img/pt-air.jpg')` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-2 leading-snug">
                    <b className="font-bold text-white">Walked, fed and resting.</b> Bella is relaxed and ready for her flight to Toronto.
                  </p>
                  <span className="block text-[11.5px] text-white/70 mt-0.5">Handler update, 11:42 AM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

