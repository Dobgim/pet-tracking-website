import React, { useEffect, useMemo, useState } from 'react'
import { Search, Plus, Download, Pencil, Trash2, Copy, ExternalLink, Package, X, MapPin, Mail, Phone } from 'lucide-react'
import {
  STATUSES, SERVICES, PHOTOS, statusMeta, saveShipment, deleteShipment, addShipmentEvent, deleteShipmentEvent, generateTrackingCode,
} from '../lib/store'
import { useDB, Card, Button, Field, inputCls, Modal, StatusBadge, EmptyState, fmtDate, fmtMoney, toast, downloadCSV } from './ui'

const toLocal = (d) => {
  const x = new Date(d)
  x.setMinutes(x.getMinutes() - x.getTimezoneOffset())
  return x.toISOString().slice(0, 16)
}
const fromLocal = (v) => new Date(v).toISOString()

const blank = () => ({
  code: generateTrackingCode(),
  pet: { name: '', species: 'Dog', breed: '', age: '', weight: '', photo: PHOTOS[0] },
  owner: { name: '', email: '', phone: '' },
  from: '', to: '', service: 'air', carrier: '', status: 'booked', progress: 5,
  eta: new Date(Date.now() + 7 * 86400000).toISOString(), price: '',
})

export function ShipmentEditor({ open, onClose, initial, prefill, onSaved }) {
  const [f, setF] = useState(blank())
  const [err, setErr] = useState('')
  useEffect(() => {
    if (!open) return
    if (initial) setF(structuredClone(initial))
    else {
      const b = blank()
      setF({ ...b, ...prefill, pet: { ...b.pet, ...prefill?.pet }, owner: { ...b.owner, ...prefill?.owner } })
    }
    setErr('')
  }, [open, initial, prefill])
  const set = (path, value) => setF((prev) => {
    const next = structuredClone(prev)
    const keys = path.split('.')
    let o = next
    keys.slice(0, -1).forEach((k) => { o = o[k] })
    o[keys.at(-1)] = value
    if (path === 'status') { const p = statusMeta(value).progress; if (p != null) next.progress = p }
    return next
  })

  const submit = (e) => {
    e.preventDefault()
    if (!f.pet.name || !f.owner.name || !f.from || !f.to) { setErr('Pet name, owner name, origin and destination are required.'); return }
    if (!/^PPT-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(f.code.toUpperCase())) { setErr('Tracking code must look like PPT-XXXX-XXXX-XXXX.'); return }
    const saved = saveShipment({ ...f, code: f.code.toUpperCase(), price: Number(f.price) || 0, progress: Number(f.progress) || 0 })
    toast(initial ? 'Shipment updated' : `Shipment ${saved.code} created`)
    onSaved?.(saved)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} wide title={initial ? `Edit ${initial.pet.name}'s shipment` : 'New shipment'}
      subtitle={initial ? initial.code : 'A tracking code is generated for the owner automatically.'}
      footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" form="shipment-form">{initial ? 'Save changes' : 'Create shipment'}</Button></>}>
      <form id="shipment-form" onSubmit={submit} className="space-y-6">
        <section>
          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-coral mb-3">Pet</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Name *"><input className={inputCls} value={f.pet.name} onChange={(e) => set('pet.name', e.target.value)} /></Field>
            <Field label="Species">
              <select className={inputCls} value={f.pet.species} onChange={(e) => set('pet.species', e.target.value)}>
                {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Breed"><input className={inputCls} value={f.pet.breed} onChange={(e) => set('pet.breed', e.target.value)} /></Field>
            <Field label="Age"><input className={inputCls} value={f.pet.age} placeholder="e.g. 4 yrs" onChange={(e) => set('pet.age', e.target.value)} /></Field>
            <Field label="Weight"><input className={inputCls} value={f.pet.weight} placeholder="e.g. 12 kg" onChange={(e) => set('pet.weight', e.target.value)} /></Field>
          </div>
          <div className="mt-3">
            <span className="block text-[12.5px] font-bold text-ink/80 mb-1.5">Photo</span>
            <div className="flex flex-wrap gap-2">
              {PHOTOS.map((p) => (
                <button key={p} type="button" onClick={() => set('pet.photo', p)}
                  className={`w-14 h-14 rounded-xl bg-cover bg-center ring-2 transition ${f.pet.photo === p ? 'ring-coral' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                  style={{ backgroundImage: `url('${p}')` }} aria-label="Choose photo" />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-coral mb-3">Owner</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Full name *"><input className={inputCls} value={f.owner.name} onChange={(e) => set('owner.name', e.target.value)} /></Field>
            <Field label="Email"><input type="email" className={inputCls} value={f.owner.email} onChange={(e) => set('owner.email', e.target.value)} /></Field>
            <Field label="Phone"><input className={inputCls} value={f.owner.phone} onChange={(e) => set('owner.phone', e.target.value)} /></Field>
          </div>
        </section>

        <section>
          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-coral mb-3">Journey</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Origin *"><input className={inputCls} value={f.from} placeholder="City, country" onChange={(e) => set('from', e.target.value)} /></Field>
            <Field label="Destination *"><input className={inputCls} value={f.to} placeholder="City, country" onChange={(e) => set('to', e.target.value)} /></Field>
            <Field label="Service">
              <select className={inputCls} value={f.service} onChange={(e) => set('service', e.target.value)}>
                {Object.entries(SERVICES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <Field label="Carrier / vehicle"><input className={inputCls} value={f.carrier} placeholder="e.g. Pet Air Cargo Express" onChange={(e) => set('carrier', e.target.value)} /></Field>
            <Field label="Status">
              <select className={inputCls} value={f.status} onChange={(e) => set('status', e.target.value)}>
                {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </Field>
            <Field label={`Progress (${f.progress}%)`}>
              <input type="range" min="0" max="100" value={f.progress} onChange={(e) => set('progress', Number(e.target.value))} className="w-full h-10 accent-coral" />
            </Field>
            <Field label="Estimated arrival"><input type="datetime-local" className={inputCls} value={toLocal(f.eta)} onChange={(e) => e.target.value && set('eta', fromLocal(e.target.value))} /></Field>
            <Field label="Price (USD)"><input type="number" min="0" className={inputCls} value={f.price} onChange={(e) => set('price', e.target.value)} /></Field>
            <Field label="Tracking code" hint="Shared with the owner to track on the website." className="sm:col-span-2">
              <div className="flex gap-2">
                <input className={`${inputCls} font-mono uppercase`} value={f.code} onChange={(e) => set('code', e.target.value)} disabled={!!initial} />
                {!initial && <Button variant="outline" onClick={() => set('code', generateTrackingCode())}>Regenerate</Button>}
              </div>
            </Field>
          </div>
        </section>

        {err && <p className="text-[13.5px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{err}</p>}
      </form>
    </Modal>
  )
}

function ShipmentDetail({ shipment: s, onClose, onEdit }) {
  const [status, setStatus] = useState(s.status)
  const [note, setNote] = useState('')
  const [location, setLocation] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  useEffect(() => { setStatus(s.status); setNote(''); setLocation('') }, [s.id, s.status])

  const post = (e) => {
    e.preventDefault()
    if (!note.trim()) return
    addShipmentEvent(s.id, { status, note: note.trim(), location: location.trim() })
    setNote(''); setLocation('')
    toast('Tracking update posted, the owner can see it now')
  }
  const copy = () => { navigator.clipboard?.writeText(s.code); toast('Tracking code copied') }

  return (
    <div className="fixed inset-0 z-[150] flex justify-end bg-teal-darkdeep/40 backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="w-full max-w-xl h-full bg-cream shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-[#ece6dc] px-5 py-4 flex items-center gap-3">
          <img src={s.pet.photo} alt="" className="w-11 h-11 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <b className="block font-heading font-black text-[17px] truncate">{s.pet.name}</b>
            <button type="button" onClick={copy} className="inline-flex items-center gap-1 text-[12.5px] font-mono font-bold text-coral hover:underline">{s.code} <Copy className="w-3 h-3" /></button>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></Button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}><Pencil className="w-3.5 h-3.5" /> Edit</Button>
            <a href={`#/?track=${s.code}`} target="_blank" rel="noreferrer"><Button variant="outline" size="sm"><ExternalLink className="w-3.5 h-3.5" /> View as owner</Button></a>
            <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}><Trash2 className="w-3.5 h-3.5" /> Delete</Button>
          </div>

          <Card className="p-4">
            <div className="flex items-center justify-between gap-3">
              <StatusBadge status={s.status} />
              <span className="text-[12.5px] text-soft">ETA <b className="text-ink">{fmtDate(s.eta, true)}</b></span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#f3eee6] overflow-hidden"><div className="h-full bg-gradient-to-r from-coral to-coral-dark rounded-full" style={{ width: `${s.progress}%` }} /></div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
              {[['From', s.from], ['To', s.to], ['Service', SERVICES[s.service]], ['Carrier', s.carrier || '—'], ['Pet', [s.pet.species, s.pet.breed, s.pet.age, s.pet.weight].filter(Boolean).join(' · ')], ['Price', fmtMoney(s.price)]].map(([k, v]) => (
                <div key={k}><dt className="text-soft text-[12px]">{k}</dt><dd className="font-semibold text-ink">{v}</dd></div>
              ))}
            </dl>
          </Card>

          <Card className="p-4">
            <h4 className="font-heading font-extrabold text-[14.5px] mb-2">Owner</h4>
            <p className="font-semibold text-[14px]">{s.owner.name}</p>
            <div className="mt-1 flex flex-col gap-1 text-[13px] text-soft">
              {s.owner.email && <a href={`mailto:${s.owner.email}`} className="inline-flex items-center gap-1.5 hover:text-teal"><Mail className="w-3.5 h-3.5" />{s.owner.email}</a>}
              {s.owner.phone && <a href={`tel:${s.owner.phone}`} className="inline-flex items-center gap-1.5 hover:text-teal"><Phone className="w-3.5 h-3.5" />{s.owner.phone}</a>}
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-heading font-extrabold text-[14.5px]">Post a tracking update</h4>
            <p className="text-[12.5px] text-soft mb-3">Appears immediately on the public tracking page.</p>
            <form onSubmit={post} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUSES.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                </select>
                <input className={inputCls} placeholder="Location (optional)" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <textarea className={`${inputCls} h-20 py-2 resize-none`} placeholder="e.g. Landed in Dubai, Max had water and a short walk." value={note} onChange={(e) => setNote(e.target.value)} />
              <Button type="submit" variant="coral" disabled={!note.trim()}>Post update</Button>
            </form>
          </Card>

          <Card className="p-4">
            <h4 className="font-heading font-extrabold text-[14.5px] mb-3">Timeline</h4>
            <ol className="relative border-l-2 border-teal/15 ml-1.5 space-y-4">
              {[...s.events].reverse().map((e) => (
                <li key={e.id} className="pl-4 relative group">
                  <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-teal ring-4 ring-white" />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <b className="text-[13.5px]">{statusMeta(e.status).label}</b>
                      <p className="text-[13px] text-soft">{e.note}</p>
                      <span className="text-[11.5px] text-soft/80 inline-flex items-center gap-1">{fmtDate(e.at, true)}{e.location && <><MapPin className="w-3 h-3 ml-1" />{e.location}</>}</span>
                    </div>
                    {s.events.length > 1 && (
                      <button type="button" onClick={() => deleteShipmentEvent(s.id, e.id)} aria-label="Remove update"
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-soft hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </aside>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete shipment?"
        footer={<><Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button className="!bg-red-600 hover:!bg-red-700" onClick={() => { deleteShipment(s.id); toast('Shipment deleted'); onClose() }}>Delete</Button></>}>
        <p className="text-[14px] text-soft">{s.pet.name}'s shipment <b className="text-ink">{s.code}</b> and its full timeline will be removed. The tracking code will stop working.</p>
      </Modal>
    </div>
  )
}

export default function Shipments({ openId, setOpenId, editorOpen, setEditorOpen }) {
  const db = useDB()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState(null)

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return db.shipments.filter((s) => (filter === 'all' || s.status === filter) &&
      (!needle || [s.code, s.pet.name, s.pet.breed, s.owner.name, s.owner.email, s.from, s.to].join(' ').toLowerCase().includes(needle)))
  }, [db.shipments, q, filter])

  const open = db.shipments.find((s) => s.id === openId)
  const counts = Object.fromEntries(STATUSES.map((s) => [s.id, db.shipments.filter((x) => x.status === s.id).length]))

  const exportCSV = () => downloadCSV('pawpath-shipments.csv', rows.map((s) => ({
    code: s.code, pet: s.pet.name, breed: s.pet.breed, owner: s.owner.name, email: s.owner.email, phone: s.owner.phone,
    from: s.from, to: s.to, service: SERVICES[s.service], status: statusMeta(s.status).label, progress: s.progress, eta: s.eta, price: s.price,
  })))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-[26px]">Shipments</h1>
          <p className="text-soft text-[14px]">Create journeys, post live updates and manage tracking codes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV} disabled={!rows.length}><Download className="w-4 h-4" /> Export CSV</Button>
          <Button variant="coral" onClick={() => { setEditing(null); setEditorOpen(true) }}><Plus className="w-4 h-4" /> New shipment</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 flex flex-col 2xl:flex-row gap-3 2xl:items-center border-b border-[#f0eae1]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
            <input className={`${inputCls} pl-9`} placeholder="Search by code, pet, owner or city…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 2xl:pb-0 -mx-1 px-1">
            {[{ id: 'all', label: 'All' }, ...STATUSES].map((s) => (
              <button key={s.id} type="button" onClick={() => setFilter(s.id)}
                className={`h-8 px-3 rounded-full text-[12.5px] font-bold whitespace-nowrap transition-colors ${filter === s.id ? 'bg-teal text-white' : 'bg-[#f5f0e8] text-ink/75 hover:bg-[#ece5d9]'}`}>
                {s.label} <span className="opacity-70 tabular-nums">{s.id === 'all' ? db.shipments.length : counts[s.id]}</span>
              </button>
            ))}
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={Package} title="No shipments match" text="Try a different search or status filter."
            action={<Button variant="outline" onClick={() => { setQ(''); setFilter('all') }}>Clear filters</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead className="bg-[#fcfaf6] text-left text-[12px] uppercase tracking-wider text-soft">
                <tr>
                  <th className="px-4 py-3 font-bold">Pet</th>
                  <th className="px-4 py-3 font-bold">Tracking</th>
                  <th className="px-4 py-3 font-bold hidden md:table-cell">Route</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold hidden lg:table-cell">ETA</th>
                  <th className="px-4 py-3 font-bold hidden xl:table-cell text-right">Price</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3eee6]">
                {rows.map((s) => (
                  <tr key={s.id} className="hover:bg-[#fcfaf6] cursor-pointer" onClick={() => setOpenId(s.id)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={s.pet.photo} alt="" className="w-9 h-9 rounded-lg object-cover flex-none" />
                        <div className="min-w-0">
                          <b className="block text-ink">{s.pet.name}</b>
                          <span className="block text-[12px] text-soft truncate max-w-[160px]">{s.owner.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[12.5px] font-bold text-coral-dark whitespace-nowrap">{s.code}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-soft"><span className="text-ink">{s.from}</span> → {s.to}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap text-soft">{fmtDate(s.eta)}</td>
                    <td className="px-4 py-3 hidden xl:table-cell text-right tabular-nums font-semibold">{fmtMoney(s.price)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" aria-label="Edit" onClick={(e) => { e.stopPropagation(); setEditing(s); setEditorOpen(true) }}><Pencil className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {open && <ShipmentDetail shipment={open} onClose={() => setOpenId(null)} onEdit={() => { setEditing(open); setEditorOpen(true) }} />}
      <ShipmentEditor open={editorOpen} onClose={() => setEditorOpen(false)} initial={editing} onSaved={(s) => setOpenId(s.id)} />
    </div>
  )
}
