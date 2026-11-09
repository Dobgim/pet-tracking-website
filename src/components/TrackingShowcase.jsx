import React, { useState } from 'react'
import PawIcon from './PawIcon'
import { Plane, CheckCircle2, Clock, Sparkles } from 'lucide-react'

export default function TrackingShowcase({ onOpenTrack }) {
  const [activeStop, setActiveStop] = useState(2) // 0: LHR, 1: DXB, 2: In Flight SIN->MEL, 3: MEL

  const stops = [
    { code: 'LHR', name: 'London Heathrow', status: 'Departed', x: 120, y: 130 },
    { code: 'DXB', name: 'Dubai', status: 'Completed', x: 280, y: 190 },
    { code: 'SIN', name: 'Singapore', status: 'Completed', x: 440, y: 280 },
    { code: 'MEL', name: 'Melbourne', status: 'Destination', x: 580, y: 390 },
  ]

  return (
    <section 
      id="track" 
      className="py-24 md:py-32 my-12 text-white relative isolate overflow-hidden"
      style={{
        background: `radial-gradient(1200px 600px at 85% 0%, #14968b 0%, transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(249, 115, 98, 0.35) 0%, transparent 60%), linear-gradient(160deg, #0b4f4a, #08332f)`
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral-light2">
              Live pet tracking
            </span>
            <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-heading font-black text-white leading-[1.06] tracking-tight mt-2 max-w-[640px]">
              Know where your pet is, and how they are doing.
            </h2>
          </div>
          <p className="text-[16px] md:text-[17px] text-white/80 max-w-[420px] font-sans leading-relaxed">
            Every journey gets its own tracking page: a live map, your pet's profile and care updates with photos from the people looking after them.{' '}
            <button 
              type="button" 
              onClick={() => onOpenTrack('PPT-84SW-AR8D-QK3Z')}
              className="text-coral-light underline hover:text-white font-bold inline"
            >
              See an example
            </button>
          </p>
        </div>

        {/* 3-Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr_330px] gap-6 items-stretch">
          
          {/* 1. Left Profile Card (.hx-prof) */}
          <div className="rounded-[26px] glass-panel p-6 flex flex-col justify-between border border-white/20">
            <div>
              {/* Pet Photo */}
              <div 
                className="w-full h-[210px] rounded-2xl bg-cover bg-[center_30%] mb-5 shadow-lg border border-white/20"
                style={{ backgroundImage: `url('/assets/img/pt-reunion.jpg')` }}
              />

              <div className="flex items-baseline justify-between">
                <h3 className="text-[28px] font-heading font-black text-white leading-none">Max</h3>
                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-coral-light bg-coral/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-coral" /> Verified
                </span>
              </div>
              <p className="text-[14.5px] text-white/80 font-sans mt-1">
                German Shepherd, 6 yrs, 38 kg
              </p>
            </div>

            {/* Key Value Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <small className="block text-[11.5px] uppercase tracking-wider text-white/70 font-semibold">Tracking</small>
                <b className="font-heading font-extrabold text-[12.5px] tracking-tight text-coral-light block mt-0.5 truncate">
                  PPT-84SW-AR8D-QK3Z
                </b>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <small className="block text-[11.5px] uppercase tracking-wider text-white/70 font-semibold">Travel</small>
                <b className="font-heading font-extrabold text-[14px] text-white block mt-0.5">Pet air cargo</b>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <small className="block text-[11.5px] uppercase tracking-wider text-white/70 font-semibold">Crate</small>
                <b className="font-heading font-extrabold text-[14px] text-white block mt-0.5">Extra large</b>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <small className="block text-[11.5px] uppercase tracking-wider text-white/70 font-semibold">Health papers</small>
                <b className="font-heading font-extrabold text-[14px] text-white block mt-0.5 text-[#7cf3c2]">Endorsed</b>
              </div>
            </div>
          </div>

          {/* 2. Center Route Map (.hx-map) */}
          <div className="relative rounded-[26px] overflow-hidden min-h-[500px] bg-[#0c2a27] border border-white/20 shadow-2xl flex flex-col justify-between">
            {/* Map Canvas Background with stylized world terrain */}
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <svg className="w-full h-full object-cover" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#082925" />
                    <stop offset="100%" stopColor="#0d3f39" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ocean and Grid Lines */}
                <rect width="700" height="500" fill="url(#mapGradient)" />
                <path d="M 0,100 L 700,100 M 0,200 L 700,200 M 0,300 L 700,300 M 0,400 L 700,400" stroke="#134e48" strokeWidth="0.5" strokeDasharray="4 4" />
                <path d="M 150,0 L 150,500 M 300,0 L 300,500 M 450,0 L 450,500 M 600,0 L 600,500" stroke="#134e48" strokeWidth="0.5" strokeDasharray="4 4" />

                {/* Stylized Continents Outlines */}
                <path 
                  d="M 60,60 Q 140,80 180,140 Q 120,180 80,120 Z" 
                  fill="#0f514b" opacity="0.6" 
                />
                <path 
                  d="M 220,110 Q 320,120 380,180 Q 330,260 250,220 Z" 
                  fill="#0f514b" opacity="0.6" 
                />
                <path 
                  d="M 390,200 Q 480,240 500,320 Q 420,340 370,250 Z" 
                  fill="#0f514b" opacity="0.6" 
                />
                <path 
                  d="M 510,340 Q 640,320 650,440 Q 560,460 520,380 Z" 
                  fill="#0f514b" opacity="0.7" 
                />

                {/* Completed Flight Route (London -> Dubai -> Singapore -> Current In Flight) */}
                <path
                  d="M 120,130 Q 200,150 280,190 T 440,280 Q 490,320 505,335"
                  fill="none"
                  stroke="#e85a48"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Upcoming Route (Dashed from plane to Melbourne) */}
                <path
                  d="M 505,335 Q 535,360 580,390"
                  fill="none"
                  stroke="#9ccfc7"
                  strokeWidth="3.5"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />

                {/* Stops Markers */}
                {/* LHR */}
                <circle cx="120" cy="130" r="16" fill="#e85a48" stroke="#fff" strokeWidth="2.5" />
                <text x="120" y="134" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="Nunito" textAnchor="middle">LHR</text>

                {/* DXB */}
                <circle cx="280" cy="190" r="16" fill="#e85a48" stroke="#fff" strokeWidth="2.5" />
                <text x="280" y="194" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="Nunito" textAnchor="middle">DXB</text>

                {/* SIN */}
                <circle cx="440" cy="280" r="16" fill="#e85a48" stroke="#fff" strokeWidth="2.5" />
                <text x="440" y="284" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="Nunito" textAnchor="middle">SIN</text>

                {/* MEL */}
                <circle cx="580" cy="390" r="16" fill="#0f766e" stroke="#fff" strokeWidth="2.5" />
                <text x="580" y="394" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="Nunito" textAnchor="middle">MEL</text>

                {/* Moving Airplane Marker at (505, 335) */}
                <g transform="translate(505, 335) rotate(42)">
                  <circle cx="0" cy="0" r="18" fill="#e85a48" stroke="#ffffff" strokeWidth="2" filter="url(#glow)" />
                  <path 
                    d="M 0,-10 L 3,-2 L 10,2 L 10,4 L 3,3 L 3,7 L 6,10 L 6,11 L 0,9 L -6,11 L -6,10 L -3,7 L -3,3 L -10,4 L -10,2 L -3,-2 Z"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            </div>

            {/* Top Chip: Live Update */}
            <div className="relative z-10 p-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-darkdeep/85 border border-white/20 text-[13px] font-heading font-extrabold text-white shadow-lg backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7cf3c2] animate-pulse-glow"></span>
                <span>Updated 4 min ago</span>
              </span>
            </div>

            {/* Bottom Floating Bar (.hx-bar) */}
            <div className="relative z-10 m-4 rounded-2xl bg-teal-darkdeep/90 border border-white/20 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Progress Line: 64% */}
              <div className="h-1.5 w-full bg-white/10">
                <div className="h-full bg-coral-light2 transition-all duration-500" style={{ width: '64%' }}></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-white/10 text-left">
                <div className="p-3.5 sm:px-5">
                  <small className="block text-[11.5px] uppercase tracking-wider text-white/60 font-semibold">Now</small>
                  <b className="font-heading font-extrabold text-[15px] sm:text-[16px] text-white flex items-center gap-1.5 mt-0.5">
                    <Plane className="w-4 h-4 text-coral" /> In flight
                  </b>
                </div>

                <div className="p-3.5 sm:px-5">
                  <small className="block text-[11.5px] uppercase tracking-wider text-white/60 font-semibold">Next stop</small>
                  <b className="font-heading font-extrabold text-[15px] sm:text-[16px] text-white mt-0.5 block">
                    Melbourne (MEL)
                  </b>
                </div>

                <div className="hidden sm:block p-3.5 sm:px-5">
                  <small className="block text-[11.5px] uppercase tracking-wider text-white/60 font-semibold">Lands</small>
                  <b className="font-heading font-extrabold text-[15px] sm:text-[16px] text-coral-light mt-0.5 block">
                    Tue, Nov 4, 6:35 AM
                  </b>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Updates Feed (.hx-feed) */}
          <div className="rounded-[26px] glass-panel p-6 flex flex-col justify-between border border-white/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <h4 className="font-heading font-black text-[19px] text-white">Care updates</h4>
                <span className="text-[12px] font-sans font-bold text-coral-light bg-coral/20 px-2.5 py-1 rounded-full">
                  4 today
                </span>
              </div>

              {/* Feed items */}
              <div className="space-y-4 mt-5">
                {/* Event 1 */}
                <div className="flex gap-3.5 items-start">
                  <div 
                    className="w-14 h-14 rounded-2xl bg-cover bg-center flex-none border-2 border-white/30 shadow-md"
                    style={{ backgroundImage: `url('/assets/img/pt-air.jpg')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <b className="block font-heading font-black text-[15px] text-white leading-tight">
                      Crate checked in Singapore
                    </b>
                    <p className="text-[13px] text-white/80 leading-snug mt-1 font-sans">
                      Max is calm and on the final leg to Melbourne.
                    </p>
                    <time className="block text-[11.5px] text-white/60 mt-1 font-medium">8:10 AM</time>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-3.5 items-start pt-4 border-t border-white/10">
                  <div 
                    className="w-14 h-14 rounded-2xl bg-cover bg-center flex-none border-2 border-white/30 shadow-md"
                    style={{ backgroundImage: `url('/assets/img/pt-boarding.jpg')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <b className="block font-heading font-black text-[15px] text-white leading-tight">
                      Layover care in Dubai
                    </b>
                    <p className="text-[13px] text-white/80 leading-snug mt-1 font-sans">
                      Walked, fed a light meal and given fresh water.
                    </p>
                    <time className="block text-[11.5px] text-white/60 mt-1 font-medium">Yesterday, 6:25 PM</time>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-3.5 items-start pt-4 border-t border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-white/20 flex-none grid place-items-center shadow-md">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <b className="block font-heading font-black text-[15px] text-white leading-tight">
                      Boarded in London
                    </b>
                    <p className="text-[13px] text-white/80 leading-snug mt-1 font-sans">
                      Heated, pressurised hold. Water bowls clipped in.
                    </p>
                    <time className="block text-[11.5px] text-white/60 mt-1 font-medium">Oct 21, 4:08 PM</time>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenTrack('PPT-84SW-AR8D-QK3Z')}
              className="mt-6 w-full py-3 rounded-xl bg-coral/90 hover:bg-coral text-white font-heading font-extrabold text-[14px] text-center shadow-md transition-colors"
            >
              Open Full Tracker
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

