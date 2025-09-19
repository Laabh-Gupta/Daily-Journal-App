import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch } from '../api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) localStorage.setItem('jwt', token)
    else localStorage.removeItem('jwt')
  }, [token])

  async function login({ userName, password }){
    // POST /public/login -> returns plain token string on success
    const res = await fetch((import.meta.env.VITE_API_BASE || 'http://localhost:8080') + '/public/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password })
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(errText || 'Login failed')
    }
    const jwt = await res.text()
    setToken(jwt)
    // optionally fetch user info
    setUser({ userName })
    return jwt
  }

  async function signup(payload){
    // POST /public/signup
    await apiFetch('/public/signup', { method: 'POST', body: payload })
  }

  function logout(){
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}