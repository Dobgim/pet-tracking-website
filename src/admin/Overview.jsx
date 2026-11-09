import React from 'react'
import { Package, Plane, Inbox, TrendingUp, ArrowUpRight, AlertTriangle, Plus } from 'lucide-react'
import { STATUSES } from '../lib/store'
import { useDB, Card, CardHeader, StatusBadge, Button, fmtMoney, timeAgo, fmtDate } from './ui'

function Stat({ icon: Icon, label, value, sub, accent }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-bold text-soft">{label}</span>
        <span className={`w-9 h-9 rounded-xl grid place-items-center ${accent}`}><Icon className="w-[18px] h-[18px]" /></span>
      </div>
      <b className="block mt-2 font-heading font-black text-[28px] leading-none text-ink tabular-nums">{value}</b>
      <span className="block mt-2 text-[12.5px] text-soft">{sub}</span>
    </Card>
  )
}

export default function Overview({ go, openShipment, newShipment }) {
  const db = useDB()
  const sh = db.shipments
  const active = sh.filter((s) => !['delivered'].includes(s.status))
  const inTransit = sh.filter((s) => ['pickup', 'in_transit', 'customs', 'out_for_delivery'].includes(s.status))
  const onHold = sh.filter((s) => s.status === 'on_hold')
  const newQuotes = db.quotes.filter((q) => q.status === 'new')
  const revenue = sh.reduce((a, s) => a + (Number(s.price) || 0), 0)

  // Bookings per week for the last 8 weeks (by createdAt)
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = Date.now() - (7 - i) * 7 * 86400000
    const start = end - 7 * 86400000
    const inWeek = sh.filter((s) => { const t = new Date(s.createdAt).getTime(); return t > start && t <= end })
    return { label: new Date(end).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), value: inWeek.reduce((a, s) => a + (Number(s.price) || 0), 0), count: inWeek.length }
  })
  const maxWeek = Math.max(1, ...weeks.map((w) => w.value))

  const byStatus = STATUSES.map((st) => ({ ...st, count: sh.filter((s) => s.status === st.id).length })).filter((s) => s.count)
  const barColor = { slate: 'bg-slate-400', amber: 'bg-amber-400', sky: 'bg-sky-500', teal: 'bg-teal', violet: 'bg-violet-500', coral: 'bg-coral', green: 'bg-emerald-500', red: 'bg-red-500' }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-[26px] text-ink">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'} 👋</h1>
          <p className="text-soft text-[14px]">Here's what's happening across PawPath journeys today.</p>
        </div>
        <Button variant="coral" onClick={newShipment}><Plus className="w-4 h-4" /> New shipment</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat icon={Package} label="Active shipments" value={active.length} sub={`${sh.length} total on record`} accent="bg-teal/10 text-teal" />
        <Stat icon={Plane} label="Pets on the move" value={inTransit.length} sub="Picked up through out for delivery" accent="bg-sky-50 text-sky-600" />
        <Stat icon={Inbox} label="New quote requests" value={newQuotes.length} sub={`${db.quotes.length} quotes in total`} accent="bg-coral/10 text-coral-dark" />
        <Stat icon={TrendingUp} label="Booked revenue" value={fmtMoney(revenue)} sub="All shipments on record" accent="bg-emerald-50 text-emerald-600" />
      </div>

      {onHold.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-[14px] text-red-800">
          <AlertTriangle className="w-5 h-5 flex-none" />
          <span className="flex-1"><b>{onHold.length} shipment{onHold.length > 1 ? 's' : ''} on hold</b>: {onHold.map((s) => s.pet.name).join(', ')}. Owners are waiting on next steps.</span>
          <Button variant="danger" size="sm" onClick={() => openShipment(onHold[0].id)}>Review</Button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader title="Booked revenue" subtitle="Value of new bookings per week, last 8 weeks" />
          <div className="px-5 pb-5">
            <div className="h-[200px] flex items-end gap-2 sm:gap-3 border-b border-[#f0eae1]">
              {weeks.map((w) => (
                <div key={w.label} className="flex-1 h-full flex flex-col justify-end items-center group">
                  <span className="text-[11px] font-bold text-ink opacity-0 group-hover:opacity-100 transition-opacity mb-1 tabular-nums">{fmtMoney(w.value)}</span>
                  <div className="w-full max-w-[44px] rounded-t-md bg-teal/85 group-hover:bg-coral transition-colors" style={{ height: `${Math.max(2, (w.value / maxWeek) * 85)}%` }} title={`${w.count} booking(s), ${fmtMoney(w.value)}`} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-3 mt-2">
              {weeks.map((w) => <span key={w.label} className="flex-1 text-center text-[11px] text-soft">{w.label}</span>)}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Shipments by status" subtitle={`${sh.length} shipments`} />
          <div className="px-5 pb-5 space-y-3">
            {byStatus.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="font-semibold text-ink">{s.label}</span>
                  <span className="font-bold tabular-nums text-soft">{s.count}</span>
                </div>
                <div className="h-2 rounded-full bg-[#f3eee6] overflow-hidden">
                  <div className={`h-full rounded-full ${barColor[s.tone]}`} style={{ width: `${(s.count / sh.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 overflow-hidden">
          <CardHeader title="Active journeys" subtitle="Latest shipments still in progress"
            action={<Button variant="ghost" size="sm" onClick={() => go('shipments')}>View all <ArrowUpRight className="w-4 h-4" /></Button>} />
          <ul className="divide-y divide-[#f3eee6]">
            {active.slice(0, 5).map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => openShipment(s.id)} className="w-full text-left flex items-center gap-4 px-5 py-3.5 hover:bg-[#fcfaf6] transition-colors">
                  <img src={s.pet.photo} alt="" className="w-10 h-10 rounded-xl object-cover flex-none" />
                  <div className="flex-1 min-w-0">
                    <b className="block text-[14px] text-ink truncate">{s.pet.name} <span className="font-normal text-soft">· {s.pet.breed}</span></b>
                    <span className="block text-[12.5px] text-soft truncate">{s.from} → {s.to}</span>
                  </div>
                  <div className="hidden md:block w-28">
                    <div className="h-1.5 rounded-full bg-[#f3eee6] overflow-hidden"><div className="h-full bg-coral rounded-full" style={{ width: `${s.progress}%` }} /></div>
                    <span className="text-[11px] text-soft">ETA {fmtDate(s.eta)}</span>
                  </div>
                  <StatusBadge status={s.status} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Recent activity" />
          <ul className="px-5 pb-5 space-y-3.5 max-h-[360px] overflow-y-auto">
            {db.activity.slice(0, 12).map((a) => (
              <li key={a.id} className="flex gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-coral flex-none" />
                <div className="min-w-0">
                  <p className="text-[13.5px] text-ink leading-snug">{a.text}</p>
                  <span className="text-[12px] text-soft">{timeAgo(a.at)}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
