import React, { useState } from 'react'
import { MapPin, Briefcase, Clock, Phone, Mail, MessageCircle, CheckCircle2, ArrowRight, ArrowLeft, Quote, Star } from 'lucide-react'
import { JOBS, POSTS, FAQS, REUNIONS } from './content'
import { PageHero, Container, SectionHead, WarmPanel, CtaBand, Accordion, usePageTitle, Eyebrow, TrackInline, PrimaryButton } from './kit'
import { addQuote, getDB } from '../lib/store'

const fmt = (d) => new Date(d).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })

export function Careers({ onOpenQuote }) {
  usePageTitle('Careers')
  const perks = ['Pet-friendly offices', 'Health cover', 'Travel allowance', 'Paid volunteering days', 'Training and certifications', 'Flexible hours']
  return (
    <>
      <PageHero eyebrow="Careers" title="Help pets travel calmly, every single day" photo="/assets/img/pt-boarding.jpg" crumbs={[['Careers']]}
        text="Join a team of coordinators, handlers and drivers who treat every pet as if it were their own." />
      <Container>
        <SectionHead eyebrow="Open roles" title={`${JOBS.length} positions open now`} />
        <div className="space-y-3">
          {JOBS.map((j) => (
            <div key={j.title} className="rounded-[24px] bg-white border border-[#eee5d9] p-6 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-coral">{j.team}</span>
                <h3 className="font-heading font-black text-[20px] text-ink mt-1">{j.title}</h3>
                <p className="text-[14.5px] text-soft mt-1 max-w-2xl">{j.text}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-[13.5px] text-soft font-semibold">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal" />{j.place}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-teal" />{j.type}</span>
                </div>
              </div>
              <a href={`mailto:careers@pawpath.example?subject=Application: ${encodeURIComponent(j.title)}`}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-teal hover:bg-teal-dark text-white font-heading font-extrabold text-[14.5px] whitespace-nowrap">
                Apply <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </Container>
      <WarmPanel>
        <SectionHead eyebrow="Life at PawPath" title="Why people stay" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {perks.map((p) => (
            <div key={p} className="rounded-2xl bg-white border border-[#eadfd1] px-5 py-4 flex items-center gap-3 font-heading font-bold text-ink">
              <CheckCircle2 className="w-5 h-5 text-coral flex-none" />{p}
            </div>
          ))}
        </div>
        <p className="mt-8 text-[15px] text-soft">Don’t see the right role? Send your CV to <a className="font-bold text-teal hover:underline" href="mailto:careers@pawpath.example">careers@pawpath.example</a>.</p>
      </WarmPanel>
      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  )
}

export function Blog() {
  usePageTitle('Blog')
  const [first, ...rest] = POSTS
  return (
    <>
      <PageHero eyebrow="Blog" title="Pet travel guides and advice" photo="/assets/img/pt-air.jpg" crumbs={[['Blog']]}
        text="Practical tips from our coordinators on preparing, planning and travelling with pets." />
      <Container>
        <a href={`/blog/${first.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden bg-white border border-[#eee5d9] shadow-sm hover:shadow-lg transition-shadow">
          <div className="min-h-[280px] bg-cover bg-center" style={{ backgroundImage: `url('${first.photo}')` }} />
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-coral">{first.tag} · Featured</span>
            <h2 className="mt-2 font-heading font-black text-[28px] md:text-[34px] leading-tight text-ink group-hover:text-teal">{first.title}</h2>
            <p className="mt-3 text-[15.5px] text-soft">{first.excerpt}</p>
            <span className="mt-5 text-[13.5px] text-soft">{fmt(first.date)} · {first.read} min read</span>
          </div>
        </a>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="group rounded-[28px] overflow-hidden bg-white border border-[#eee5d9] shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${p.photo}')` }} />
              <div className="p-6">
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-coral">{p.tag}</span>
                <h3 className="mt-1.5 font-heading font-black text-[19px] leading-snug text-ink group-hover:text-teal">{p.title}</h3>
                <p className="mt-2 text-[14.5px] text-soft">{p.excerpt}</p>
                <span className="block mt-4 text-[13px] text-soft">{fmt(p.date)} · {p.read} min read</span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </>
  )
}

export function BlogPost({ slug, onOpenQuote }) {
  const p = POSTS.find((x) => x.slug === slug)
  usePageTitle(p?.title || 'Article not found')
  if (!p) return <NotFound />
  return (
    <>
      <PageHero eyebrow={p.tag} title={p.title} photo={p.photo} crumbs={[['Blog', '/blog'], [p.tag]]} text={`${fmt(p.date)} · ${p.read} min read`} />
      <article className="max-w-[760px] mx-auto px-4 sm:px-6 py-14 md:py-20">
        <p className="text-[20px] leading-relaxed font-semibold text-ink">{p.excerpt}</p>
        <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink/85">
          {p.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <div className="mt-12 rounded-[24px] bg-[#f6e9dc] p-6 md:p-8">
          <b className="block font-heading font-black text-[20px]">Planning a trip like this?</b>
          <p className="mt-1 text-soft">A coordinator can build your timeline and quote today.</p>
          <div className="mt-4"><PrimaryButton onClick={onOpenQuote}>Get a free quote</PrimaryButton></div>
        </div>
        <a href="/blog" className="mt-10 inline-flex items-center gap-2 font-heading font-extrabold text-teal hover:text-coral"><ArrowLeft className="w-4 h-4" /> All articles</a>
      </article>
    </>
  )
}

export function Faq({ onOpenQuote }) {
  usePageTitle('FAQ')
  return (
    <>
      <PageHero eyebrow="FAQ" title="Answers to common questions" photo="/assets/img/pt-vet.jpg" crumbs={[['FAQ']]}
        text="Everything owners usually ask about booking, safety, tracking and documents." />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <nav className="hidden lg:block sticky top-28 self-start space-y-1">
            {FAQS.map((g) => (
              <a key={g.group} href={`#${g.group.replace(/\W+/g, '-').toLowerCase()}`} className="block px-4 py-2.5 rounded-xl font-heading font-bold text-[15px] text-ink/75 hover:bg-white hover:text-teal">{g.group}</a>
            ))}
          </nav>
          <div className="space-y-12">
            {FAQS.map((g) => (
              <div key={g.group} id={g.group.replace(/\W+/g, '-').toLowerCase()} className="scroll-mt-28">
                <h2 className="font-heading font-black text-[26px] text-ink mb-3">{g.group}</h2>
                <Accordion items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} title="Still have a question?" text="Our coordinators answer quickly, by phone, WhatsApp or email." />
    </>
  )
}

export function Reunions({ onOpenQuote }) {
  usePageTitle('Happy reunions')
  return (
    <>
      <PageHero eyebrow="Happy reunions" title="The best part of every journey" photo="/assets/img/pt-reunion.jpg" crumbs={[['Happy reunions']]}
        text="Some of the pets we have brought home, and what their families said about the trip." />
      <Container>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {REUNIONS.map((r, i) => (
            <figure key={r.pet} className="break-inside-avoid rounded-[28px] overflow-hidden bg-white border border-[#eee5d9] shadow-sm">
              <div className={`${i % 3 === 0 ? 'h-72' : 'h-56'} bg-cover bg-center`} style={{ backgroundImage: `url('${r.photo}')` }} />
              <figcaption className="p-6">
                <div className="flex items-center justify-between">
                  <b className="font-heading font-black text-[20px]">{r.pet}</b>
                  <span className="text-[12.5px] font-bold text-coral-dark bg-coral/10 px-2.5 py-1 rounded-full">{r.route}</span>
                </div>
                <div className="flex gap-0.5 mt-2 text-coral">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-[15.5px] leading-relaxed text-ink/85"><Quote className="w-4 h-4 inline -mt-1 mr-1 text-teal" />{r.quote}</blockquote>
                <span className="block mt-3 text-[13.5px] font-semibold text-soft">{r.owner}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
      <CtaBand onOpenQuote={onOpenQuote} title="Your reunion could be next" />
    </>
  )
}

export function Contact({ onOpenTrack }) {
  usePageTitle('Contact')
  const s = getDB().settings
  const [f, setF] = useState({ name: '', email: '', phone: '', topic: 'New booking', message: '' })
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    addQuote({ name: f.name, email: f.email, phone: f.phone, service: '', petType: '', weight: '', from: '', to: '', note: `${f.topic}: ${f.message}`, source: 'Contact page' })
    setSent(true)
  }
  const input = 'w-full h-12 px-4 rounded-xl bg-white border border-[#e3ddd3] text-[15px] focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15'
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a pet travel coordinator" photo="/assets/img/pt-hero-m.jpg" crumbs={[['Contact']]}
        text="Questions about a quote, a booking or a pet already on the move? We usually reply within a few hours.">
        <TrackInline onOpenTrack={onOpenTrack} />
      </PageHero>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div className="space-y-4">
            {[[Phone, 'Call us', s.supportPhone, `tel:${s.supportPhone.replace(/\s/g, '')}`],
              [MessageCircle, 'WhatsApp', 'Message a coordinator', 'https://wa.me/15550100199'],
              [Mail, 'Email', s.supportEmail, `mailto:${s.supportEmail}`]].map(([Icon, t, v, href]) => (
              <a key={t} href={href} className="flex items-center gap-4 rounded-[24px] bg-white border border-[#eee5d9] p-5 hover:border-coral/40 hover:shadow-md transition">
                <span className="w-12 h-12 rounded-2xl bg-coral text-white grid place-items-center flex-none"><Icon className="w-5 h-5" /></span>
                <span><b className="block font-heading font-black text-[17px]">{t}</b><span className="text-[14.5px] text-soft">{v}</span></span>
              </a>
            ))}
            <div className="rounded-[24px] bg-[#f6e9dc] p-6">
              <b className="flex items-center gap-2 font-heading font-black text-[17px]"><Clock className="w-5 h-5 text-teal" /> Office hours</b>
              <p className="mt-2 text-[14.5px] text-soft">Mon to Fri 8:00 to 18:00, Sat 9:00 to 14:00. On travel days your coordinator is reachable around the clock.</p>
            </div>
          </div>

          <div className="rounded-[32px] bg-white border border-[#eee5d9] p-6 md:p-10 shadow-sm">
            {sent ? (
              <div className="text-center py-14">
                <CheckCircle2 className="w-14 h-14 text-teal mx-auto" />
                <h2 className="mt-4 font-heading font-black text-[26px]">Message received</h2>
                <p className="mt-2 text-soft">Thanks {f.name.split(' ')[0] || 'for reaching out'}. A coordinator will reply to {f.email} shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Eyebrow>Send a message</Eyebrow>
                <h2 className="font-heading font-black text-[28px] -mt-2">How can we help?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required className={input} placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                  <input required type="email" className={input} placeholder="Email address" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                  <input className={input} placeholder="Phone (optional)" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                  <select className={input} value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
                    {['New booking', 'Existing booking', 'Tracking question', 'Partnerships', 'Something else'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <textarea required className={`${input} h-36 py-3 resize-none`} placeholder="Tell us about your pet and your trip" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
                <button type="submit" className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[15px] shadow-lg shadow-coral/30">
                  Send message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export function NotFound() {
  usePageTitle('Page not found')
  return (
    <PageHero eyebrow="404" title="This page wandered off" photo="/assets/img/pt-road.jpg" text="The page you are looking for doesn’t exist or has moved.">
      <PrimaryButton href="/">Back to home</PrimaryButton>
    </PageHero>
  )
}
