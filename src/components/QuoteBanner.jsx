import React, { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { addQuote } from '../lib/store'

export default function QuoteBanner() {
  const [service, setService] = useState('air')
  const [weight, setWeight] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addQuote({ name: "Website visitor", email: "", phone: "", service, petType: "", weight, from: fromCity, to: toCity, source: "Homepage quote banner" })
    setSubmitted(true)
  }

  return (
    <section id="quote" className="mx-3 sm:mx-6 mb-8">
      <div 
        className="relative rounded-[32px] md:rounded-[48px] overflow-hidden py-20 md:py-28 px-4 sm:px-8 lg:px-14 isolate text-white shadow-2xl"
      >
        {/* Background photo */}
        <div 
          className="absolute inset-0 -z-20 bg-cover bg-[center_40%]"
          style={{ backgroundImage: `url('/assets/img/pt-reunion.jpg')` }}
          aria-hidden="true"
        />

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 -z-10 bg-gradient-to-t md:bg-gradient-to-r from-teal-darkdeep/90 via-teal-darkdeep/80 to-teal-darkdeep/40"
          aria-hidden="true"
        />

        {/* Form aligned to the right on desktop */}
        <div className="max-w-[1240px] mx-auto flex justify-end">
          <div className="w-full max-w-[520px] p-6 sm:p-9 rounded-[28px] glass-card border border-white/40 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-teal-mid text-white mx-auto grid place-items-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-[26px] font-heading font-black text-white">Quote Request Received!</h3>
                <p className="text-[15px] text-white/90">
                  Thank you! Our travel coordinator is preparing a custom plan and will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-heading font-bold text-[14px]"
                >
                  Submit another quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="block font-heading font-extrabold text-[13px] tracking-[0.08em] uppercase text-coral-light">
                  Free pet travel quote
                </span>

                <h2 className="text-[28px] sm:text-[36px] font-heading font-black text-white leading-tight">
                  Let's plan your pet's trip.
                </h2>

                <p className="text-[14.5px] text-white/90 font-sans leading-relaxed">
                  Tell us a little about your pet. A coordinator replies with a plan and a price, usually within a few hours.
                </p>

                {/* Row 1: Service & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="block p-3 px-4 rounded-2xl bg-white/20 border border-white/30 text-white cursor-pointer focus-within:border-coral transition-colors">
                    <small className="block text-[11px] font-extrabold uppercase tracking-wider text-white/80">Travel by</small>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-white font-heading font-bold text-[15px] pt-1 cursor-pointer [&>option]:text-ink"
                    >
                      <option value="air">Pet air cargo</option>
                      <option value="cabin">Pet air cabin</option>
                      <option value="road">By road</option>
                    </select>
                  </label>

                  <label className="block p-3 px-4 rounded-2xl bg-white/20 border border-white/30 text-white cursor-text focus-within:border-coral transition-colors">
                    <small className="block text-[11px] font-extrabold uppercase tracking-wider text-white/80">Pet weight (kg)</small>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full bg-transparent border-0 outline-none text-white placeholder-white/60 font-sans font-semibold text-[15px] pt-1"
                    />
                  </label>
                </div>

                {/* Row 2: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block p-3 px-4 rounded-2xl bg-white/20 border border-white/30 text-white cursor-text focus-within:border-coral transition-colors">
                    <small className="block text-[11px] font-extrabold uppercase tracking-wider text-white/80">From</small>
                    <input
                      type="text"
                      required
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="City"
                      className="w-full bg-transparent border-0 outline-none text-white placeholder-white/60 font-sans font-semibold text-[15px] pt-1"
                    />
                  </label>

                  <label className="block p-3 px-4 rounded-2xl bg-white/20 border border-white/30 text-white cursor-text focus-within:border-coral transition-colors">
                    <small className="block text-[11px] font-extrabold uppercase tracking-wider text-white/80">To</small>
                    <input
                      type="text"
                      required
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="City"
                      className="w-full bg-transparent border-0 outline-none text-white placeholder-white/60 font-sans font-semibold text-[15px] pt-1"
                    />
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2.5 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[16px] py-4 rounded-full shadow-xl shadow-coral/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>Get my quote</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

