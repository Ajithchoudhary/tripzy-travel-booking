import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import TripzyLogo from '../Components/TripzyLogo'
import { useAuth } from '../context/AuthContext'
import { useFormValidation } from '../hooks/useFormValidation'

const validationRules = {
  name: ['required', (v) => (v.length >= 2 ? '' : 'Name must be at least 2 characters')],
  email: ['required', 'email'],
  phone: ['phone'],
  password: ['required', (v) => (v.length >= 6 ? '' : 'Password must be at least 6 characters')],
  confirmPassword: ['required'],
}

function Signup() {
  const { signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useFormValidation(
      { name: '', email: '', phone: '', password: '', confirmPassword: '' },
      validationRules
    )

  if (isAuthenticated) {
    return <Navigate to="/tours" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!validateAll()) return

    const result = signup({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    })

    if (result.success) {
      navigate('/tours', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-page" style={{ backgroundImage: 'url(/images/bg/auth-bg.jpg)' }}>
      <div className="auth-overlay" />

      <div className="auth-back-logo">
        <TripzyLogo linkTo={false} />
      </div>

      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-card-logo">
            <TripzyLogo linkTo={false} />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to start booking your dream trips</p>

        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-field-icon">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Full Name"
                className={touched.name && errors.name ? 'input-error' : ''}
              />
            </div>
            {touched.name && errors.name && (
              <span className="error-msg">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-field-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="xxxx@gmail.com"
                className={touched.email && errors.email ? 'input-error' : ''}
              />
            </div>
            {touched.email && errors.email && (
              <span className="error-msg">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-field-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+91 xxxxx xxxxx"
                className={touched.phone && errors.phone ? 'input-error' : ''}
              />
            </div>
            {touched.phone && errors.phone && (
              <span className="error-msg">{errors.phone}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-field-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Min 6 chars"
                  className={touched.password && errors.password ? 'input-error' : ''}
                />
              </div>
              {touched.password && errors.password && (
                <span className="error-msg">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-field-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Repeat"
                  className={touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="error-msg">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <Button type="submit" className="btn-block">Create Account</Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
