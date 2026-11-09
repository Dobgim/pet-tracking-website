import { useEffect, useState } from 'react'

// Tiny History-API router so pages live at real paths (/pricing, /services/air …).
// The admin dashboard stays on the hash route #/admin.

const EVT = 'pawpath:navigate'

export function navigate(to) {
  const url = new URL(to, window.location.origin)
  const samePage = url.pathname === window.location.pathname
  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new Event(EVT))
  if (url.hash && url.hash.length > 1 && !url.hash.startsWith('#/')) {
    // let the new page render, then scroll to the anchor
    setTimeout(() => document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto' }), samePage ? 0 : 60)
  } else if (samePage) {
    // re-clicking the current page's link returns to its top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener('popstate', update)
    window.addEventListener(EVT, update)
    return () => { window.removeEventListener('popstate', update); window.removeEventListener(EVT, update) }
  }, [])
  return path.replace(/\/+$/, '') || '/'
}

// Intercept clicks on same-origin links so navigation doesn't reload the page.
export function installLinkInterceptor() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest('a')
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return
    const href = a.getAttribute('href')
    if (!href) return
    if (href.startsWith('#/')) return // admin hash routes
    if (href.startsWith('#')) {
      // plain anchor: scroll on this page if the section exists, else go home
      if (!document.getElementById(href.slice(1)) && window.location.pathname !== '/') {
        e.preventDefault(); navigate('/' + href)
      }
      return
    }
    if (!href.startsWith('/')) return
    e.preventDefault()
    navigate(href)
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
