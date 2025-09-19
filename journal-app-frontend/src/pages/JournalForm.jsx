import React, { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function JournalForm(){
  const { id } = useParams()
  const { token } = useAuth()
  const [entry, setEntry] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    if (!id) return
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const data = await apiFetch(`/journal/id/${id}`, { method: 'GET' }, token)
        if(mounted) setEntry(data)
      }catch(e){ console.error(e) }
      finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=> mounted=false
  },[id, token])

  async function handleSubmit(e){
    e.preventDefault()
    try{
      if (id){
        await apiFetch(`/journal/id/${id}`, { method: 'PUT', body: entry }, token)
      } else {
        await apiFetch('/journal', { method: 'POST', body: entry }, token)
      }
      nav('/')
    }catch(e){ alert('Save failed: ' + (e.message||e)) }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'New'} Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={entry.title || ''} onChange={(e)=>setEntry({...entry, title: e.target.value})} className="w-full border p-2 rounded" placeholder="Title" />
        <textarea value={entry.content || ''} onChange={(e)=>setEntry({...entry, content: e.target.value})} className="w-full border p-2 rounded h-48" placeholder="Write your thoughts..."></textarea>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-900 text-white rounded">Save</button>
          <button type="button" onClick={()=>nav('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}