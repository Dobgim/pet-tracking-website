import React, { useState, useEffect } from 'react'
import PawIcon from './PawIcon'
import { ChevronDown, Search, X, Menu, Phone } from 'lucide-react'

export default function Navbar({ onOpenQuote, onOpenTrack }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [quickTrackCode, setQuickTrackCode] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleQuickTrack = (e) => {
    e.preventDefault()
    if (quickTrackCode.trim()) {
      onOpenTrack(quickTrackCode.trim())
      setMobileMenuOpen(false)
      setQuickTrackCode('')
    }
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 pt-3 md:pt-4 px-3 sm:px-6 transition-all duration-300`}
      >
        <div className="max-w-[1240px] mx-auto">
          <div
            className={`flex items-center justify-between gap-4 h-[66px] px-3 sm:px-5 md:px-6 rounded-full transition-all duration-300 ${
              scrolled ? 'glass-header-scrolled shadow-2xl' : 'glass-header'
            }`}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 text-white no-underline group select-none">
              <span className="w-10 h-10 rounded-full bg-coral grid place-items-center flex-none shadow-md group-hover:scale-105 transition-transform">
                <PawIcon className="w-5 h-5 fill-white" />
              </span>
              <span className="flex flex-col justify-center leading-none">
                <b className="font-fredoka text-[22px] tracking-tight text-white leading-none">PawPath</b>
                <small className="font-semibold text-[11px] text-[#9ccfc7] mt-1 tracking-wide">
                  Pet <em className="not-italic text-coral">Travel</em>
                </small>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 text-[15px] font-heading font-bold text-white">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 py-2 px-1 hover:text-coral-light transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-coral-light' : ''
                    }`}
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute top-[calc(100%+14px)] -left-4 w-[310px] bg-white text-ink rounded-2xl p-2.5 shadow-2xl border border-[#f3ece3] z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="space-y-1">
                      <a
                        href="/services/air"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Pet air travel</b>
                        <small className="block text-[12px] text-soft font-normal">In cabin and pet air cargo</small>
                      </a>
                      <a
                        href="/services/road"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Door to door by road</b>
                        <small className="block text-[12px] text-soft font-normal">Climate-controlled pet vans</small>
                      </a>
                      <a
                        href="/services/international"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">International pet relocation</b>
                        <small className="block text-[12px] text-soft font-normal">Moving abroad with your pet</small>
                      </a>
                      <a
                        href="/services/paperwork"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Vet and travel paperwork</b>
                        <small className="block text-[12px] text-soft font-normal">Health certificates and permits</small>
                      </a>
                      <a
                        href="/services/quarantine"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Quarantine and import support</b>
                        <small className="block text-[12px] text-soft font-normal">Arrival rules handled for you</small>
                      </a>
                      <a
                        href="/services/boarding"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Boarding and layover care</b>
                        <small className="block text-[12px] text-soft font-normal">Safe stays between legs</small>
                      </a>
                      <a
                        href="/services/crates"
                        onClick={() => setServicesOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Crates and travel prep</b>
                        <small className="block text-[12px] text-soft font-normal">The right crate, sized and fitted</small>
                      </a>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#f7f1ea] mt-2 pt-2 px-2 text-[13px] font-semibold">
                      <a href="/industries" onClick={() => setServicesOpen(false)} className="text-soft hover:text-coral">
                        Who we help
                      </a>
                      <a href="/services" onClick={() => setServicesOpen(false)} className="text-teal hover:text-coral">
                        All services &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="/track" className="hover:text-coral-light transition-colors py-2 px-1">
                Track
              </a>
              <a href="/pricing" className="hover:text-coral-light transition-colors py-2 px-1">
                Pricing
              </a>
              <a href="/locations" className="hover:text-coral-light transition-colors py-2 px-1">
                Locations
              </a>

              {/* Company Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCompanyOpen(!companyOpen)}
                  className="flex items-center gap-1.5 py-2 px-1 hover:text-coral-light transition-colors"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      companyOpen ? 'rotate-180 text-coral-light' : ''
                    }`}
                  />
                </button>

                {companyOpen && (
                  <div className="absolute top-[calc(100%+14px)] -left-4 w-[260px] bg-white text-ink rounded-2xl p-2.5 shadow-2xl border border-[#f3ece3] z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="space-y-1">
                      <a
                        href="/about"
                        onClick={() => setCompanyOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">About us</b>
                        <small className="block text-[12px] text-soft font-normal">Our story and team</small>
                      </a>
                      <a
                        href="/careers"
                        onClick={() => setCompanyOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Careers</b>
                        <small className="block text-[12px] text-soft font-normal">Open roles</small>
                      </a>
                      <a
                        href="/blog"
                        onClick={() => setCompanyOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Blog</b>
                        <small className="block text-[12px] text-soft font-normal">Pet travel guides</small>
                      </a>
                      <a
                        href="/faq"
                        onClick={() => setCompanyOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">FAQ</b>
                        <small className="block text-[12px] text-soft font-normal">Answers to common questions</small>
                      </a>
                      <a
                        href="/reunions"
                        onClick={() => setCompanyOpen(false)}
                        className="block px-3.5 py-2 rounded-xl hover:bg-[#fff8f1] transition-colors"
                      >
                        <b className="block text-[14px] font-bold text-ink">Happy reunions</b>
                        <small className="block text-[12px] text-soft font-normal">Pets back with their families</small>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="/contact" className="hover:text-coral-light transition-colors py-2 px-1">
                Contact
              </a>
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="#/admin"
                className="hidden sm:inline-block text-[15px] font-heading font-bold text-white hover:text-coral-light transition-colors px-2 py-1"
              >
                Sign in
              </a>
              <button
                type="button"
                onClick={onOpenQuote}
                className="bg-coral hover:bg-coral-dark text-white font-heading font-extrabold text-[14px] sm:text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg shadow-coral/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get a quote
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 flex flex-col justify-center items-center gap-1.5 transition-colors"
                aria-label="Open menu"
              >
                <span className="w-5 h-[2px] bg-white rounded-full"></span>
                <span className="w-5 h-[2px] bg-white rounded-full"></span>
                <span className="w-5 h-[2px] bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (mnav) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#f4f3f9]/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200">
          <div className="max-w-[560px] mx-auto px-5 py-6 space-y-6">
            {/* Top Bar with Logo & Close */}
            <div className="flex items-center justify-between">
              <a href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-full bg-coral grid place-items-center flex-none">
                  <PawIcon className="w-5 h-5 fill-white" />
                </span>
                <span className="flex flex-col justify-center leading-none">
                  <b className="font-fredoka text-[22px] tracking-tight text-teal-dark">PawPath</b>
                  <small className="font-semibold text-[11px] text-teal mt-0.5">Pet Travel</small>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-xl bg-white border border-[#17302d]/15 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            {/* Quick Track Input */}
            <form onSubmit={handleQuickTrack} className="flex gap-2">
              <input
                type="text"
                value={quickTrackCode}
                onChange={(e) => setQuickTrackCode(e.target.value)}
                placeholder="Enter a tracking number"
                className="flex-1 bg-white border border-[#eae3d9] rounded-xl px-4 py-3 text-[15px] text-ink focus:outline-none focus:border-teal"
              />
              <button
                type="submit"
                className="bg-coral text-white font-heading font-bold px-5 rounded-xl shadow-md hover:bg-coral-dark transition-colors"
              >
                Track
              </button>
            </form>

            {/* Main Menu Links */}
            <div className="divide-y divide-ink/10 border-t border-ink/10">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[19px] font-heading font-bold text-coral"
              >
                Home
              </a>
              <a
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[19px] font-heading font-bold text-ink hover:text-coral transition-colors"
              >
                Track your pet
              </a>
              <a
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[19px] font-heading font-bold text-ink hover:text-coral transition-colors"
              >
                Pricing
              </a>
              <a
                href="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[19px] font-heading font-bold text-ink hover:text-coral transition-colors"
              >
                Locations
              </a>
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[19px] font-heading font-bold text-ink hover:text-coral transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <small className="col-span-2 text-[11px] font-extrabold tracking-wider uppercase text-soft">
                Services
              </small>
              <a
                href="/services/air"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Pet air travel
              </a>
              <a
                href="/services/road"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Door to door by road
              </a>
              <a
                href="/services/international"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                International relocation
              </a>
              <a
                href="/services/paperwork"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Vet & paperwork
              </a>
              <a
                href="/services/quarantine"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Quarantine support
              </a>
              <a
                href="/services/boarding"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Boarding care
              </a>
              <a
                href="/services/crates"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Crates & prep
              </a>
              <a
                href="/industries"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Who we help
              </a>
            </div>

            {/* Company Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              <small className="col-span-2 text-[11px] font-extrabold tracking-wider uppercase text-soft">
                Company
              </small>
              <a
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                About us
              </a>
              <a
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Careers
              </a>
              <a
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Blog
              </a>
              <a
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                FAQ
              </a>
              <a
                href="/reunions"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 text-[14.5px] font-medium text-ink hover:text-coral py-1"
              >
                Happy reunions
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <a
                href="#/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-3 bg-white border border-[#ddd6cb] text-ink font-heading font-bold rounded-full text-center"
              >
                Sign in
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenQuote()
                }}
                className="py-3 bg-coral hover:bg-coral-dark text-white font-heading font-extrabold rounded-full shadow-lg shadow-coral/30 text-center"
              >
                Get a quote
              </button>
            </div>

            {/* Phone Help */}
            <p className="text-center text-[14px] text-soft pt-2">
              Questions? Call{' '}
              <a href="tel:+15550100199" className="font-bold text-ink hover:text-coral inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-coral inline" /> +1 555 010 0199
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

