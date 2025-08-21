// Simple API helper using fetch
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers||{})
    }
  })
  if(!res.ok) {
    let msg = 'Request failed'
    try { const data = await res.json(); msg = data.message || JSON.stringify(data) } catch {}
    throw new Error(msg)
  }
  const ct = res.headers.get('content-type') || ''
  if(ct.includes('application/pdf')) {
    return res.blob()
  }
  if(ct.includes('application/json')) return res.json()
  return res.text()
}

export const api = {
  register: (data: { name: string; email: string; password: string }) => request('/api/auth/register', { method:'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) => request('/api/auth/login', { method:'POST', body: JSON.stringify(data) }),
  generateInvoice: (token: string, items: { name: string; qty: number; rate: number }[]) => fetch(`${API_BASE}/api/invoice/generate`, {
    method:'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ items })
  }).then(async res => {
    if(!res.ok) { const txt = await res.text(); throw new Error(txt) }
    return res.blob()
  })
}
