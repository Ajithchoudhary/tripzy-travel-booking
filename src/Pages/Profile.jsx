import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'
import Icon from '../Components/Icon'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { formatRupee } from '../utils/bookingDraft'

const validationRules = {
  name: ['required'],
  email: ['required', 'email'],
  phone: ['phone'],
}

function getTripStatus(travelDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(travelDate) >= today ? 'upcoming' : 'completed'
}

function Profile() {
  const { auth } = useAuth()
  const { bookings } = useBooking()
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, validateAll, setValues } =
    useFormValidation(
      { name: auth?.name || '', email: auth?.email || '', phone: auth?.phone || '' },
      validationRules
    )

  const userBookings = bookings;
  const upcoming = userBookings.filter((b) => getTripStatus(b.travelDate) === 'upcoming')
  const completed = userBookings.filter((b) => getTripStatus(b.travelDate) === 'completed')
  const totalSpent = userBookings.reduce((sum, b) => sum + (b.price || b.totalAmount || 0), 0)

  const recentBookings = [...userBookings]
    .sort((a, b) => new Date(b.bookedAt || b.travelDate) - new Date(a.bookedAt || a.travelDate))
    .slice(0, 5)

  const handleEdit = () => {
    setValues({ name: auth.name, email: auth.email, phone: auth.phone || '' })
    setIsEditing(true)
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!validateAll()) return
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }
  if (!auth) return null
  return (
    <div className="page profile-page">
      <div className="page-header">
        <div className="container">
          <h1>Travel Dashboard</h1>
          <p>Your profile, bookings, and travel statistics at a glance</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="dashboard-stats fade-in-up">
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-icon"><Icon name="ticket" size={26} /></span>
              <span className="dashboard-stat-value">{userBookings.length}</span>
              <span className="dashboard-stat-label">Total Bookings</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-icon"><Icon name="plane" size={26} /></span>
              <span className="dashboard-stat-value">{upcoming.length}</span>
              <span className="dashboard-stat-label">Upcoming Trips</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-icon"><Icon name="globe" size={26} /></span>
              <span className="dashboard-stat-value">{completed.length}</span>
              <span className="dashboard-stat-label">Completed Trips</span>
            </div>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-icon"><Icon name="wallet" size={26} /></span>
              <span className="dashboard-stat-value">{formatRupee(totalSpent)}</span>
              <span className="dashboard-stat-label">Total Spent</span>
            </div>
          </div>

          <div className="profile-dashboard-grid">
            <div className="profile-card card fade-in-up">
              <div className="profile-avatar">{auth.name.charAt(0).toUpperCase()}</div>

              {saved && (
                <div className="alert alert-success">Profile updated successfully!</div>
              )}

              {!isEditing ? (
                <>
                  <h2>{auth.name}</h2>
                  <p className="profile-email">{auth.email}</p>
                  <p>{auth.phone || 'No phone added'}</p>
                  <p className="member-since">Member since {auth.memberSince}</p>
                  <Button onClick={handleEdit} size="sm">Edit Profile</Button>
                </>
              ) : (
                <form onSubmit={handleSave}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.name && errors.name ? 'input-error' : ''}
                    />
                    {touched.name && errors.name && (
                      <span className="error-msg">{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className={touched.email && errors.email ? 'input-error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.phone && errors.phone ? 'input-error' : ''}
                    />
                  </div>
                  <div className="form-actions">
                    <Button type="submit" size="sm">Save</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="profile-main">
              <div className="profile-panel card fade-in-up">
                <div className="panel-header">
                  <h2>Upcoming Trips</h2>
                  <Link to="/bookings" className="btn btn-outline btn-sm">View All</Link>
                </div>
                {upcoming.length === 0 ? (
                  <p className="panel-empty">No upcoming trips. <Link to="/tours">Book a tour</Link></p>
                ) : (
                  <div className="recent-list">
                    {upcoming.slice(0, 3).map((b) => (
                      <div key={b.id} className="recent-item">
                        <div>
                          <strong>{b.tourTitle}</strong>
                          <span>{b.tourLocation} · {b.travelDate}</span>
                        </div>
                        <span className="recent-price">{formatRupee(b.price || b.totalAmount)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="profile-panel card fade-in-up">
                <h2>Travel Statistics</h2>
                <div className="travel-stats-list">
                  <div className="travel-stat-row">
                    <span>Countries Visited</span>
                    <strong>{new Set(userBookings.map((b) => b.tourLocation)).size}</strong>
                  </div>
                  <div className="travel-stat-row">
                    <span>Total Travelers Booked</span>
                    <strong>{userBookings.reduce((sum, b) => sum + (b.travelers || 0), 0)}</strong>
                  </div>
                  <div className="travel-stat-row">
                    <span>Completed Trips</span>
                    <strong>{completed.length}</strong>
                  </div>
                </div>
              </div>

              <div className="profile-panel card fade-in-up">
                <h2>Recent Activity</h2>
                {recentBookings.length === 0 ? (
                  <p className="panel-empty">No recent activity yet.</p>
                ) : (
                  <div className="activity-list">
                    {recentBookings.map((b) => (
                      <div key={b.id} className="activity-item">
                        <span className="activity-dot" />
                        <div>
                          <strong>Booked {b.tourTitle}</strong>
                          <span>{b.travelDate} · {formatRupee(b.price || b.totalAmount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
