import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import JournalForm from './pages/JournalForm'
import JournalView from './pages/JournalView'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/new" element={<ProtectedRoute><JournalForm/></ProtectedRoute>} />
          <Route path="/journal/:id/edit" element={<ProtectedRoute><JournalForm/></ProtectedRoute>} />
          <Route path="/journal/:id" element={<ProtectedRoute><JournalView/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}