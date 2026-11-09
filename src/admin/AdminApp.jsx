import React, { useEffect, useState } from 'react'
import { LayoutDashboard, Package, Inbox, Users, Settings as SettingsIcon, LogOut, Menu, X, ExternalLink, Search } from 'lucide-react'
import PawIcon from '../components/PawIcon'
import { currentAdmin, logout, findShipment } from '../lib/store'
import { useDB, Toaster, toast } from './ui'
import Login from './Login'
import Overview from './Overview'
import Shipments from './Shipments'
import Quotes from './Quotes'
import Settings, { Subscribers } from './Settings'

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'shipments', label: 'Shipments', icon: Package },
  { id: 'quotes', label: 'Quote requests', icon: Inbox },
  { id: 'subscribers', label: 'Newsletter', icon: Users },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

const tabFromHash = () => {
  const t = window.location.hash.replace(/^#\/admin\/?/, '').split('?')[0]
  return NAV.some((n) => n.id === t) ? t : 'overview'
}

export default function AdminApp() {
  const [admin, setAdmin] = useState(currentAdmin())
  const [tab, setTab] = useState(tabFromHash())
  const [drawer, setDrawer] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [lookup, setLookup] = useState('')
  const db = useDB()

  useEffect(() => {
    document.title = 'Admin · PawPath Pet Travel'
    const onHash = () => setTab(tabFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (!admin) return <Login onSuccess={() => setAdmin(currentAdmin())} />

  const go = (id) => { window.location.hash = `#/admin/${id}`; setTab(id); setDrawer(false); window.scrollTo(0, 0) }
  const openShipment = (id) => { go('shipments'); setOpenId(id) }
  const newShipment = () => { go('shipments'); setEditorOpen(true) }
  const signOut = () => { logout(); setAdmin(null); window.location.hash = '#/admin' }

  const quickFind = (e) => {
    e.preventDefault()
    const s = findShipment(lookup)
    if (s) { openShipment(s.id); setLookup('') } else toast(`No shipment with code ${lookup.toUpperCase()}`)
  }

  const newQuotes = db.quotes.filter((q) => q.status === 'new').length

  const sidebar = (
    <div className="h-full flex flex-col bg-teal-darkdeep text-white">
      <a href="#/admin" onClick={(e) => { e.preventDefault(); go('overview') }} className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <span className="w-9 h-9 rounded-full bg-coral grid place-items-center shadow"><PawIcon className="w-[18px] h-[18px] fill-white" /></span>
        <span className="leading-none">
          <b className="block font-fredoka text-[20px]">PawPath</b>
          <small className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-teal-muted">Admin</small>
        </span>
      </a>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => go(id)}
            className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-[14px] font-heading font-bold transition-colors ${tab === id ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <Icon className={`w-[18px] h-[18px] ${tab === id ? 'text-coral' : ''}`} />
            <span className="flex-1 text-left">{label}</span>
            {id === 'quotes' && newQuotes > 0 && <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-coral text-[11.5px] grid place-items-center">{newQuotes}</span>}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <a href="#/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 h-10 rounded-xl text-[13.5px] font-bold text-white/70 hover:bg-white/5 hover:text-white">
          <ExternalLink className="w-4 h-4" /> View website
        </a>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
          <span className="w-8 h-8 rounded-full bg-teal grid place-items-center font-heading font-black text-[13px] uppercase">{admin.email[0]}</span>
          <div className="flex-1 min-w-0">
            <b className="block text-[13px] truncate">Coordinator</b>
            <span className="block text-[11.5px] text-white/60 truncate">{admin.email}</span>
          </div>
          <button type="button" onClick={signOut} aria-label="Sign out" title="Sign out" className="w-8 h-8 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f3ec] font-sans text-ink antialiased">
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[248px] z-40">{sidebar}</aside>

      {drawer && (
        <div className="lg:hidden fixed inset-0 z-[100] flex">
          <div className="w-[260px] max-w-[85vw] h-full shadow-2xl">{sidebar}</div>
          <button type="button" aria-label="Close menu" className="flex-1 bg-teal-darkdeep/50" onClick={() => setDrawer(false)} />
        </div>
      )}

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 h-16 bg-[#f7f3ec]/85 backdrop-blur border-b border-[#ebe4d8] flex items-center gap-3 px-4 sm:px-6">
          <button type="button" className="lg:hidden w-10 h-10 grid place-items-center rounded-xl hover:bg-white" onClick={() => setDrawer(true)} aria-label="Open menu">
            {drawer ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <form onSubmit={quickFind} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft" />
            <input value={lookup} onChange={(e) => setLookup(e.target.value)} placeholder="Jump to tracking code, e.g. PPT-84SW-AR8D-QK3Z"
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#e3ddd3] text-[13.5px] focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
          </form>
          <span className="hidden sm:inline ml-auto text-[13px] text-soft">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </header>

        <main className="px-4 sm:px-6 py-6 max-w-[1400px]">
          {tab === 'overview' && <Overview go={go} openShipment={openShipment} newShipment={newShipment} />}
          {tab === 'shipments' && <Shipments openId={openId} setOpenId={setOpenId} editorOpen={editorOpen} setEditorOpen={setEditorOpen} />}
          {tab === 'quotes' && <Quotes onConverted={openShipment} />}
          {tab === 'subscribers' && <Subscribers />}
          {tab === 'settings' && <Settings admin={admin} />}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
