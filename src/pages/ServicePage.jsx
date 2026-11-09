import React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { SERVICES } from './content'
import { PageHero, Container, SectionHead, WarmPanel, PrimaryButton, GhostButton, CtaBand, Accordion, usePageTitle, Eyebrow } from './kit'

export default function ServicePage({ slug, onOpenQuote }) {
  const s = SERVICES.find((x) => x.slug === slug)
  usePageTitle(s.name)
  const others = SERVICES.filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero eyebrow={s.name} title={s.title} text={s.intro} photo={s.photo} crumbs={[['Services', '/#services'], [s.name]]}>
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryButton onClick={onOpenQuote}>Get a quote</PrimaryButton>
          <GhostButton href="/pricing">See pricing</GhostButton>
          <span className="text-white/80 text-[14px] font-semibold ml-1">From <b className="text-white text-[18px]">${s.from}</b></span>
        </div>
      </PageHero>

      <Container>
        <SectionHead eyebrow="What’s included" title={`Everything ${s.name.toLowerCase()} needs, handled`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {s.points.map(([t, d], i) => (
            <div key={t} className="rounded-[28px] bg-white border border-[#eee5d9] p-7 shadow-sm hover:shadow-md transition-shadow">
              <span className="w-11 h-11 rounded-2xl bg-coral/10 text-coral-dark grid place-items-center font-heading font-black">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-heading font-black text-[20px] text-ink">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-soft">{d}</p>
            </div>
          ))}
        </div>
      </Container>

      <WarmPanel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-[30px] sm:text-[40px] font-heading font-black text-ink leading-[1.08] tracking-tight mt-2">From first call to front door</h2>
            <ol className="mt-8 space-y-4">
              {s.steps.map((st, i) => (
                <li key={st} className="flex items-start gap-4">
                  <span className={`w-9 h-9 rounded-full grid place-items-center flex-none font-heading font-black text-[14px] ${i === s.steps.length - 1 ? 'bg-coral text-white' : 'bg-white text-teal border border-[#eadfd1]'}`}>{i + 1}</span>
                  <span className="pt-1.5 text-[16px] font-semibold text-ink">{st}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative rounded-[32px] overflow-hidden min-h-[380px] bg-cover bg-center shadow-xl" style={{ backgroundImage: `url('${s.photo}')` }}>
            <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-white/95 backdrop-blur p-4 flex items-center gap-3 shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-teal flex-none" />
              <p className="text-[14px] text-ink"><b>One coordinator</b> looks after your pet’s whole journey and answers every question.</p>
            </div>
          </div>
        </div>
      </WarmPanel>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <SectionHead eyebrow="Questions" title="Good to know" text="Can’t see your question? Our coordinators are happy to help." />
          <Accordion items={s.faqs} />
        </div>
      </Container>

      <Container className="!pt-0">
        <SectionHead eyebrow="More services" title="Often booked together" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {others.map((o) => (
            <a key={o.slug} href={`/services/${o.slug}`} className="group relative rounded-[28px] overflow-hidden min-h-[260px] flex items-end p-6 text-white isolate shadow-md">
              <div className="absolute inset-0 -z-20 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${o.photo}')` }} />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-darkdeep/90 via-teal-darkdeep/30 to-transparent" />
              <div>
                <b className="block font-heading font-black text-[20px]">{o.name}</b>
                <span className="inline-flex items-center gap-1 text-[14px] text-coral-light font-bold mt-1">{o.short} <ArrowRight className="w-4 h-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </Container>

      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  )
}
