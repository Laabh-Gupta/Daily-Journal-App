import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const { token, logout, user } = useAuth()
  const nav = useNavigate()
  return (
    <nav className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">JournalApp</Link>
        {token && <Link to="/" className="text-sm text-slate-600">My Entries</Link>}
      </div>
      <div className="flex items-center gap-3">
        {token ? (
          <>
            <Link to="/settings" className="text-sm">Settings</Link>
            <button onClick={()=>{ logout(); nav('/login') }} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
            <Link to="/signup" className="px-3 py-1 bg-slate-800 text-white rounded">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}