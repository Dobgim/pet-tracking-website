// Original PawPath copy for the inner pages. Edit freely.

export const SERVICES = [
  {
    slug: 'air', name: 'Pet air travel', short: 'In cabin and pet air cargo', photo: '/assets/img/pt-air.jpg',
    title: 'Flights planned around your pet, not the other way round',
    intro: 'Whether your pet fits under the seat or needs a cargo booking, we pick pet-friendly airlines, the gentlest routing and a handler at every connection.',
    from: 450,
    points: [
      ['Airline and route selection', 'We compare carriers by temperature rules, layover length and pet policies, then book the calmest option.'],
      ['In-cabin escort', 'Small pets can fly in the cabin with a PawPath escort when you cannot travel together.'],
      ['Manifest cargo bookings', 'Larger pets travel in pressurised, climate-controlled holds with confirmed space and priority loading.'],
      ['Handler at every stop', 'At each connection a handler checks water, comfort and paperwork, then posts a photo update for you.'],
    ],
    steps: ['Travel assessment and airline shortlist', 'IATA crate fitting and acclimatisation tips', 'Airport drop-off with our team', 'Live updates on every leg', 'Collection and delivery to your door'],
    faqs: [
      ['Can my pet fly in the cabin?', 'Usually if pet and carrier together weigh under about 8 kg, but each airline sets its own limit. We check for your route.'],
      ['Is cargo safe for pets?', 'Pet cargo holds are pressurised and temperature controlled. We avoid extreme-weather dates and long layovers.'],
      ['Do you handle snub-nosed breeds?', 'Yes, with extra care. Many airlines restrict them, so we often recommend road travel or specific carriers.'],
    ],
  },
  {
    slug: 'road', name: 'Door to door by road', short: 'Climate-controlled pet vans', photo: '/assets/img/pt-road.jpg',
    title: 'Ground transport with rest stops, walks and a driver who loves animals',
    intro: 'Our climate-controlled vans collect your pet from home and bring them to the new door, with regular breaks and live GPS the whole way.',
    from: 320,
    points: [
      ['Climate-controlled vans', 'Each vehicle keeps a steady temperature, with secure crates and padded bedding.'],
      ['Planned rest stops', 'Walks, water and feeding every few hours, matched to your pet’s usual routine.'],
      ['Live GPS tracking', 'See the van on the map and get photo check-ins from the driver.'],
      ['Shared or private rides', 'Share a route to save cost, or book a private van for anxious or senior pets.'],
    ],
    steps: ['Quote and route planning', 'Home collection at a time that suits you', 'Rest stops and photo updates', 'Overnight stays at partner kennels if needed', 'Hand delivery at your new address'],
    faqs: [
      ['How long can a road trip be?', 'We regularly run multi-day routes, with overnight stops at vetted partner boarding facilities.'],
      ['Can two pets travel together?', 'Yes. Pets from the same home can share a compartment if they are comfortable together.'],
      ['Is road travel better for some pets?', 'Often, especially for snub-nosed breeds, seniors and nervous flyers.'],
    ],
  },
  {
    slug: 'international', name: 'International pet relocation', short: 'Moving abroad with your pet', photo: '/assets/img/pt-reunion.jpg',
    title: 'Moving countries with your pet, without the paperwork panic',
    intro: 'Every country has its own import rules, timelines and tests. We build a step-by-step plan from day one so nothing is missed and nothing is rushed.',
    from: 1650,
    points: [
      ['Country rule check', 'We map vaccines, blood tests, waiting periods and permits for your destination.'],
      ['Timeline you can follow', 'A dated checklist tells you exactly what happens and when, often months ahead.'],
      ['Customs clearance', 'Our agents meet your pet on arrival and handle inspection and clearance.'],
      ['End-to-end coordination', 'One coordinator from first vet visit to the moment your pet walks into the new home.'],
    ],
    steps: ['Import requirements review', 'Microchip, vaccines and titre tests', 'Government endorsement of documents', 'Flight, escort and customs agent booked', 'Arrival clearance and home delivery'],
    faqs: [
      ['How early should I start?', 'For rabies-controlled countries, start 4 to 6 months ahead. Others may need only a few weeks.'],
      ['Can you help if I have already moved?', 'Yes. We can work with your vet back home and ship your pet to you later.'],
      ['Do you work worldwide?', 'We coordinate moves to and from most countries through our partner network.'],
    ],
  },
  {
    slug: 'paperwork', name: 'Vet and travel paperwork', short: 'Health certificates and permits', photo: '/assets/img/pt-vet.jpg',
    title: 'The right forms, signed and stamped, before your pet leaves home',
    intro: 'Health certificates, import permits and government endorsements are where most trips go wrong. We prepare and check every document for you.',
    from: 180,
    points: [
      ['Health certificates', 'We coordinate with an accredited vet so certificates are issued inside the correct time window.'],
      ['Import permits', 'We apply for destination permits and track them until they are approved.'],
      ['Government endorsement', 'Documents are submitted for official endorsement where your destination requires it.'],
      ['Document double-check', 'A second coordinator reviews every page before travel day.'],
    ],
    steps: ['Requirements list for your route', 'Vet appointment booked', 'Certificates issued and checked', 'Endorsement and permits secured', 'Copies sent to you and travelling with your pet'],
    faqs: [
      ['Can I use my own vet?', 'Often yes, as long as they are accredited for export paperwork. We will confirm.'],
      ['What if a deadline is tight?', 'We offer expedited handling for many destinations. Ask us early.'],
      ['Do I get copies?', 'Yes, you receive digital copies and originals travel with your pet.'],
    ],
  },
  {
    slug: 'quarantine', name: 'Quarantine and import support', short: 'Arrival rules handled for you', photo: '/assets/img/pt-boarding.jpg',
    title: 'Support through quarantine, from booking to release',
    intro: 'Some destinations require a quarantine stay. We reserve the place, prepare your pet and keep you updated until they come home to you.',
    from: 400,
    points: [
      ['Facility booking', 'We reserve quarantine space as soon as the travel date is fixed.'],
      ['Pre-arrival prep', 'Diet notes, comfort items and medical history go ahead of your pet.'],
      ['Welfare updates', 'We liaise with the facility and pass on news while your pet is there.'],
      ['Release and delivery', 'On release day we collect your pet and bring them home.'],
    ],
    steps: ['Check whether quarantine applies', 'Book facility and import permit', 'Arrival transfer to quarantine', 'Regular welfare updates', 'Collection and home delivery'],
    faqs: [
      ['Which countries need quarantine?', 'A small number of destinations do, and rules change. We confirm for your route.'],
      ['Can I visit?', 'Many facilities allow scheduled visits. We help arrange them.'],
      ['How long is it?', 'Usually from 10 to 30 days depending on the destination and your pet’s documents.'],
    ],
  },
  {
    slug: 'boarding', name: 'Boarding and layover care', short: 'Safe stays between legs', photo: '/assets/img/pt-boarding.jpg',
    title: 'Comfortable stays between flights, moves and handovers',
    intro: 'When there is a gap between legs or between homes, your pet stays with vetted partners who follow your routine and send updates.',
    from: 45,
    points: [
      ['Vetted partners', 'We only use facilities we have inspected for cleanliness, space and staff care.'],
      ['Layover rest', 'Long connections become a proper break with exercise, food and fresh bedding.'],
      ['Routine matched', 'Feeding times, medication and walks follow the notes you give us.'],
      ['Daily updates', 'Photos and short notes so you always know how your pet is settling.'],
    ],
    steps: ['Tell us dates and routine', 'Partner matched near the route', 'Transfer to boarding', 'Daily photo updates', 'Onward journey or collection'],
    faqs: [
      ['Can boarding be added to any trip?', 'Yes, as a single night or a longer stay while you settle in.'],
      ['Are cats boarded separately?', 'Yes, cats stay in quiet cat-only areas away from dogs.'],
      ['What about medication?', 'Partners give medication as instructed and record each dose.'],
    ],
  },
  {
    slug: 'crates', name: 'Crates and travel prep', short: 'IATA crates and acclimatisation', photo: '/assets/img/pt-hero-m.jpg',
    title: 'The right crate and a pet who is ready to use it',
    intro: 'A correctly sized, airline-approved crate is the single biggest comfort factor on travel day. We supply it and help your pet get used to it.',
    from: 95,
    points: [
      ['IATA-compliant crates', 'Sized from your pet’s measurements with proper ventilation and secure fittings.'],
      ['Crate training plan', 'Simple daily steps to make the crate feel like a safe den.'],
      ['Travel kit', 'Water bowls, absorbent bedding, labels and feeding instructions attached.'],
      ['Delivered to your home', 'The crate arrives weeks ahead so your pet has time to adjust.'],
    ],
    steps: ['Send us your pet’s measurements', 'Crate size confirmed', 'Delivered to your door', 'Crate training guide', 'Labelled and checked on travel day'],
    faqs: [
      ['How do I measure my pet?', 'Length nose to base of tail, height to top of head standing, and width across the shoulders. We send a guide.'],
      ['Can I use my own crate?', 'If it meets airline standards and fits correctly. We will check photos.'],
      ['How early should the crate arrive?', 'Ideally 3 to 4 weeks before travel.'],
    ],
  },
]

export const PRICING = [
  { name: 'Road Essentials', price: 320, unit: 'from', blurb: 'Shared-route ground transport within the same region.', features: ['Home collection and delivery', 'Climate-controlled van', 'Rest stops every 3 to 4 hours', 'Live GPS and photo updates'], cta: 'Get a road quote' },
  { name: 'Air Complete', price: 950, unit: 'from', blurb: 'Domestic flights handled end to end by one coordinator.', features: ['Airline booking and routing', 'IATA crate included', 'Airport handling both ends', 'Handler checks at connections', 'Live tracking and photos'], cta: 'Get an air quote', featured: true },
  { name: 'Global Relocation', price: 2400, unit: 'from', blurb: 'International moves including documents and customs.', features: ['Import rule plan and timeline', 'Vet paperwork and endorsements', 'Flights, escort and customs agent', 'Arrival clearance and delivery', 'Dedicated senior coordinator'], cta: 'Plan an international move' },
]

export const ADDONS = [
  ['In-cabin escort', 'from $380'], ['Boarding per night', 'from $45'], ['Private van upgrade', 'from $220'],
  ['Expedited paperwork', 'from $150'], ['Quarantine coordination', 'from $400'], ['Crate rental', 'from $60'],
]

export const LOCATIONS = [
  { region: 'North America', hubs: [['Austin, TX', 'Head office and road hub'], ['Toronto, Canada', 'Air and customs desk'], ['Atlanta, GA', 'Southeast road hub'], ['Seattle, WA', 'Pacific Northwest air desk'], ['New York, NY', 'International gateway']] },
  { region: 'Europe', hubs: [['London, UK', 'European coordination hub'], ['Amsterdam, Netherlands', 'Cargo transfer partner'], ['Berlin, Germany', 'Partner vet network']] },
  { region: 'Middle East & Asia Pacific', hubs: [['Dubai, UAE', 'Layover care partner'], ['Singapore', 'Transit and quarantine liaison'], ['Melbourne, Australia', 'Arrival and quarantine support']] },
]

export const TEAM = [
  { name: 'Rachel Moore', role: 'Founder & Head Coordinator', photo: '/assets/img/pt-hero-m.jpg' },
  { name: 'Samuel Adeyemi', role: 'International Moves Lead', photo: '/assets/img/pt-air.jpg' },
  { name: 'Lena Fischer', role: 'Veterinary Paperwork Specialist', photo: '/assets/img/pt-vet.jpg' },
  { name: 'Carlos Rivera', role: 'Road Operations Manager', photo: '/assets/img/pt-road.jpg' },
]

export const JOBS = [
  { title: 'Pet Travel Coordinator', team: 'Operations', place: 'Austin, TX · Hybrid', type: 'Full time', text: 'Own each customer’s journey from quote to reunion, keeping owners informed at every step.' },
  { title: 'Animal Handler (Airport)', team: 'Ground team', place: 'Toronto, Canada', type: 'Full time', text: 'Receive, check and comfort pets at the airport, and post welfare updates from the ramp.' },
  { title: 'Pet Transport Driver', team: 'Road', place: 'Atlanta, GA', type: 'Full time', text: 'Drive our climate-controlled vans on regional routes with planned rest and care stops.' },
  { title: 'Customer Care Specialist', team: 'Support', place: 'Remote (US)', type: 'Part time', text: 'Answer owner questions by phone, chat and email, and turn worried messages into calm ones.' },
  { title: 'Documentation Officer', team: 'Compliance', place: 'London, UK', type: 'Full time', text: 'Prepare and check export and import paperwork for routes across Europe and beyond.' },
]

export const POSTS = [
  { slug: 'first-flight-checklist', title: 'Your pet’s first flight: a calm checklist', tag: 'Air travel', date: '2026-10-21', read: 6, photo: '/assets/img/pt-air.jpg',
    excerpt: 'From crate training to the last meal before take-off, here is what to do in the weeks before your pet flies.',
    body: ['Start with the crate. A pet who already sees the crate as a safe den will settle far faster on travel day. Leave it open at home with familiar bedding and a few treats inside, and build up to short closed-door periods.', 'Book your vet visit early. Many routes need a health certificate issued within a fixed window before departure, so timing matters. Your coordinator will tell you the exact dates.', 'On travel day, offer a light meal four to six hours before departure and plenty of water. Skip new treats or foods so tummies stay settled.', 'Finally, attach a familiar-smelling item such as a worn T-shirt. Scent is a powerful comfort when everything else is new.'] },
  { slug: 'road-vs-air', title: 'Road or air? Choosing the right way to move your pet', tag: 'Planning', date: '2026-10-02', read: 5, photo: '/assets/img/pt-road.jpg',
    excerpt: 'Distance is only one factor. Breed, age, temperament and the season all shape the best option.',
    body: ['For journeys under roughly 1,000 km, road travel is often the gentler choice. There are no airport handovers and your pet stays with the same driver the whole way.', 'Flying wins on long distances and international moves, where a road trip would mean days in transit.', 'Snub-nosed breeds such as Pugs, French Bulldogs and Persian cats face airline restrictions, so road travel is often recommended for them.', 'Season matters too. Many airlines limit pet cargo in very hot or cold months, which can make road travel the more reliable option.'] },
  { slug: 'international-timeline', title: 'Moving abroad with a pet: a month-by-month timeline', tag: 'International', date: '2026-09-14', read: 8, photo: '/assets/img/pt-reunion.jpg',
    excerpt: 'Some countries need six months of preparation. Here is how a typical international move unfolds.',
    body: ['Six months out: confirm your destination’s rules, check the microchip and update rabies vaccination. Some countries require a blood test followed by a waiting period.', 'Three months out: book flights and, if needed, quarantine space. Order your IATA crate and start crate training.', 'One month out: book the export health certificate appointment and arrange government endorsement.', 'Travel week: prepare the travel kit, confirm handler contacts and let your coordinator take it from there.'] },
  { slug: 'senior-pets', title: 'Travelling with senior pets', tag: 'Care', date: '2026-08-30', read: 4, photo: '/assets/img/pt-vet.jpg',
    excerpt: 'Older pets can travel safely with a little extra planning. Here is what we do differently.',
    body: ['A pre-travel vet check is essential for senior pets, even for short trips. It flags anything that might make travel uncomfortable.', 'We favour shorter legs, longer rest stops and softer bedding, and we keep medication schedules exactly as at home.', 'Where possible we choose direct routes and private vans to keep stress low.'] },
]

export const FAQS = [
  { group: 'Booking & pricing', items: [
    ['How do I get a quote?', 'Use the quote form on any page or call us. Tell us your pet’s breed, weight, dates and route, and we will reply with a clear price.'],
    ['What is included in the price?', 'Your quote lists every item, from transport and handling to crates and paperwork, so there are no surprises later.'],
    ['How do I pay?', 'A deposit secures your booking and the balance is due before travel. We accept cards and bank transfers.'],
    ['Can I cancel?', 'Yes. Deposits are refundable up to 14 days before travel, minus any third-party costs already incurred.'],
  ] },
  { group: 'Safety & care', items: [
    ['Who looks after my pet during the trip?', 'Trained handlers and drivers who check water, comfort and wellbeing at every stop.'],
    ['Will my pet be sedated?', 'No. Sedation is not recommended for travel by vets or airlines. We focus on crate training and calm handling instead.'],
    ['What if there is a delay?', 'Your coordinator rebooks, arranges boarding if needed and keeps you updated at every step.'],
  ] },
  { group: 'Tracking & updates', items: [
    ['How does live tracking work?', 'You receive a tracking number like PPT-XXXX-XXXX-XXXX. Enter it on our site to see each step, location and handler notes.'],
    ['How often will I hear from you?', 'At every handover, rest stop and flight leg, plus any time you message your coordinator.'],
  ] },
  { group: 'Documents', items: [
    ['Do you handle paperwork?', 'Yes. We prepare and check health certificates, permits and endorsements for your route.'],
    ['What does my pet need to travel abroad?', 'Usually a microchip, rabies vaccination and a health certificate. Some countries need blood tests or permits too.'],
  ] },
]

export const REUNIONS = [
  { pet: 'Max', route: 'London → Melbourne', photo: '/assets/img/pt-reunion.jpg', quote: 'Twenty-nine hours of travel and he walked out wagging. The updates kept us sane.', owner: 'The Bennett family' },
  { pet: 'Bella', route: 'Austin → Toronto', photo: '/assets/img/pt-hero-m.jpg', quote: 'We knew where she was at every step. She slept the whole first night home.', owner: 'Marcus R.' },
  { pet: 'Luna', route: 'Seattle → Denver', photo: '/assets/img/pt-boarding.jpg', quote: 'Our nervous cat arrived calmer than we were. Lovely escort.', owner: 'Priya S.' },
  { pet: 'Rocky', route: 'Miami → Atlanta', photo: '/assets/img/pt-road.jpg', quote: 'Road trip with walks every few hours. He came home happy and tired.', owner: 'Daniel O.' },
  { pet: 'Coco', route: 'Berlin → New York', photo: '/assets/img/pt-vet.jpg', quote: 'The paperwork was handled for us. All we had to do was wait.', owner: 'Hannah M.' },
  { pet: 'Biscuit', route: 'Accra → London', photo: '/assets/img/pt-air.jpg', quote: 'From the first call to the front door, one person looked after everything.', owner: 'Ama M.' },
]

export const INDUSTRIES = [
  { name: 'Families moving home', photo: '/assets/img/pt-reunion.jpg', text: 'Relocating across the country or overseas? We move your pet on a timeline that fits your own move, so the whole family arrives together.', points: ['Timed to your move dates', 'Boarding while you settle in', 'Door delivery to the new home'] },
  { name: 'Military & diplomatic', photo: '/assets/img/pt-air.jpg', text: 'Short-notice postings and strict rules are routine for us. We work with tight deadlines and government paperwork.', points: ['Short-notice planning', 'Experience with official postings', 'Flexible storage and boarding'] },
  { name: 'Expats & corporate relocation', photo: '/assets/img/pt-hero-m.jpg', text: 'We partner with HR teams and relocation firms to include pets in employee moves, with one point of contact.', points: ['Single invoice options', 'Relocation partner coordination', 'Global import rule checks'] },
  { name: 'Breeders & rescues', photo: '/assets/img/pt-boarding.jpg', text: 'Safe, compliant transport for puppies, kittens and rescue animals heading to new families.', points: ['Age and vaccination checks', 'Multi-pet shipments', 'Handover reports for adopters'] },
  { name: 'Veterinary clinics', photo: '/assets/img/pt-vet.jpg', text: 'Clinics refer clients to us for transport, and we keep you in the loop on certificates and timelines.', points: ['Referral programme', 'Shared document checklists', 'Patient travel summaries'] },
  { name: 'Show & working animals', photo: '/assets/img/pt-road.jpg', text: 'Show dogs, assistance animals and working dogs travel with handlers who understand their routines.', points: ['Event-timed schedules', 'Handler continuity', 'Equipment transported together'] },
]
