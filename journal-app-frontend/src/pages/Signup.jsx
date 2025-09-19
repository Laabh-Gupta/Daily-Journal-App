import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [form, setForm] = useState({ userName: '', email: '', password: '', sentimentAnalysis: false })
  const [err, setErr] = useState(null)
  const { signup } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      await signup(form)
      nav('/login')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={form.userName} onChange={(e)=>setForm({...form, userName: e.target.value})} placeholder="Username" className="w-full border p-2 rounded" />
        <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="Email" className="w-full border p-2 rounded" />
        <input value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.sentimentAnalysis} onChange={(e)=>setForm({...form, sentimentAnalysis: e.target.checked})} /> Enable sentiment analysis</label>
        <button className="w-full bg-slate-900 text-white p-2 rounded">Sign up</button>
      </form>
    </div>
  )
}