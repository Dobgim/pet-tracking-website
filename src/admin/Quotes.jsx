import React, { useMemo, useState } from 'react'
import { Inbox, Mail, Phone, Trash2, ArrowRight, Download, Search } from 'lucide-react'
import { SERVICES, updateQuote, deleteQuote } from '../lib/store'
import { useDB, Card, Button, Badge, EmptyState, inputCls, fmtDate, timeAgo, toast, downloadCSV } from './ui'
import { ShipmentEditor } from './Shipments'

const QSTATUS = {
  new: { label: 'New', tone: 'coral' },
  contacted: { label: 'Contacted', tone: 'sky' },
  converted: { label: 'Booked', tone: 'green' },
  declined: { label: 'Declined', tone: 'slate' },
}

export default function Quotes({ onConverted }) {
  const db = useDB()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [convert, setConvert] = useState(null)

  const rows = useMemo(() => {
    const n = q.trim().toLowerCase()
    return db.quotes.filter((x) => (filter === 'all' || x.status === filter) &&
      (!n || [x.name, x.email, x.from, x.to].join(' ').toLowerCase().includes(n)))
  }, [db.quotes, filter, q])
  const sel = db.quotes.find((x) => x.id === selectedId) || rows[0]

  const prefill = useMemo(() => convert && {
    pet: { species: convert.petType === 'cat' ? 'Cat' : 'Dog', weight: convert.weight ? `${convert.weight} kg` : '' },
    owner: { name: convert.name === 'Website visitor' ? '' : convert.name, email: convert.email, phone: convert.phone },
    from: convert.from, to: convert.to, service: convert.service || 'air',
  }, [convert])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-[26px]">Quote requests</h1>
          <p className="text-soft text-[14px]">Requests sent from the website's quote forms land here.</p>
        </div>
        <Button variant="outline" disabled={!rows.length} onClick={() => downloadCSV('pawpath-quotes.csv', rows.map((x) => ({
          received: x.createdAt, name: x.name, email: x.email, phone: x.phone, service: SERVICES[x.service], pet: x.petType, weight_kg: x.weight, from: x.from, to: x.to, status: QSTATUS[x.status].label, note: x.note, source: x.source,
        })))}><Download className="w-4 h-4" /> Export CSV</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 items-start">
        <Card className="overflow-hidden">
          <div className="p-3 border-b border-[#f0eae1] space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
              <input className={`${inputCls} pl-9`} placeholder="Search requests…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="flex gap-1.5 overflow-x-auto">
              {[['all', 'All'], ...Object.entries(QSTATUS).map(([k, v]) => [k, v.label])].map(([k, l]) => (
                <button key={k} type="button" onClick={() => setFilter(k)}
                  className={`h-7 px-3 rounded-full text-[12px] font-bold whitespace-nowrap ${filter === k ? 'bg-teal text-white' : 'bg-[#f5f0e8] text-ink/75 hover:bg-[#ece5d9]'}`}>
                  {l} <span className="opacity-70">{k === 'all' ? db.quotes.length : db.quotes.filter((x) => x.status === k).length}</span>
                </button>
              ))}
            </div>
          </div>
          {rows.length === 0 ? <EmptyState icon={Inbox} title="No requests" text="New quote requests from the website will appear here." /> : (
            <ul className="divide-y divide-[#f3eee6] max-h-[620px] overflow-y-auto">
              {rows.map((x) => (
                <li key={x.id}>
                  <button type="button" onClick={() => setSelectedId(x.id)}
                    className={`w-full text-left px-4 py-3.5 transition-colors ${sel?.id === x.id ? 'bg-teal/5 border-l-[3px] border-teal' : 'hover:bg-[#fcfaf6] border-l-[3px] border-transparent'}`}>
                    <div className="flex items-center justify-between gap-2">
                      <b className="text-[14px] truncate">{x.name || 'Website visitor'}</b>
                      <span className="text-[11.5px] text-soft whitespace-nowrap">{timeAgo(x.createdAt)}</span>
                    </div>
                    <p className="text-[12.5px] text-soft truncate">{x.from || '—'} → {x.to || '—'}</p>
                    <div className="mt-1.5"><Badge tone={QSTATUS[x.status].tone}>{QSTATUS[x.status].label}</Badge></div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {sel && (
          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-heading font-black text-[20px]">{sel.name || 'Website visitor'}</h2>
                <p className="text-[13px] text-soft">Received {fmtDate(sel.createdAt, true)}{sel.source ? ` · ${sel.source}` : ''}</p>
              </div>
              <Badge tone={QSTATUS[sel.status].tone}>{QSTATUS[sel.status].label}</Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-[13.5px]">
              {sel.email && <a href={`mailto:${sel.email}?subject=Your PawPath pet travel quote`} className="inline-flex items-center gap-1.5 font-semibold text-teal hover:underline"><Mail className="w-4 h-4" />{sel.email}</a>}
              {sel.phone && <a href={`tel:${sel.phone}`} className="inline-flex items-center gap-1.5 font-semibold text-teal hover:underline"><Phone className="w-4 h-4" />{sel.phone}</a>}
              {!sel.email && !sel.phone && <span className="text-soft">No contact details. This came from the quick quote banner.</span>}
            </div>

            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-cream border border-[#ece6dc] text-[13.5px]">
              {[['Service', SERVICES[sel.service] || '—'], ['Pet', sel.petType ? sel.petType[0].toUpperCase() + sel.petType.slice(1) : '—'], ['Weight', sel.weight ? `${sel.weight} kg` : '—'], ['From', sel.from || '—'], ['To', sel.to || '—']].map(([k, v]) => (
                <div key={k}><dt className="text-[12px] text-soft">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>

            <label className="block mt-5">
              <span className="block text-[12.5px] font-bold text-ink/80 mb-1.5">Internal notes</span>
              <textarea key={sel.id} defaultValue={sel.note} onBlur={(e) => e.target.value !== sel.note && (updateQuote(sel.id, { note: e.target.value }), toast('Note saved'))}
                className={`${inputCls} h-24 py-2 resize-none`} placeholder="Add notes for the team. Saves when you click away." />
            </label>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="coral" onClick={() => setConvert(sel)}>Convert to shipment <ArrowRight className="w-4 h-4" /></Button>
              {sel.status !== 'contacted' && <Button variant="outline" onClick={() => { updateQuote(sel.id, { status: 'contacted' }); toast('Marked as contacted') }}>Mark contacted</Button>}
              {sel.status !== 'declined' && <Button variant="outline" onClick={() => updateQuote(sel.id, { status: 'declined' })}>Decline</Button>}
              <Button variant="danger" onClick={() => { deleteQuote(sel.id); setSelectedId(null); toast('Request deleted') }}><Trash2 className="w-4 h-4" /> Delete</Button>
            </div>
          </Card>
        )}
      </div>

      <ShipmentEditor open={!!convert} onClose={() => setConvert(null)} prefill={prefill}
        onSaved={(s) => { updateQuote(convert.id, { status: 'converted', note: `${convert.note ? convert.note + '\n' : ''}Booked as ${s.code}` }); onConverted(s.id) }} />
    </div>
  )
}
