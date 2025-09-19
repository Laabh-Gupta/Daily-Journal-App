// Minimal fetch wrapper. All paths are relative to API_BASE.
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export async function apiFetch(path, opts = {}, token) {
  const url = `${API_BASE}${path}`
  const headers = new Headers(opts.headers || {})
  headers.set('Accept', 'application/json')
  if (!(opts.body instanceof FormData) && !(opts.body instanceof URLSearchParams)) {
    if (opts.body && typeof opts.body === 'object') {
      opts.body = JSON.stringify(opts.body)
      headers.set('Content-Type', 'application/json')
    }
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(url, { ...opts, headers, credentials: 'include' })
  const text = await res.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch(e) { data = text }
  if (!res.ok) {
    const err = new Error('API request failed')
    err.status = res.status
    err.body = data
    throw err
  }
  return data
}