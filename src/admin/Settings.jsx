import React, { useState } from 'react'
import { Trash2, Download, Users, RotateCcw, ShieldCheck } from 'lucide-react'
import { saveSettings, changeCredentials, resetDB, deleteSubscriber } from '../lib/store'
import { useDB, Card, CardHeader, Button, Field, inputCls, EmptyState, Modal, fmtDate, toast, downloadCSV } from './ui'

export function Subscribers() {
  const db = useDB()
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-[26px]">Newsletter</h1>
          <p className="text-soft text-[14px]">{db.subscribers.length} people signed up from the website footer.</p>
        </div>
        <Button variant="outline" disabled={!db.subscribers.length}
          onClick={() => downloadCSV('pawpath-subscribers.csv', db.subscribers.map((s) => ({ email: s.email, subscribed: s.createdAt })))}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>
      <Card className="overflow-hidden">
        {db.subscribers.length === 0 ? <EmptyState icon={Users} title="No subscribers yet" /> : (
          <table className="w-full text-[14px]">
            <thead className="bg-[#fcfaf6] text-left text-[12px] uppercase tracking-wider text-soft">
              <tr><th className="px-5 py-3 font-bold">Email</th><th className="px-5 py-3 font-bold">Subscribed</th><th className="px-5 py-3" /></tr>
            </thead>
            <tbody className="divide-y divide-[#f3eee6]">
              {db.subscribers.map((s) => (
                <tr key={s.id}>
                  <td className="px-5 py-3 font-semibold">{s.email}</td>
                  <td className="px-5 py-3 text-soft">{fmtDate(s.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => { deleteSubscriber(s.id); toast('Subscriber removed') }}><Trash2 className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

export default function Settings({ admin }) {
  const db = useDB()
  const [company, setCompany] = useState(db.settings)
  const [cred, setCred] = useState({ current: '', email: admin.email, next: '', confirm: '' })
  const [credMsg, setCredMsg] = useState(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const saveCompany = (e) => { e.preventDefault(); saveSettings(company); toast('Settings saved') }

  const saveCred = async (e) => {
    e.preventDefault()
    setCredMsg(null)
    if (cred.next.length < 8) return setCredMsg({ err: true, text: 'New password must be at least 8 characters.' })
    if (cred.next !== cred.confirm) return setCredMsg({ err: true, text: 'New passwords do not match.' })
    const ok = await changeCredentials(cred.current, cred.email, cred.next)
    if (!ok) return setCredMsg({ err: true, text: 'Current password is incorrect.' })
    setCred({ current: '', email: cred.email, next: '', confirm: '' })
    setCredMsg({ err: false, text: 'Sign-in details updated.' })
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="font-heading font-black text-[26px]">Settings</h1>
        <p className="text-soft text-[14px]">Company details, admin account and demo data.</p>
      </div>

      <Card>
        <CardHeader title="Company details" subtitle="The coordinator phone appears on the public tracking page." />
        <form onSubmit={saveCompany} className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Company name" className="sm:col-span-2"><input className={inputCls} value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} /></Field>
          <Field label="Support email"><input type="email" className={inputCls} value={company.supportEmail} onChange={(e) => setCompany({ ...company, supportEmail: e.target.value })} /></Field>
          <Field label="Coordinator phone"><input className={inputCls} value={company.supportPhone} onChange={(e) => setCompany({ ...company, supportPhone: e.target.value })} /></Field>
          <div className="sm:col-span-2"><Button type="submit">Save details</Button></div>
        </form>
      </Card>

      <Card>
        <CardHeader title="Admin sign-in" subtitle="Change the email and password used to access this dashboard." />
        <form onSubmit={saveCred} className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Current password" className="sm:col-span-2"><input type="password" autoComplete="current-password" required className={inputCls} value={cred.current} onChange={(e) => setCred({ ...cred, current: e.target.value })} /></Field>
          <Field label="Admin email" className="sm:col-span-2"><input type="email" autoComplete="username" required className={inputCls} value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} /></Field>
          <Field label="New password" hint="At least 8 characters."><input type="password" autoComplete="new-password" required className={inputCls} value={cred.next} onChange={(e) => setCred({ ...cred, next: e.target.value })} /></Field>
          <Field label="Confirm new password"><input type="password" autoComplete="new-password" required className={inputCls} value={cred.confirm} onChange={(e) => setCred({ ...cred, confirm: e.target.value })} /></Field>
          {credMsg && <p className={`sm:col-span-2 text-[13.5px] font-semibold rounded-xl px-3 py-2.5 border ${credMsg.err ? 'text-red-600 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>{credMsg.text}</p>}
          <div className="sm:col-span-2"><Button type="submit"><ShieldCheck className="w-4 h-4" /> Update sign-in</Button></div>
        </form>
      </Card>

      <Card>
        <CardHeader title="Demo data" subtitle="Data is stored in this browser. Resetting restores the sample shipments, quotes and subscribers." />
        <div className="px-5 pb-5"><Button variant="danger" onClick={() => setConfirmReset(true)}><RotateCcw className="w-4 h-4" /> Reset demo data</Button></div>
      </Card>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset all demo data?"
        footer={<><Button variant="outline" onClick={() => setConfirmReset(false)}>Cancel</Button>
          <Button className="!bg-red-600 hover:!bg-red-700" onClick={() => { resetDB(); setCompany(db.settings); setConfirmReset(false); toast('Demo data reset') }}>Reset</Button></>}>
        <p className="text-[14px] text-soft">Every shipment, quote and subscriber you've added will be replaced with the sample data. Your admin sign-in stays the same.</p>
      </Modal>
    </div>
  )
}
