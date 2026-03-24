'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  bg: '#030308', bg1: '#060610', bg2: '#0A0A18', bg3: '#0E0E20',
  bd: '#1A1A35', gold: '#C8A74B', tx: '#C8C4BC', tx2: '#6E6A84', tx3: '#444060',
  g: '#2D7A5D', r: '#8A3333',
}

const ALLOWED_USERS = [
  { email: 'jeronimoolaresgoiti@gmail.com', name: 'Jeronimo Olares', role: 'admin' },
  { email: 'jortiz@dogmarobotics.com', name: 'Jero Ortiz', role: 'admin' },
]
const PASS = 'dogma2026'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Check if already logged in
  useEffect(() => {
    try {
      const session = localStorage.getItem('dogma_session')
      if (session) {
        const parsed = JSON.parse(session)
        if (parsed.email && ALLOWED_USERS.some(u => u.email === parsed.email)) {
          router.push('/dashboard')
          return
        }
      }
    } catch {}
    setLoading(false)
  }, [router])

  const handleLogin = () => {
    setError('')
    const user = ALLOWED_USERS.find(u => u.email === email.trim().toLowerCase())
    if (!user) {
      setError('Email not authorized')
      return
    }
    if (password !== PASS) {
      setError('Incorrect password')
      return
    }
    // Save session
    localStorage.setItem('dogma_session', JSON.stringify({
      email: user.email, name: user.name, role: user.role, at: new Date().toISOString()
    }))
    router.push('/dashboard')
  }

  if (loading) return (
    <div style={{ width: '100vw', height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: C.gold, fontSize: 16 }}>Loading...</div>
    </div>
  )

  return (
    <div style={{ width: '100vw', height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Sans',sans-serif" }}>
      <div style={{ width: 380, padding: 32, background: C.bg1, border: '1px solid ' + C.bd, borderRadius: 12 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: C.gold, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <span style={{ color: C.bg, fontWeight: 900, fontSize: 24, fontFamily: 'monospace' }}>D</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.gold }}>DOGMA OS</div>
          <div style={{ fontSize: 12, color: C.tx3, marginTop: 4 }}>Premium Industrial Dexterous Manipulation Platform</div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.tx3, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</div>
          <input
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin() }}
            placeholder="you@dogmarobotics.com"
            type="email"
            autoFocus
            style={{ width: '100%', padding: '10px 14px', fontSize: 14, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 6, color: C.tx, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.tx3, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</div>
          <input
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin() }}
            placeholder="Enter password"
            type="password"
            style={{ width: '100%', padding: '10px 14px', fontSize: 14, background: C.bg, border: '1px solid ' + (error ? C.r : C.bd), borderRadius: 6, color: C.tx, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Error */}
        {error && <div style={{ fontSize: 12, color: C.r, marginBottom: 12, textAlign: 'center' }}>{error}</div>}

        {/* Login button */}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', fontSize: 14, fontWeight: 700, background: C.gold + '15', color: C.gold, border: '1px solid ' + C.gold + '40', borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          Sign In
        </button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 10, color: C.tx3 }}>
          Authorized personnel only
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #444060; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  )
}
