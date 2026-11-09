import React from 'react'
import { ArrowRight, Search, ClipboardList, Bell, Camera } from 'lucide-react'
import { SERVICES } from './content'
import { PageHero, Container, SectionHead, WarmPanel, CtaBand, usePageTitle, TrackInline, PrimaryButton, GhostButton } from './kit'
import HowItWorks from '../components/HowItWorks'
import PromiseBar from '../components/PromiseBar'
import TrackingShowcase from '../components/TrackingShowcase'

export function ServicesIndex({ onOpenQuote }) {
  usePageTitle('Services')
  return (
    <>
      <PageHero eyebrow="Services" title="Every part of your pet’s journey, in one place" photo="/assets/img/pt-air.jpg" crumbs={[['Services']]}
        text="Book a single service or let one coordinator handle the whole trip, from paperwork and crates to flights, vans and the final handover.">
        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={onOpenQuote}>Get a quote</PrimaryButton>
          <GhostButton href="/pricing">See pricing</GhostButton>
        </div>
      </PageHero>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <a key={s.slug} href={`/services/${s.slug}`}
              className={`group relative rounded-[28px] overflow-hidden flex items-end p-7 text-white isolate shadow-md hover:shadow-xl transition-shadow ${i === 0 ? 'lg:col-span-2 min-h-[360px]' : 'min-h-[300px]'}`}>
              <div className="absolute inset-0 -z-20 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${s.photo}')` }} />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/95 via-teal-darkdeep/40 to-transparent" />
              <div>
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-coral-light">From ${s.from}</span>
                <b className="block mt-1 font-heading font-black text-[24px] leading-tight">{s.name}</b>
                <p className="mt-2 text-[14.5px] text-white/85 max-w-md">{s.intro}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-heading font-extrabold text-[14.5px] text-white group-hover:text-coral-light">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} title="Not sure what you need?" text="Tell us about your pet and trip. We will recommend the right mix of services." />
    </>
  )
}

export function HowItWorksPage({ onOpenQuote }) {
  usePageTitle('How it works')
  return (
    <>
      <PageHero eyebrow="How it works" title="Four calm steps from quote to reunion" photo="/assets/img/pt-hero-m.jpg" crumbs={[['How it works']]}
        text="One coordinator plans everything, our handlers care for your pet along the way, and you follow every step live.">
        <PrimaryButton onClick={onOpenQuote}>Start with a free quote</PrimaryButton>
      </PageHero>
      <div className="pt-10"><HowItWorks /></div>
      <PromiseBar />
      <Container>
        <SectionHead eyebrow="Behind the scenes" title="What your coordinator does for you" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[[ClipboardList, 'Builds the plan', 'Route, dates, crate size, vet visits and every document, laid out in a timeline you can follow.'],
            [Bell, 'Keeps you informed', 'You hear from us at every handover, rest stop and flight leg, plus whenever you ask.'],
            [Camera, 'Shares the journey', 'Handlers post notes and photos to your live tracking page so you can see your pet is okay.']].map(([Icon, t, d]) => (
            <div key={t} className="rounded-[28px] bg-white border border-[#eee5d9] p-7 shadow-sm">
              <span className="w-11 h-11 rounded-2xl bg-coral text-white grid place-items-center"><Icon className="w-5 h-5" /></span>
              <h3 className="mt-4 font-heading font-black text-[20px]">{t}</h3>
              <p className="mt-2 text-[15px] text-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  )
}

export function TrackPage({ onOpenTrack, onOpenQuote }) {
  usePageTitle('Track your pet')
  return (
    <>
      <PageHero eyebrow="Live pet tracking" title="Track your pet’s journey" photo="/assets/img/pt-reunion.jpg" crumbs={[['Track']]}
        text="Enter the tracking number from your booking email to see every step, location and handler update in real time.">
        <TrackInline onOpenTrack={onOpenTrack} />
        <p className="mt-3 text-[13.5px] text-white/70">Try the sample code <button type="button" onClick={() => onOpenTrack('PPT-84SW-AR8D-QK3Z')} className="font-bold text-coral-light hover:underline">PPT-84SW-AR8D-QK3Z</button></p>
      </PageHero>
      <TrackingShowcase onOpenTrack={onOpenTrack} />
      <WarmPanel>
        <SectionHead eyebrow="Where to find your code" title="Your tracking number" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[['In your booking email', 'Sent as soon as your journey is confirmed, in the format PPT-XXXX-XXXX-XXXX.'],
            ['From your coordinator', 'Ask your coordinator by phone, WhatsApp or email at any time.'],
            ['Shared with family', 'Anyone with the code can follow along, so share it with whoever is waiting at home.']].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-white border border-[#eadfd1] p-6">
              <Search className="w-5 h-5 text-coral" />
              <b className="block mt-3 font-heading font-black text-[17px]">{t}</b>
              <p className="mt-1.5 text-[14.5px] text-soft">{d}</p>
            </div>
          ))}
        </div>
      </WarmPanel>
      <CtaBand onOpenQuote={onOpenQuote} title="Not booked yet?" text="Every PawPath journey comes with live tracking and photo updates as standard." />
    </>
  )
}
