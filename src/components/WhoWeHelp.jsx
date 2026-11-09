import React from 'react'
import { Home, Award, Globe, HeartHandshake, ArrowRight } from 'lucide-react'

export default function WhoWeHelp({ onOpenQuote }) {
  const groups = [
    {
      icon: <Home className="w-7 h-7 text-teal stroke-[1.7]" />,
      title: 'Families moving home',
      desc: 'Calm moves for the pets in your family, door to door.',
    },
    {
      icon: <Award className="w-7 h-7 text-teal stroke-[1.7]" />,
      title: 'Military and diplomatic moves',
      desc: 'Pet moves that keep pace with orders and postings.',
    },
    {
      icon: <Globe className="w-7 h-7 text-teal stroke-[1.7]" />,
      title: 'Expats and corporate relocation',
      desc: 'Pets moved abroad alongside your new job.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-teal stroke-[1.7]" />,
      title: 'Breeders sending puppies and kittens',
      desc: 'Gentle first journeys for puppies and kittens.',
    },
  ]

  return (
    <section id="who" className="py-20 md:py-28 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral">
            Who we help
          </span>
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-heading font-black text-ink leading-[1.06] tracking-tight mt-2 max-w-[620px]">
            Moves for every kind of pet family.
          </h2>
        </div>
        <p className="text-[16px] md:text-[17px] text-soft max-w-[420px] font-sans leading-relaxed">
          Dogs and cats mostly, plus rabbits, birds and small pets where the rules allow.{' '}
          <button 
            type="button" 
            onClick={onOpenQuote}
            className="text-teal font-bold hover:text-coral underline inline"
          >
            See everyone we help
          </button>
        </p>
      </div>

      {/* 2-Column Ruled List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
        {groups.map((item, idx) => (
          <div
            key={idx}
            onClick={onOpenQuote}
            className="group py-6 md:py-7 border-t border-teal/20 flex items-start gap-5 cursor-pointer hover:bg-cream/40 px-2 rounded-xl transition-colors duration-200"
          >
            <div className="flex-none mt-1 p-2 rounded-xl bg-teal/10 group-hover:bg-coral/10 transition-colors">
              {item.icon}
            </div>

            <div className="flex-1 min-w-0">
              <b className="block font-heading font-black text-[18px] sm:text-[19px] text-ink group-hover:text-teal leading-snug mb-1 transition-colors">
                {item.title}
              </b>
              <span className="block text-[14.5px] text-soft font-sans">
                {item.desc}
              </span>
            </div>

            <div className="flex-none text-coral group-hover:translate-x-1 transition-transform duration-200 mt-2">
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

