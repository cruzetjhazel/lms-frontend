'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (email && password) {
      try {
        // Validate email contains '@'
        if (email.includes('@')) {
          // Store user data
          const userData = {
            username: email.split('@')[0], // Use the part before @ as username
            role: 'User',
            email: email
          }
          localStorage.setItem('userData', JSON.stringify(userData))
          localStorage.setItem('authToken', 'demo-token')
          
          setShowSuccess(true)
          // Wait for 1 second to show the success message
          await new Promise(resolve => setTimeout(resolve, 1000))
          router.push('/dashboard')
        } else {
          setError('Please enter a valid email address')
        }
      } catch (err) {
        setError('An error occurred. Please try again.')
        console.error('Login error:', err)
      }
    } else {
      setError('Please enter email and password')
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#6B3F08] px-8 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 border border-amber-100 backdrop-blur-sm bg-opacity-90 animate-fade-in">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Login successful!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white text-red-600 px-8 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 border border-red-100 backdrop-blur-sm bg-opacity-90 animate-fade-in">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

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
        >
          Log In
        </button>
      </form>
      {/* Quote below the login box */}
      <p className="relative z-10 text-lg italic text-white mt-8 drop-shadow text-center">
        "A room without books is like a body without a soul."
      </p>
    </div>
  )
} 