import React, { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import { useAuth } from '../context/AuthContext'

export default function AdminPanel(){
  const { token } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function load(){
      try{
        const data = await apiFetch('/admin/all-users', { method: 'GET' }, token)
        setUsers(data || [])
      }catch(e){ console.error(e) }
    }
    load()
  }, [token])

  async function clearCache(){
    try{
      await apiFetch('/admin/clear-app-cache', { method: 'GET' }, token)
      alert('Cache cleared')
    }catch(e){ alert('Failed') }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin</h2>
      <button onClick={clearCache} className="px-3 py-1 bg-blue-600 text-white rounded mb-4">Clear Cache</button>
      <div className="bg-white p-4 rounded shadow">
        {users.map(u => (
          <div key={String(u.id || u._id)} className="py-2 border-b last:border-b-0">
            <div className="font-medium">{u.userName}</div>
            <div className="text-sm text-slate-500">{u.email}</div>
          </div>
        ))}
      </div>
    </div>
  )
}