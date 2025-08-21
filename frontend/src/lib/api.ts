// Production-ready API helper using fetch
const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl) return envUrl
  
  // Fallback for different environments
  if (import.meta.env.PROD) {
    return 'https://your-railway-app.railway.app'
  }
  return 'http://localhost:3000'
}

export const API_BASE = getApiBase()

async function request(path: string, opts: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout
  
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(opts.headers||{})
      }
    })
    
    clearTimeout(timeoutId)
    
    if(!res.ok) {
      let msg = 'Request failed'
      try { 
        const data = await res.json()
        msg = data.message || data.error || JSON.stringify(data)
      } catch {
        msg = `HTTP ${res.status}: ${res.statusText}`
      }
      throw new Error(msg)
    }
    
    const ct = res.headers.get('content-type') || ''
    if(ct.includes('application/pdf')) {
      return res.blob()
    }
    if(ct.includes('application/json')) return res.json()
    return res.text()
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again')
    }
    throw error
  }
}

export const api = {
  register: (data: { name: string; email: string; password: string }) => request('/api/auth/register', { method:'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) => request('/api/auth/login', { method:'POST', body: JSON.stringify(data) }),
  forgot: (data: { email: string }) => request('/api/auth/forgot', { method: 'POST', body: JSON.stringify(data) }),
  reset: (data: { token: string; password: string }) => request('/api/auth/reset', { method: 'POST', body: JSON.stringify(data) }),
  generateInvoice: (token: string, items: { name: string; qty: number; rate: number }[]) => fetch(`${API_BASE}/api/invoice/generate`, {
    method:'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ items })
  }).then(async res => {
    if(!res.ok) { const txt = await res.text(); throw new Error(txt) }
    return res.blob()
  })
}
