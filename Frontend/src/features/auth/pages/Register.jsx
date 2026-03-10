import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../auth.form.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.message || 'Registration failed')
      }

      const data = await response.json()
      console.log('Registration success', data)
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="form-container">
        <div className="brand-header">
          <h1>Create account</h1>
          <p>Start building your career profile in a few clicks.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a strong password"
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="button primary-button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>

          <p className="footer-text">
            Already have an account?{' '}
            <button className="button link-button" type="button" onClick={goToLogin}>
              Login here
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register
