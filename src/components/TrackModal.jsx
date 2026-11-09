import React from 'react'
import PawIcon from './PawIcon'
import { X, CheckCircle2, Plane, Clock, ShieldCheck, MapPin } from 'lucide-react'

export default function TrackModal({ isOpen, onClose, trackingCode }) {
  if (!isOpen) return null

  const code = trackingCode || 'PPT-84SW-AR8D-QK3Z'
  const isBella = code.includes('Bella') || code.includes('7KQ4')

  const pet = isBella ? {
    name: 'Bella',
    breed: 'Golden Retriever, 4 yrs',
    from: 'Austin, TX',
    to: 'Toronto, Canada',
    status: 'In transit',
    carrier: 'PawPath Climate Van + Air Cargo',
    eta: 'Fri, 10:40 AM',
    progress: 72,
    photo: '/assets/img/pt-hero-m.jpg',
  } : {
    name: 'Max',
    breed: 'German Shepherd, 6 yrs (38 kg)',
    from: 'London (LHR), UK',
    to: 'Melbourne (MEL), Australia',
    status: 'In flight',
    carrier: 'Pet Air Cargo Express (Direct)',
    eta: 'Tue, Nov 4, 6:35 AM',
    progress: 64,
    photo: '/assets/img/pt-reunion.jpg',
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-teal-darkdeep/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-ink rounded-[32px] shadow-2xl overflow-hidden border border-[#eae3d9] my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-dark to-teal p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-coral grid place-items-center flex-none shadow-md">
              <PawIcon className="w-5 h-5 fill-white" />
            </span>
            <div>
              <span className="block text-[12px] font-bold uppercase tracking-wider text-coral-light">
                Live Pet Tracking
              </span>
              <h3 className="text-[20px] font-heading font-black text-white leading-tight">
                {pet.name}'s Journey Tracker
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Top Pet Card Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-cream border border-[#e3ddd3]">
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md flex-none"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-[22px] font-heading font-black text-ink">{pet.name}</h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7cf3c2]/30 text-teal-dark text-[12px] font-extrabold uppercase">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse-glow"></span>
                  {pet.status}
                </span>
              </div>
              <p className="text-[13.5px] text-soft mt-0.5">{pet.breed}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[13px] text-ink/80 mt-2">
                <span><b>From:</b> {pet.from}</span>
                <span><b>To:</b> {pet.to}</span>
                <span><b>Tracking:</b> <code className="bg-white px-2 py-0.5 rounded text-coral font-bold">{code}</code></span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[13.5px] font-heading font-extrabold">
              <span className="text-teal flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-coral" /> Flight In Transit
              </span>
              <span className="text-soft">Estimated Arrival: <b>{pet.eta}</b></span>
            </div>
            <div className="h-3 w-full bg-[#f0e8dc] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-coral to-coral-dark rounded-full transition-all duration-500" 
                style={{ width: `${pet.progress}%` }}
              />
            </div>
          </div>

          {/* Detailed Timeline Steps */}
          <div className="space-y-4 pt-2">
            <h5 className="font-heading font-bold text-[16px] text-ink">Journey Timeline</h5>
            
            <div className="space-y-4 border-l-2 border-teal/20 pl-4 ml-2">
              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-teal grid place-items-center text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <b className="block text-[14.5px] font-heading font-bold text-ink">Health inspection & crate fitting</b>
                <p className="text-[13px] text-soft">Vet confirmed certificates endorsed. USDA/IATA crate certified.</p>
                <time className="text-[11.5px] text-soft/80">Completed</time>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-teal grid place-items-center text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <b className="block text-[14.5px] font-heading font-bold text-ink">Departed origin with handler escort</b>
                <p className="text-[13px] text-soft">Boarded in climate-controlled pet travel cargo bay.</p>
                <time className="text-[11.5px] text-soft/80">Completed</time>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-coral grid place-items-center text-white animate-pulse">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <b className="block text-[14.5px] font-heading font-bold text-coral-dark">In Transit / Current Leg</b>
                <p className="text-[13px] text-soft">
                  Handler photo logged: pet is calm, hydrated, and resting comfortably.
                </p>
                <time className="text-[11.5px] text-coral font-bold">In progress now</time>
              </div>

              <div className="relative opacity-60">
                <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-gray-300 grid place-items-center">
                  <MapPin className="w-3 h-3 text-white" />
                </span>
                <b className="block text-[14.5px] font-heading font-bold text-ink">Final destination door delivery & happy reunion</b>
                <p className="text-[13px] text-soft">Hand-delivered to owner's door with travel logbook.</p>
                <time className="text-[11.5px] text-soft/80">Scheduled for {pet.eta}</time>
              </div>
            </div>
          </div>

          {/* Photo Gallery from Handlers */}
          <div className="pt-2">
            <h5 className="font-heading font-bold text-[16px] text-ink mb-3">Live Photos from Handlers</h5>
            <div className="grid grid-cols-3 gap-3">
              <div 
                className="h-24 sm:h-28 rounded-xl bg-cover bg-center border border-[#e3ddd3] shadow-sm"
                style={{ backgroundImage: `url('/assets/img/pt-air.jpg')` }}
              />
              <div 
                className="h-24 sm:h-28 rounded-xl bg-cover bg-center border border-[#e3ddd3] shadow-sm"
                style={{ backgroundImage: `url('/assets/img/pt-boarding.jpg')` }}
              />
              <div 
                className="h-24 sm:h-28 rounded-xl bg-cover bg-center border border-[#e3ddd3] shadow-sm"
                style={{ backgroundImage: `url('/assets/img/pt-reunion.jpg')` }}
              />
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#f8f5f0] border-t border-[#eae3d9] flex justify-between items-center text-[13px]">
          <span className="text-soft">Need immediate update? Call coordinator: <b>+1 555 010 0199</b></span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-teal hover:bg-teal-dark text-white font-heading font-bold text-[13.5px] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

