import React, { useEffect, useState } from 'react'
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

export default function App() {
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

