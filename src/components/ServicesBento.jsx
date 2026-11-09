import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function ServicesBento({ onOpenQuote }) {
  return (
    <section id="services" className="py-20 md:py-28 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral">
            What we do
          </span>
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-heading font-black text-ink leading-[1.06] tracking-tight mt-2 max-w-[620px]">
            Every part of your pet's journey, in caring hands.
          </h2>
        </div>
        <p className="text-[16px] md:text-[17px] text-soft max-w-[420px] font-sans leading-relaxed">
          Pick one service or let us plan the whole move. Either way, your pet travels with people who love animals.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[270px]">
        
        {/* Card 1: Pet Air Travel (span 7 x 2 rows) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-7 md:row-span-2 rounded-[26px] overflow-hidden p-4 flex items-end cursor-pointer isolate shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          {/* Background image with zoom */}
          <div 
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/img/pt-air.jpg')` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/85 via-teal-darkdeep/25 to-transparent" />

          {/* Frosted Bottom Pill */}
          <div className="w-full p-5 rounded-2xl glass-bento flex items-end justify-between gap-4 border border-white/35">
            <div>
              <h3 className="text-[23px] sm:text-[25px] font-heading font-black text-white leading-tight">
                Pet air travel
              </h3>
              <p className="text-[14px] text-white/90 font-sans mt-1">
                In cabin or pet air cargo, on the calmest flight for your pet.
              </p>
            </div>
            <span className="w-11 h-11 rounded-full bg-white text-teal flex-none grid place-items-center shadow-md group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Card 2: Door to Door by Road (span 5) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-5 rounded-[26px] overflow-hidden p-4 flex items-end cursor-pointer isolate shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div 
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/img/pt-road.jpg')` }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/85 via-teal-darkdeep/30 to-transparent" />

          <div className="w-full p-4 sm:p-5 rounded-2xl glass-bento flex items-end justify-between gap-4 border border-white/35">
            <div>
              <h3 className="text-[21px] sm:text-[23px] font-heading font-black text-white leading-tight">
                Door to door by road
              </h3>
              <p className="text-[14px] text-white/90 font-sans mt-1">
                Climate-controlled pet vans
              </p>
            </div>
            <span className="w-10 h-10 rounded-full bg-white text-teal flex-none grid place-items-center shadow-md group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Card 3: International Pet Relocation (span 5, Solid Teal Gradient) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-5 rounded-[26px] overflow-hidden p-6 flex flex-col justify-between cursor-pointer isolate bg-gradient-to-br from-teal to-teal-darkdeep shadow-lg hover:shadow-2xl transition-all duration-300 text-white"
        >
          <div>
            <span className="block font-heading font-black text-[22px] sm:text-[24px] leading-tight text-white">
              Moving abroad with your pet
            </span>
            <span className="block text-[14.5px] text-white/85 mt-2 font-sans">
              One coordinator for papers, flights and arrival abroad.
            </span>
          </div>

          <div className="w-full p-3.5 sm:p-4 rounded-2xl glass-bento flex items-center justify-between gap-4 border border-white/20 mt-4">
            <h3 className="text-[19px] sm:text-[21px] font-heading font-black text-white">
              International pet relocation
            </h3>
            <span className="w-10 h-10 rounded-full bg-white text-teal flex-none grid place-items-center shadow-md group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Card 4: Vet & Travel Paperwork (span 4) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-4 rounded-[26px] overflow-hidden p-4 flex items-end cursor-pointer isolate shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div 
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/img/pt-vet.jpg')` }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/85 via-teal-darkdeep/30 to-transparent" />

          <div className="w-full p-4 rounded-2xl glass-bento flex items-end justify-between gap-3 border border-white/35">
            <div>
              <h3 className="text-[19px] font-heading font-black text-white leading-tight">
                Vet & paperwork
              </h3>
              <p className="text-[13px] text-white/90 font-sans mt-0.5">
                Health certificates & permits
              </p>
            </div>
            <span className="w-9 h-9 rounded-full bg-white text-teal flex-none grid place-items-center shadow-md group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Card 5: Boarding & Layover Care (span 4) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-4 rounded-[26px] overflow-hidden p-4 flex items-end cursor-pointer isolate shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div 
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/img/pt-boarding.jpg')` }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/85 via-teal-darkdeep/30 to-transparent" />

          <div className="w-full p-4 rounded-2xl glass-bento flex items-end justify-between gap-3 border border-white/35">
            <div>
              <h3 className="text-[19px] font-heading font-black text-white leading-tight">
                Boarding & layover
              </h3>
              <p className="text-[13px] text-white/90 font-sans mt-0.5">
                Safe stays between legs
              </p>
            </div>
            <span className="w-9 h-9 rounded-full bg-white text-teal flex-none grid place-items-center shadow-md group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Card 6: Get a Free Quote (span 4, Coral Gradient) */}
        <div 
          onClick={onOpenQuote}
          className="group relative md:col-span-4 rounded-[26px] overflow-hidden p-6 flex flex-col justify-between cursor-pointer isolate bg-gradient-to-br from-[#fb8b7c] to-coral-dark shadow-lg hover:shadow-2xl transition-all duration-300 text-white"
        >
          <div>
            <span className="block font-heading font-black text-[22px] leading-tight text-white">
              Not sure where to start?
            </span>
            <span className="block text-[14px] text-white/90 mt-2 font-sans">
              Tell us about your pet and your dates. We will reply with a plan and a price.
            </span>
          </div>

          <div className="w-full p-3.5 rounded-2xl glass-bento flex items-center justify-between gap-3 border border-white/30 mt-4">
            <h3 className="text-[19px] font-heading font-black text-white">
              Get a free quote
            </h3>
            <span className="w-9 h-9 rounded-full bg-white text-coral flex-none grid place-items-center shadow-md group-hover:bg-teal group-hover:text-white transition-colors duration-200">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

