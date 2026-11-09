import React from 'react'

export default function HowItWorks() {
  const steps = [
    {
      num: 'Step 1',
      title: 'Tell us about your pet',
      desc: 'Breed, size, dates and where you are going. Your quote comes back fast.',
      highlight: false,
    },
    {
      num: 'Step 2',
      title: 'We plan and prepare',
      desc: 'Vet visits, papers, the right crate and the safest route for your pet.',
      highlight: false,
    },
    {
      num: 'Step 3',
      title: 'Track the journey',
      desc: 'Follow a live map with care updates and photos from our handlers.',
      highlight: false,
    },
    {
      num: 'Step 4',
      title: 'Happy reunion',
      desc: 'We bring your pet to your new door, rested, fed and ready for a cuddle.',
      highlight: true,
    },
  ]

  return (
    <section id="how" className="my-10 mx-3 sm:mx-6">
      <div className="bg-[#f6e9dc] rounded-[32px] md:rounded-[48px] py-16 md:py-24 px-6 md:px-12 max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="block font-heading font-extrabold text-[14px] tracking-[0.08em] uppercase text-coral">
              How it works
            </span>
            <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-heading font-black text-ink leading-[1.06] tracking-tight mt-2 max-w-[640px]">
              Four calm steps from your door to theirs.
            </h2>
          </div>
          <p className="text-[16px] md:text-[17px] text-soft max-w-[420px] font-sans leading-relaxed">
            No guesswork for you. You always know what happens next and who is looking after your pet.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-9 mt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`pt-5 border-t-2 transition-all duration-300 ${
                step.highlight ? 'border-coral' : 'border-teal/25'
              }`}
            >
              <span
                className={`block font-heading font-extrabold text-[13px] tracking-[0.1em] uppercase mb-2 ${
                  step.highlight ? 'text-coral-dark' : 'text-teal'
                }`}
              >
                {step.num}
              </span>
              <h3 className="text-[21px] font-heading font-black text-ink leading-snug mb-2">
                {step.title}
              </h3>
              <p className="text-[15px] text-soft leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

