import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../api'

export default function WeatherWidget({ city = 'Mumbai' }){
  const { token } = useAuth()
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const data = await apiFetch(`/weather/${encodeURIComponent(city)}`, { method: 'GET' }, token)
        if (mounted) setWeather(data)
      }catch(e){
        if (mounted) setError(true)
      }
    }
    load()
    return ()=> mounted = false
  }, [city, token])

  if (error) return <div className="text-sm text-slate-500">Weather: not available</div>
  if (!weather) return <div className="text-sm text-slate-500">Weather: loading…</div>

  // The backend may return a nested structure; be resilient
  const feels = (weather?.current?.feelslike) || weather?.current?.temp || weather?.feelsLike
  return (
    <div className="text-sm text-slate-700">{city}: feels like {feels}</div>
  )
}