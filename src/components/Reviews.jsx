import React from 'react'

export default function Reviews() {
  const reviews = [
    {
      stars: '★★★★★',
      quote: 'I got a photo of Milo at every stop. Flying a cat to Paris felt impossible until we found this team.',
      name: 'Priya Nair',
      route: 'Los Angeles to Paris',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: '★★★★★',
      quote: 'Charlie is a Frenchie, so flying was out. They drove him to Chicago and he arrived happy.',
      name: 'Marcus Lee',
      route: 'Road trip, LA to Chicago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: '★★★★★',
      quote: 'The paperwork for Australia scared me. Our coordinator handled every date and test.',
      name: 'David Carter',
      route: 'London to Melbourne',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
  ]

  return (
    <section id="reviews" className="pb-20 md:pb-28 max-w-[1240px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral">
            Happy owners
          </span>
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-heading font-black text-ink leading-[1.06] tracking-tight mt-2 max-w-[620px]">
            Tails wagging on arrival.
          </h2>
        </div>
        <p className="text-[16px] md:text-[17px] text-soft max-w-[420px] font-sans leading-relaxed">
          Real families, real reunions. <span className="text-teal font-bold underline cursor-pointer hover:text-coral">See the happy reunions</span>
        </p>
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {reviews.map((rev, idx) => (
          <div key={idx} className="pt-6 border-t-2 border-teal flex flex-col justify-between">
            <div>
              <span className="text-coral text-[18px] tracking-[3px] select-none block" aria-label="5 out of 5 stars">
                {rev.stars}
              </span>
              <p className="font-heading font-bold text-[19px] sm:text-[20px] text-ink leading-relaxed my-4">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3.5 mt-4 pt-3 border-t border-[#e3ddd3]/40">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-12 h-12 rounded-full object-cover shadow-sm border border-white"
                loading="lazy"
              />
              <div>
                <b className="block font-heading font-extrabold text-[15px] text-ink">{rev.name}</b>
                <span className="block text-[13px] text-soft">{rev.route}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

