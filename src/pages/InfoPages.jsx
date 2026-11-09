import React from 'react'
import { Check, MapPin, Clock, Heart, ShieldCheck, Eye, Users, ArrowRight } from 'lucide-react'
import { PRICING, ADDONS, LOCATIONS, INDUSTRIES, TEAM } from './content'
import { PageHero, Container, SectionHead, WarmPanel, PrimaryButton, GhostButton, CtaBand, usePageTitle, Eyebrow } from './kit'

export function Pricing({ onOpenQuote }) {
  usePageTitle('Pricing')
  return (
    <>
      <PageHero eyebrow="Pricing" title="Clear prices, itemised quotes" photo="/assets/img/pt-air.jpg" crumbs={[['Pricing']]}
        text="Every journey is different, so every quote is built for your pet. These starting prices show what is included, with no hidden extras." />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {PRICING.map((p) => (
            <div key={p.name} className={`relative rounded-[32px] p-8 flex flex-col ${p.featured ? 'bg-teal-dark text-white shadow-2xl lg:-translate-y-3' : 'bg-white border border-[#eee5d9] shadow-sm'}`}>
              {p.featured && <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-coral text-white text-[12px] font-extrabold uppercase tracking-wider">Most booked</span>}
              <h3 className="font-heading font-black text-[22px]">{p.name}</h3>
              <p className={`mt-2 text-[14.5px] ${p.featured ? 'text-white/80' : 'text-soft'}`}>{p.blurb}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className={`text-[14px] font-bold pb-2 ${p.featured ? 'text-white/70' : 'text-soft'}`}>{p.unit}</span>
                <b className="font-heading font-black text-[48px] leading-none">${p.price.toLocaleString()}</b>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center flex-none ${p.featured ? 'bg-coral' : 'bg-teal/10 text-teal'}`}><Check className="w-3.5 h-3.5" /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={onOpenQuote}
                className={`mt-8 h-12 rounded-full font-heading font-extrabold text-[15px] transition-colors ${p.featured ? 'bg-coral hover:bg-coral-dark text-white' : 'bg-teal hover:bg-teal-dark text-white'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-soft">Prices in USD. Final price depends on pet size, route, season and airline. Your quote is itemised before you book.</p>
      </Container>

      <WarmPanel>
        <SectionHead eyebrow="Add-ons" title="Tailor the journey" text="Add exactly the care your pet needs. Every extra is listed on your quote." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADDONS.map(([n, p]) => (
            <div key={n} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 border border-[#eadfd1]">
              <span className="font-heading font-bold text-ink">{n}</span>
              <span className="text-coral-dark font-extrabold text-[14px] whitespace-nowrap">{p}</span>
            </div>
          ))}
        </div>
      </WarmPanel>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[['What affects the price?', 'Pet size and crate dimensions, distance, airline fees, destination import rules and the time of year.'],
            ['Deposits and payment', 'A deposit holds your dates. The balance is due before travel. Cards and bank transfers accepted.'],
            ['Price promise', 'The price on your accepted quote is what you pay, unless you change the plan or an airline changes its fees.']].map(([t, d]) => (
            <div key={t} className="rounded-[28px] bg-white border border-[#eee5d9] p-7">
              <h3 className="font-heading font-black text-[19px]">{t}</h3>
              <p className="mt-2 text-[15px] text-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} title="Get your exact price in one reply" />
    </>
  )
}

export function Locations({ onOpenQuote }) {
  usePageTitle('Locations')
  return (
    <>
      <PageHero eyebrow="Locations" title="Coordinators and partners where your pet travels" photo="/assets/img/pt-road.jpg" crumbs={[['Locations']]}
        text="Our hubs plan the journeys, and our vetted partner network covers airports, borders and boarding along the way." />
      <Container>
        <div className="space-y-12">
          {LOCATIONS.map((r) => (
            <div key={r.region}>
              <div className="flex items-end justify-between gap-4 mb-5">
                <h2 className="font-heading font-black text-[28px] md:text-[34px] text-ink">{r.region}</h2>
                <span className="text-[14px] font-bold text-soft">{r.hubs.length} locations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {r.hubs.map(([city, role]) => (
                  <div key={city} className="group rounded-[24px] bg-white border border-[#eee5d9] p-6 hover:border-coral/40 hover:shadow-md transition">
                    <span className="w-10 h-10 rounded-xl bg-coral/10 text-coral grid place-items-center"><MapPin className="w-5 h-5" /></span>
                    <b className="block mt-4 font-heading font-black text-[19px] text-ink">{city}</b>
                    <span className="block text-[14.5px] text-soft mt-1">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <WarmPanel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[['40+', 'countries served through partners'], ['24/7', 'coordinator cover on travel days'], ['1', 'coordinator for your whole journey']].map(([n, l]) => (
            <div key={l}>
              <b className="block font-fredoka text-[52px] text-teal-dark leading-none">{n}</b>
              <span className="block mt-2 text-[15px] font-semibold text-soft">{l}</span>
            </div>
          ))}
        </div>
      </WarmPanel>
      <CtaBand onOpenQuote={onOpenQuote} title="Don’t see your city?" text="We plan routes all over the world. Tell us where you are going and we will build the journey." />
    </>
  )
}

export function Industries({ onOpenQuote }) {
  usePageTitle('Who we help')
  return (
    <>
      <PageHero eyebrow="Who we help" title="Pet travel for every kind of move" photo="/assets/img/pt-reunion.jpg" crumbs={[['Who we help']]}
        text="Families, service members, relocating employees, breeders and clinics all trust PawPath with the animals they care about." />
      <Container>
        <div className="space-y-6">
          {INDUSTRIES.map((x, i) => (
            <div key={x.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[32px] overflow-hidden bg-white border border-[#eee5d9] shadow-sm ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="min-h-[260px] bg-cover bg-center" style={{ backgroundImage: `url('${x.photo}')` }} />
              <div className="p-8 md:p-10">
                <Eyebrow>{String(i + 1).padStart(2, '0')}</Eyebrow>
                <h2 className="mt-2 font-heading font-black text-[26px] md:text-[30px] text-ink">{x.name}</h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-soft">{x.text}</p>
                <ul className="mt-5 space-y-2.5">
                  {x.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                      <span className="w-5 h-5 rounded-full bg-teal/10 text-teal grid place-items-center"><Check className="w-3.5 h-3.5" /></span>{p}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={onOpenQuote} className="mt-6 inline-flex items-center gap-1.5 font-heading font-extrabold text-teal hover:text-coral">
                  Plan a move <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  )
}

export function About({ onOpenQuote }) {
  usePageTitle('About us')
  const values = [
    [Heart, 'Pets first', 'Every decision starts with what is calmest and safest for the animal.'],
    [Eye, 'Total transparency', 'Live tracking, photos and itemised quotes. You always know what is happening.'],
    [ShieldCheck, 'Do it properly', 'Approved crates, correct paperwork and vetted partners on every route.'],
    [Users, 'One person, start to finish', 'Your coordinator knows your pet by name and stays with you all the way.'],
  ]
  return (
    <>
      <PageHero eyebrow="About us" title="We started PawPath because moving a pet felt far too stressful" photo="/assets/img/pt-hero-m.jpg" crumbs={[['About us']]}
        text="PawPath brings planning, paperwork, transport and live updates together under one coordinator, so owners can stop worrying and pets can travel calmly." />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead eyebrow="Our story" title="Built by pet owners, for pet owners" />
            <div className="space-y-4 text-[16px] leading-relaxed text-soft -mt-4">
              <p>Our founder moved overseas with two dogs and a cat, and spent months chasing forms, airlines and agents who never talked to each other. The pets arrived safely, but the process was exhausting.</p>
              <p>PawPath is the service we wished we had: one coordinator, one plan, honest prices, and live updates from the people actually caring for your pet.</p>
              <p>Today our team and partner network help families, service members and relocating professionals move their pets across town and around the world.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[28px] min-h-[300px] bg-cover bg-center shadow-lg" style={{ backgroundImage: "url('/assets/img/pt-reunion.jpg')" }} />
            <div className="rounded-[28px] min-h-[300px] bg-cover bg-center shadow-lg mt-10" style={{ backgroundImage: "url('/assets/img/pt-vet.jpg')" }} />
          </div>
        </div>
      </Container>
      <WarmPanel>
        <SectionHead eyebrow="What we believe" title="Our values" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(([Icon, t, d]) => (
            <div key={t} className="rounded-[24px] bg-white p-6 border border-[#eadfd1]">
              <span className="w-11 h-11 rounded-2xl bg-coral text-white grid place-items-center"><Icon className="w-5 h-5" /></span>
              <h3 className="mt-4 font-heading font-black text-[18px]">{t}</h3>
              <p className="mt-2 text-[14.5px] text-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </WarmPanel>
      <Container>
        <SectionHead eyebrow="The team" title="The people looking after your pet" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <div key={m.name}>
              <div className="aspect-[4/5] rounded-[24px] bg-cover bg-center shadow-md" style={{ backgroundImage: `url('${m.photo}')` }} />
              <b className="block mt-3 font-heading font-black text-[17px]">{m.name}</b>
              <span className="text-[14px] text-soft">{m.role}</span>
            </div>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  )
}
