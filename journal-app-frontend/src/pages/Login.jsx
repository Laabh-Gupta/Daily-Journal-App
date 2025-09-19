import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const { login } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      await login({ userName, password })
      nav('/')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Username" className="w-full border p-2 rounded" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-slate-900 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}