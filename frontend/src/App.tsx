import { useEffect, useState } from 'react'

function App() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status === 'ok' ? 'ok' : 'error'))
      .catch(() => setBackendStatus('error'))
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Event Management Platform</h1>
      <p>
        Backend status:{' '}
        <strong>
          {backendStatus === 'checking' ? 'checking...' : backendStatus === 'ok' ? 'connected' : 'unreachable'}
        </strong>
      </p>
    </main>
  )
}

export default App
