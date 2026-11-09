import React, { useState } from 'react'
import PawIcon from './PawIcon'
import { addQuote } from '../lib/store'
import { X, CheckCircle2, ArrowRight } from 'lucide-react'

export default function QuoteModal({ isOpen, onClose }) {
  const [service, setService] = useState('air')
  const [petType, setPetType] = useState('dog')
  const [weight, setWeight] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    addQuote({ name, email, phone, service, petType, weight, from: fromCity, to: toCity, source: "Quote modal" })
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-teal-darkdeep/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-ink rounded-[32px] shadow-2xl overflow-hidden border border-[#eae3d9] my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-coral to-coral-dark p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-white text-coral grid place-items-center flex-none shadow-md">
              <PawIcon className="w-5 h-5 fill-coral" />
            </span>
            <div>
              <span className="block text-[12px] font-bold uppercase tracking-wider text-white/90">
                Custom Pet Travel Plan
              </span>
              <h3 className="text-[20px] font-heading font-black text-white leading-tight">
                Get a Free Pet Travel Quote
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal text-white mx-auto grid place-items-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-[24px] font-heading font-black text-ink">We have received your details!</h4>
              <p className="text-[15px] text-soft max-w-md mx-auto">
                One of our dedicated pet relocation coordinators will review flight routes, travel rules, and contact you at <b>{email || phone}</b> with a tailored itinerary and transparent pricing.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full bg-coral hover:bg-coral-dark text-white font-heading font-bold text-[14.5px] shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[14.5px] text-soft">
                Tell us about your pet's journey. We will calculate the safest route, vet requirements, and best pricing.
              </p>

              {/* Pet Type & Service Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                  <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Travel Mode</small>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-transparent border-0 outline-none font-heading font-bold text-[14.5px] text-ink pt-1 cursor-pointer"
                  >
                    <option value="air">Pet air cargo (Hold)</option>
                    <option value="cabin">In-cabin flight escort</option>
                    <option value="road">Door to door ground van</option>
                    <option value="intl">International relocation</option>
                  </select>
                </label>

                <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                  <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Pet Species & Weight</small>
                  <input
                    type="text"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. Dog (Golden Retriever), 28 kg"
                    className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                  />
                </label>
              </div>

              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                  <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Departure City / Airport</small>
                  <input
                    type="text"
                    required
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                  />
                </label>

                <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                  <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Destination City / Country</small>
                  <input
                    type="text"
                    required
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="e.g. Toronto, Canada"
                    className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                  />
                </label>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-[#f0eae0] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                    <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Your Name</small>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                    />
                  </label>

                  <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                    <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Phone Number</small>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                    />
                  </label>
                </div>

                <label className="block p-3 rounded-xl bg-cream border border-[#eae3d9]">
                  <small className="block text-[11px] font-bold uppercase tracking-wider text-soft">Email Address</small>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-transparent border-0 outline-none text-[14px] text-ink placeholder-soft/60 pt-1 font-semibold"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[16px] shadow-lg shadow-coral/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Request My Free Quote</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}

