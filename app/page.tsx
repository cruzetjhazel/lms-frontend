'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import api from './api/config'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      
      // Store the token and user data
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify(user))
      
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/books')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background image*/}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      />
      {/* Welcome header */}
      <h1 className="relative z-10 text-7xl font-bold text-white mb-2 drop-shadow text-center">
        Welcome
      </h1>
      <h2 className="relative z-10 text-2xl text-white mb-8 drop-shadow text-center">
        to Library Management System
      </h2>
      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#6B3F08' }}>
          Login
        </h1>
        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full text-white py-2 rounded-md transition hover:brightness-110"
          style={{ backgroundColor: '#6B3F08' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {/* Quote below the login box */}
      <p className="relative z-10 text-lg italic text-white mt-8 drop-shadow text-center">
        "A room without books is like a body without a soul."
      </p>
    </div>
  )
}
