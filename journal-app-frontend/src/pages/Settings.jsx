import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api'

export default function Settings(){
  const { token, user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  // This page shows a toggle for sentimentAnalysis & allows updating username/password
  useEffect(()=>{
  },[])

  async function handleUpdate(payload){
    try{
      setLoading(true)
      await apiFetch('/user', { method: 'PUT', body: payload }, token)
      setMsg('Saved')
    }catch(e){ setMsg('Save failed') }
    finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <p className="text-sm text-slate-500">Account: {user?.userName || '—'}</p>
      <div className="mt-4">
        <button onClick={()=>handleUpdate({})} className="px-3 py-1 border rounded">Save (example)</button>
      </div>
      {msg && <div className="mt-2 text-sm">{msg}</div>}
    </div>
  )
}