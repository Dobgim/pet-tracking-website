import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import './index.css'
import { installLinkInterceptor } from './router'

installLinkInterceptor()

const isAdmin = () => window.location.hash.startsWith('#/admin')

function Root() {
  const [admin, setAdmin] = useState(isAdmin())
  useEffect(() => {
    const onHash = () => setAdmin(isAdmin())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return admin ? <AdminApp /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
