import { Link } from 'react-router-dom'
import Button from '../Components/Button'
import Icon from '../Components/Icon'
import { useBooking } from '../context/BookingContext'
import { formatRupee } from '../utils/bookingDraft'

function getTripStatus(travelDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tripDate = new Date(travelDate)
  return tripDate >= today ? 'upcoming' : 'completed'
}

function BookingCard({ booking, onDelete }) {
  const status = booking.status || getTripStatus(booking.travelDate)

  return (
    <article className={`booking-card-item card fade-in-up ${status}`}>
      {booking.tourImage && (
        <div className="booking-card-image">
          <img src={booking.tourImage} alt={booking.tourTitle} />
          <span className={`booking-status-badge ${status}`}>
            {status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
        </div>
      )}
      <div className="booking-card-content">
        <div className="booking-card-header">
          <div>
            <h3>{booking.tourTitle}</h3>
            <p className="booking-card-location">
              <Icon name="location" size={14} />
              {booking.tourLocation}
            </p>
          </div>
          <span className="booking-card-price">{formatRupee(booking.price || booking.totalAmount)}</span>
        </div>

        <div className="booking-card-meta">
          <span className="booking-meta-item">
            <Icon name="calendar" size={14} />
            {booking.travelDate}
          </span>
          <span className="booking-meta-item">
            <Icon name="users" size={14} />
            {booking.travelers} traveler{booking.travelers !== 1 ? 's' : ''}
          </span>
          {booking.bookingId && (
            <span className="booking-meta-item">
              <Icon name="ticket" size={14} />
              {booking.bookingId}
            </span>
          )}
        </div>

        {booking.paymentMethod && (
          <p className="booking-payment-method">
            Paid via {booking.paymentMethod === 'upi' ? 'UPI' : booking.paymentMethod === 'card' ? 'Card' : 'Net Banking'}
          </p>
        )}

        <div className="booking-card-actions">
          <Button size="sm" variant="danger" onClick={() => onDelete(booking.id)}>
            Cancel Booking
          </Button>
        </div>
      </div>
    </article>
  )
}

function Bookings() {
  const { bookings, deleteBooking } = useBooking()

  const upcoming = bookings.filter((b) => getTripStatus(b.travelDate) === 'upcoming')
  const completed = bookings.filter((b) => getTripStatus(b.travelDate) === 'completed')
  const totalSpend = bookings.reduce((sum, b) => sum + (b.price || b.totalAmount || 0), 0)

  const handleDelete = (id) => {
    if (window.confirm('Cancel this booking? This cannot be undone.')) {
      deleteBooking(id)
    }
  }

  return (
    <div className="page bookings-page">
      <div className="page-header">
        <div className="container">
          <h1>Your Travel Plans, Organized</h1>
          <p>
            Manage all your tour reservations in one place. View upcoming trips,
            review booking details, track travel schedules, and stay prepared for
            your next adventure with Tripzy.
          </p>        </div>
      </div>

      <section className="section">
        <div className="container">
          {bookings.length > 0 && (
            <div className="bookings-summary fade-in-up">
              <div className="summary-stat">
                <span className="summary-value">{bookings.length}</span>
                <span className="summary-label">Total Bookings</span>
              </div>
              <div className="summary-stat">
                <span className="summary-value">{upcoming.length}</span>
                <span className="summary-label">Upcoming Trips</span>
              </div>
              <div className="summary-stat">
                <span className="summary-value">{formatRupee(totalSpend)}</span>
                <span className="summary-label">Total Spent</span>
              </div>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="empty-state card fade-in-up">
              <div className="empty-state-icon">
                <Icon name="plane" size={48} />
              </div>
              <h2>No Bookings Yet</h2>
              <p>Your adventure awaits! Browse our tours and book your first trip.</p>
              <Link to="/tours">
                <Button>Explore Tours</Button>
              </Link>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div className="bookings-section fade-in-up">
                  <h2 className="bookings-section-title">Upcoming Trips</h2>
                  <div className="bookings-cards-grid">
                    {upcoming.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onDelete={handleDelete} />
                    ))}
                  </div>
                </div>
              )}

              {completed.length > 0 && (
                <div className="bookings-section fade-in-up">
                  <h2 className="bookings-section-title">Completed Trips</h2>
                  <div className="bookings-cards-grid">
                    {completed.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onDelete={handleDelete} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Bookings
