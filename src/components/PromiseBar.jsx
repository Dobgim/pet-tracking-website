import React from 'react'
import { Heart, Camera, FileCheck2, MapPin } from 'lucide-react'

export default function PromiseBar() {
  const promises = [
    {
      icon: <Heart className="w-7 h-7 text-teal stroke-[1.8]" />,
      title: 'One coordinator',
      desc: 'From the first call to the happy reunion.',
    },
    {
      icon: <Camera className="w-7 h-7 text-teal stroke-[1.8]" />,
      title: 'Photo updates',
      desc: 'See your pet at every stop of the trip.',
    },
    {
      icon: <FileCheck2 className="w-7 h-7 text-teal stroke-[1.8]" />,
      title: 'Vet paperwork handled',
      desc: 'Health certificates, permits and timing.',
    },
    {
      icon: <MapPin className="w-7 h-7 text-teal stroke-[1.8]" />,
      title: 'Live tracking',
      desc: 'A map, a timeline and alerts by email.',
    },
  ]

  return (
    <div className="relative z-20 -mt-10 md:-mt-14 max-w-[1240px] mx-auto px-4 sm:px-6">
      <div className="glass-promise rounded-[26px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-teal/15 shadow-2xl">
        {promises.map((item, idx) => (
          <div key={idx} className="p-6 md:p-7 flex items-start gap-4">
            <div className="flex-none p-2 rounded-xl bg-teal/10">
              {item.icon}
            </div>
            <div>
              <b className="block font-heading font-black text-[17px] text-ink leading-tight">
                {item.title}
              </b>
              <p className="text-[14px] text-soft mt-1 leading-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

