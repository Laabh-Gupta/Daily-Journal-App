import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { token } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const data = await apiFetch('/journal', { method: 'GET' }, token)
        if(mounted) setEntries(data || [])
      }catch(e){ setErr(e.message) }
      finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=> mounted=false
  },[token])

  async function handleDelete(id){
    if(!confirm('Delete entry?')) return
    try{
      await apiFetch(`/journal/id/${id}`, { method: 'DELETE' }, token)
      setEntries(prev => prev.filter(x => String(x.id || x._id) !== String(id)))
    }catch(e){ alert('Delete failed: ' + (e.message || e)) }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Your Journal</h1>
        <div className="flex gap-2">
          <Link to="/new" className="px-3 py-1 bg-slate-800 text-white rounded">New</Link>
          <button onClick={()=>nav('/settings')} className="px-3 py-1 border rounded">Settings</button>
        </div>
      </div>

      {loading && <div>Loading…</div>}
      {err && <div className="text-red-600">{err}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.length === 0 && !loading && <div className="text-slate-500">No entries yet — click New to add one.</div>}
        {entries.map(en => {
          const id = en.id || en._id
          return (
            <article key={String(id)} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{en.title}</h3>
                  <div className="text-sm text-slate-500">{en.date ? new Date(en.date).toLocaleString() : '—'}</div>
                </div>
                <div className="text-sm">
                  <div className="px-2 py-1 bg-slate-100 rounded">{en.sentiment ?? 'N/A'}</div>
                </div>
              </div>
              <p className="mt-3 text-slate-700 line-clamp-3">{en.content}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/journal/${id}`} className="text-sm px-2 py-1 border rounded">View</Link>
                <button onClick={()=>nav(`/journal/${id}/edit`)} className="text-sm px-2 py-1 border rounded">Edit</button>
                <button onClick={()=>handleDelete(id)} className="text-sm px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}