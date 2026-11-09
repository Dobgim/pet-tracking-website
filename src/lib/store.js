// Local data store for the PawPath demo.
// Everything lives in the browser's localStorage so the public site and the
// admin dashboard share one source of truth without a backend. Swap these
// functions for API calls when a real server is added.

const KEY = 'pawpath:db:v1'
const SESSION_KEY = 'pawpath:admin-session'
const listeners = new Set()

export const STATUSES = [
  { id: 'booked', label: 'Booked', tone: 'slate', progress: 5 },
  { id: 'vet', label: 'Vet & paperwork', tone: 'amber', progress: 20 },
  { id: 'pickup', label: 'Picked up', tone: 'sky', progress: 35 },
  { id: 'in_transit', label: 'In transit', tone: 'teal', progress: 60 },
  { id: 'customs', label: 'Customs / quarantine', tone: 'violet', progress: 80 },
  { id: 'out_for_delivery', label: 'Out for delivery', tone: 'coral', progress: 92 },
  { id: 'delivered', label: 'Delivered', tone: 'green', progress: 100 },
  { id: 'on_hold', label: 'On hold', tone: 'red', progress: null },
]

export const SERVICES = {
  air: 'Pet air cargo',
  cabin: 'In-cabin flight escort',
  road: 'Door to door ground van',
  intl: 'International relocation',
}

export const PHOTOS = [
  '/assets/img/pt-reunion.jpg',
  '/assets/img/pt-hero-m.jpg',
  '/assets/img/pt-air.jpg',
  '/assets/img/pt-boarding.jpg',
  '/assets/img/pt-road.jpg',
  '/assets/img/pt-vet.jpg',
]

export const statusMeta = (id) => STATUSES.find((s) => s.id === id) || STATUSES[0]

const uid = () => Math.random().toString(36).slice(2, 10)
const iso = (daysAgo = 0, hour = 9) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

export function generateTrackingCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const block = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `PPT-${block()}-${block()}-${block()}`
}

function seed() {
  const ev = (status, note, daysAgo, hour, location) => ({ id: uid(), status, note, location, at: iso(daysAgo, hour) })
  return {
    shipments: [
      {
        id: uid(), code: 'PPT-84SW-AR8D-QK3Z',
        pet: { name: 'Max', species: 'Dog', breed: 'German Shepherd', age: '6 yrs', weight: '38 kg', photo: '/assets/img/pt-reunion.jpg' },
        owner: { name: 'Olivia Bennett', email: 'olivia.bennett@example.com', phone: '+44 20 5550 0142' },
        from: 'London (LHR), UK', to: 'Melbourne (MEL), Australia', service: 'intl',
        carrier: 'Pet Air Cargo Express', status: 'in_transit', progress: 64,
        eta: iso(-2, 6), price: 6850, createdAt: iso(12),
        events: [
          ev('booked', 'Booking confirmed and coordinator assigned.', 12, 10, 'London, UK'),
          ev('vet', 'Rabies titre and export health certificate endorsed.', 8, 14, 'London, UK'),
          ev('pickup', 'Collected from home in climate-controlled van.', 2, 7, 'Richmond, London'),
          ev('in_transit', 'Departed LHR. Handler reports Max is calm and hydrated.', 1, 21, 'LHR → DXB'),
        ],
      },
      {
        id: uid(), code: 'PPT-7KQ4-M29X-48HD',
        pet: { name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: '4 yrs', weight: '29 kg', photo: '/assets/img/pt-hero-m.jpg' },
        owner: { name: 'Marcus Reid', email: 'marcus.reid@example.com', phone: '+1 555 010 4471' },
        from: 'Austin, TX', to: 'Toronto, Canada', service: 'air',
        carrier: 'PawPath Climate Van + Air Cargo', status: 'customs', progress: 82,
        eta: iso(-1, 10), price: 2400, createdAt: iso(9),
        events: [
          ev('booked', 'Booking confirmed.', 9, 11, 'Austin, TX'),
          ev('vet', 'USDA health certificate issued.', 6, 15, 'Austin, TX'),
          ev('pickup', 'Picked up from owner.', 3, 8, 'Austin, TX'),
          ev('in_transit', 'Flight AUS → YYZ departed on time.', 2, 13, 'In flight'),
          ev('customs', 'Arrived Toronto, CFIA inspection in progress.', 0, 9, 'Toronto Pearson'),
        ],
      },
      {
        id: uid(), code: 'PPT-3NBR-T6WQ-9ZLC',
        pet: { name: 'Luna', species: 'Cat', breed: 'British Shorthair', age: '3 yrs', weight: '5 kg', photo: '/assets/img/pt-boarding.jpg' },
        owner: { name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+1 555 010 8820' },
        from: 'Seattle, WA', to: 'Denver, CO', service: 'cabin',
        carrier: 'In-cabin escort', status: 'delivered', progress: 100,
        eta: iso(4, 16), price: 1150, createdAt: iso(15),
        events: [
          ev('booked', 'Booking confirmed.', 15, 10, 'Seattle, WA'),
          ev('pickup', 'Escort collected Luna.', 5, 7, 'Seattle, WA'),
          ev('in_transit', 'Boarded in cabin with escort.', 5, 9, 'SEA → DEN'),
          ev('delivered', 'Delivered to owner. Happy reunion!', 4, 16, 'Denver, CO'),
        ],
      },
      {
        id: uid(), code: 'PPT-QH5D-2KPV-W7MS',
        pet: { name: 'Rocky', species: 'Dog', breed: 'French Bulldog', age: '2 yrs', weight: '12 kg', photo: '/assets/img/pt-road.jpg' },
        owner: { name: 'Daniel Okafor', email: 'daniel.okafor@example.com', phone: '+1 555 010 3390' },
        from: 'Miami, FL', to: 'Atlanta, GA', service: 'road',
        carrier: 'PawPath Ground Van', status: 'vet', progress: 20,
        eta: iso(-6, 12), price: 980, createdAt: iso(3),
        events: [
          ev('booked', 'Booking confirmed. Snub-nosed breed, ground transport chosen.', 3, 12, 'Miami, FL'),
          ev('vet', 'Fit-to-travel exam booked.', 1, 10, 'Miami, FL'),
        ],
      },
      {
        id: uid(), code: 'PPT-8YTC-LM3E-5RXA',
        pet: { name: 'Coco', species: 'Dog', breed: 'Cavalier King Charles', age: '7 yrs', weight: '8 kg', photo: '/assets/img/pt-vet.jpg' },
        owner: { name: 'Hannah Müller', email: 'hannah.muller@example.com', phone: '+49 30 5550 7712' },
        from: 'Berlin, Germany', to: 'New York (JFK), USA', service: 'intl',
        carrier: 'Pet Air Cargo Express', status: 'on_hold', progress: 30,
        eta: iso(-9, 9), price: 4200, createdAt: iso(6),
        events: [
          ev('booked', 'Booking confirmed.', 6, 9, 'Berlin, Germany'),
          ev('on_hold', 'Waiting on updated microchip record from owner vet.', 1, 15, 'Berlin, Germany'),
        ],
      },
    ],
    quotes: [
      { id: uid(), name: 'Sofia Martins', email: 'sofia.martins@example.com', phone: '+351 21 555 0190', service: 'intl', petType: 'cat', weight: '4', from: 'Lisbon', to: 'Boston', status: 'new', note: '', createdAt: iso(0, 8) },
      { id: uid(), name: 'James Carter', email: 'james.carter@example.com', phone: '+1 555 010 6612', service: 'road', petType: 'dog', weight: '31', from: 'Dallas, TX', to: 'Phoenix, AZ', status: 'contacted', note: 'Sent estimate, waiting on dates.', createdAt: iso(2, 14) },
      { id: uid(), name: 'Aiko Tanaka', email: 'aiko.tanaka@example.com', phone: '+81 3 5550 2231', service: 'air', petType: 'dog', weight: '9', from: 'Tokyo', to: 'San Francisco', status: 'new', note: '', createdAt: iso(1, 18) },
    ],
    subscribers: [
      { id: uid(), email: 'travelwithpets@example.com', createdAt: iso(5) },
      { id: uid(), email: 'happy.owner@example.com', createdAt: iso(2) },
    ],
    activity: [
      { id: uid(), text: 'Demo data loaded', at: iso(0, 7) },
    ],
    settings: {
      companyName: 'PawPath Pet Travel',
      supportEmail: 'hello@pawpath.example',
      supportPhone: '+1 555 010 0199',
    },
    auth: null, // { email, hash } once the admin changes credentials
  }
}

let cache = null

export function getDB() {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    cache = raw ? JSON.parse(raw) : seed()
  } catch {
    cache = seed()
  }
  return cache
}

function save(db, activityText) {
  if (activityText) {
    db.activity = [{ id: uid(), text: activityText, at: new Date().toISOString() }, ...(db.activity || [])].slice(0, 60)
  }
  cache = { ...db }
  try { localStorage.setItem(KEY, JSON.stringify(cache)) } catch { /* storage full or blocked */ }
  listeners.forEach((fn) => fn(cache))
}

export function subscribe(fn) {
  listeners.add(fn)
  const onStorage = (e) => { if (e.key === KEY) { cache = null; fn(getDB()) } }
  window.addEventListener('storage', onStorage)
  return () => { listeners.delete(fn); window.removeEventListener('storage', onStorage) }
}

export function resetDB() {
  const fresh = seed()
  fresh.auth = getDB().auth
  save(fresh, 'Demo data reset')
}

/* ---------- Shipments ---------- */

export function findShipment(code) {
  const c = (code || '').trim().toUpperCase()
  return getDB().shipments.find((s) => s.code.toUpperCase() === c) || null
}

export function saveShipment(input) {
  const db = getDB()
  const exists = db.shipments.find((s) => s.id === input.id)
  if (exists) {
    const prev = exists
    const next = { ...prev, ...input }
    if (prev.status !== next.status) {
      next.events = [...(next.events || []), { id: uid(), status: next.status, note: `Status changed to ${statusMeta(next.status).label}.`, location: '', at: new Date().toISOString() }]
    }
    db.shipments = db.shipments.map((s) => (s.id === input.id ? next : s))
    save(db, `Updated shipment ${next.code} (${next.pet.name})`)
    return next
  }
  const created = {
    ...input,
    id: uid(),
    code: input.code || generateTrackingCode(),
    createdAt: new Date().toISOString(),
    events: [{ id: uid(), status: input.status || 'booked', note: 'Booking confirmed and coordinator assigned.', location: input.from, at: new Date().toISOString() }],
  }
  db.shipments = [created, ...db.shipments]
  save(db, `Created shipment ${created.code} (${created.pet.name})`)
  return created
}

export function addShipmentEvent(id, event) {
  const db = getDB()
  db.shipments = db.shipments.map((s) => {
    if (s.id !== id) return s
    const meta = statusMeta(event.status)
    return {
      ...s,
      status: event.status,
      progress: meta.progress ?? s.progress,
      events: [...s.events, { id: uid(), ...event, at: event.at || new Date().toISOString() }],
    }
  })
  const s = db.shipments.find((x) => x.id === id)
  save(db, `Logged update on ${s.code}: ${statusMeta(event.status).label}`)
}

export function deleteShipmentEvent(id, eventId) {
  const db = getDB()
  db.shipments = db.shipments.map((s) => (s.id === id ? { ...s, events: s.events.filter((e) => e.id !== eventId) } : s))
  save(db)
}

export function deleteShipment(id) {
  const db = getDB()
  const s = db.shipments.find((x) => x.id === id)
  db.shipments = db.shipments.filter((x) => x.id !== id)
  save(db, `Deleted shipment ${s?.code}`)
}

/* ---------- Quotes & subscribers (written by the public site) ---------- */

export function addQuote(q) {
  const db = getDB()
  db.quotes = [{ id: uid(), status: 'new', note: '', createdAt: new Date().toISOString(), ...q }, ...db.quotes]
  save(db, `New quote request from ${q.name || 'website visitor'}`)
}

export function updateQuote(id, patch) {
  const db = getDB()
  db.quotes = db.quotes.map((q) => (q.id === id ? { ...q, ...patch } : q))
  save(db, patch.status ? `Quote marked ${patch.status}` : undefined)
}

export function deleteQuote(id) {
  const db = getDB()
  db.quotes = db.quotes.filter((q) => q.id !== id)
  save(db, 'Deleted a quote request')
}

export function addSubscriber(email) {
  const db = getDB()
  if (db.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) return
  db.subscribers = [{ id: uid(), email, createdAt: new Date().toISOString() }, ...db.subscribers]
  save(db, `New newsletter subscriber ${email}`)
}

export function deleteSubscriber(id) {
  const db = getDB()
  db.subscribers = db.subscribers.filter((s) => s.id !== id)
  save(db)
}

export function saveSettings(patch) {
  const db = getDB()
  db.settings = { ...db.settings, ...patch }
  save(db, 'Updated company settings')
}

/* ---------- Admin auth (client-side demo only) ---------- */

export const DEFAULT_ADMIN = { email: 'admin@pawpath.example', password: 'PawPath@2026' }

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function login(email, password) {
  const db = getDB()
  const target = db.auth || { email: DEFAULT_ADMIN.email, hash: await sha256(DEFAULT_ADMIN.password) }
  const ok = email.trim().toLowerCase() === target.email.toLowerCase() && (await sha256(password)) === target.hash
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: target.email, at: Date.now() }))
    save(db, `Admin signed in (${target.email})`)
  }
  return ok
}

export function currentAdmin() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
    if (s && Date.now() - s.at < 8 * 60 * 60 * 1000) return s
  } catch { /* ignore */ }
  return null
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}

export async function changeCredentials(currentPassword, email, newPassword) {
  const db = getDB()
  const target = db.auth || { email: DEFAULT_ADMIN.email, hash: await sha256(DEFAULT_ADMIN.password) }
  if ((await sha256(currentPassword)) !== target.hash) return false
  db.auth = { email: email.trim(), hash: await sha256(newPassword) }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: db.auth.email, at: Date.now() }))
  save(db, 'Admin credentials changed')
  return true
}
