import React, { useEffect, useLayoutEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromiseBar from './components/PromiseBar'
import ServicesBento from './components/ServicesBento'
import HowItWorks from './components/HowItWorks'
import TrackingShowcase from './components/TrackingShowcase'
import WhoWeHelp from './components/WhoWeHelp'
import Reviews from './components/Reviews'
import QuoteBanner from './components/QuoteBanner'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import TrackModal from './components/TrackModal'
import QuoteModal from './components/QuoteModal'
import { usePath } from './router'
import ServicePage from './pages/ServicePage'
import { Pricing, Locations, Industries, About } from './pages/InfoPages'
import { Careers, Blog, BlogPost, Faq, Reunions, Contact, NotFound } from './pages/CompanyPages'
import { SERVICES } from './pages/content'
import { ServicesIndex, HowItWorksPage, TrackPage } from './pages/HubPages'

function InnerPage({ path, onOpenQuote, onOpenTrack }) {
  const props = { onOpenQuote, onOpenTrack }
  const svc = path.match(/^\/services\/([\w-]+)$/)
  if (svc) return SERVICES.some((x) => x.slug === svc[1]) ? <ServicePage key={svc[1]} slug={svc[1]} {...props} /> : <NotFound />
  const post = path.match(/^\/blog\/([\w-]+)$/)
  if (post) return <BlogPost key={post[1]} slug={post[1]} {...props} />
  const pages = { '/pricing': Pricing, '/locations': Locations, '/industries': Industries, '/about': About, '/careers': Careers,
    '/blog': Blog, '/services': ServicesIndex, '/how-it-works': HowItWorksPage, '/track': TrackPage, '/faq': Faq, '/reunions': Reunions, '/contact': Contact }
  const Page = pages[path] || NotFound
  return <Page {...props} />
}

export default function App() {
  const path = usePath()
  // Every route opens at the top of the page (unless the URL targets a section)
  useLayoutEffect(() => {
    if (!window.location.hash || window.location.hash.startsWith('#/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [path])
  useEffect(() => {
    if (path === '/') document.title = 'PawPath Pet Travel | Pet Transport and Live Pet Tracking'
  }, [path])

  const [trackModalOpen, setTrackModalOpen] = useState(false)
  const [activeTrackingCode, setActiveTrackingCode] = useState('')
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)

  const handleOpenTrack = (code) => {
    setActiveTrackingCode(code || 'PPT-84SW-AR8D-QK3Z')
    setTrackModalOpen(true)
  }

  // Deep link from the admin dashboard: #/?track=PPT-XXXX-XXXX-XXXX
  useEffect(() => {
    const m = window.location.hash.match(/track=([A-Za-z0-9-]+)/)
    if (m) handleOpenTrack(m[1])
  }, [])

  const handleOpenQuote = () => {
    setQuoteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#fff8f1] text-[#17302d] font-sans antialiased selection:bg-coral selection:text-white">
      {/* Fixed Navigation Header */}
      <Navbar 
        onOpenQuote={handleOpenQuote}
        onOpenTrack={handleOpenTrack}
      />

      <main>
        {path !== '/' ? (
          <InnerPage path={path} onOpenQuote={handleOpenQuote} onOpenTrack={handleOpenTrack} />
        ) : (
        <>
        {/* Hero Section with Pet Card */}
        <Hero 
          onOpenQuote={handleOpenQuote}
          onOpenTrack={handleOpenTrack}
        />

        {/* 4-Item Elevated Promise Bar */}
        <PromiseBar />

        {/* 6-Card Services Bento Grid */}
        <ServicesBento 
          onOpenQuote={handleOpenQuote}
        />

        {/* 4-Step How It Works Process */}
        <HowItWorks />

        {/* Real-Time Pet Tracking Dashboard & Map Showcase */}
        <TrackingShowcase 
          onOpenTrack={handleOpenTrack}
        />

        {/* Who We Help Ruled Grid */}
        <WhoWeHelp 
          onOpenQuote={handleOpenQuote}
        />

        {/* Verified Reviews & Happy Reunions */}
        <Reviews />

        {/* Full-width Quote Form Banner */}
        <QuoteBanner />
        </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuote={handleOpenQuote}
      />

      {/* Floating Action Button (FAB Contact & Quick Track) */}
      <FloatingContact 
        onOpenTrack={handleOpenTrack}
      />

      {/* Live Tracking Interactive Modal */}
      <TrackModal 
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        trackingCode={activeTrackingCode}
      />

      {/* Instant Free Quote Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  )
}

