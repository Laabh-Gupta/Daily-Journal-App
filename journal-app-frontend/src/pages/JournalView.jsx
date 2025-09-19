import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../api'
import { useAuth } from '../context/AuthContext'

export default function JournalView(){
  const { id } = useParams()
  const { token } = useAuth()
  const [entry, setEntry] = useState(null)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const data = await apiFetch(`/journal/id/${id}`, { method: 'GET' }, token)
        if(mounted) setEntry(data)
      }catch(e){ console.error(e) }
    }
    load()
    return ()=> mounted=false
  }, [id, token])

  if(!entry) return <div className="p-6">Loading…</div>
  const date = entry.date ? new Date(entry.date).toLocaleString() : '—'
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{entry.title}</h1>
          <div className="text-sm text-slate-500">{date}</div>
        </div>
        <div className="text-sm px-2 py-1 bg-slate-100 rounded">{entry.sentiment || 'N/A'}</div>
      </div>
      <div className="mt-4 text-slate-700 whitespace-pre-wrap">{entry.content}</div>
      <div className="mt-6">
        <Link to={`/journal/${id}/edit`} className="px-3 py-1 border rounded mr-2">Edit</Link>
        <Link to="/" className="px-3 py-1 bg-slate-800 text-white rounded">Back</Link>
      </div>
    </div>
  )
}