import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Button from '../../Components/Button'
import Icon from '../../Components/Icon'
import { useBooking } from '../../context/BookingContext'
import { useAuth } from '../../context/AuthContext'
import { clearBookingDraft, formatRupee, generateBookingId, getBookingDraft } from '../../utils/bookingDraft'

function PaymentSuccess() {
  const location = useLocation()
  const { addBooking } = useBooking()
  const { auth } = useAuth()
  const savedRef = useRef(false)
  const [confirmedId, setConfirmedId] = useState('')

  const draft = location.state?.draft || getBookingDraft()

  useEffect(() => {
    if (!draft || savedRef.current) return

    savedRef.current = true
    const bookingId = generateBookingId()

    addBooking({
      bookingId,
      tourId: draft.tourId,
      tourTitle: draft.tourTitle,
      tourLocation: draft.tourLocation,
      tourImage: draft.tourImage,
      tourDuration: draft.tourDuration,
      travelDate: draft.travelDate,
      travelers: draft.travelers,
      notes: draft.notes || '',
      price: draft.totalAmount,
      totalAmount: draft.totalAmount,
      paymentMethod: draft.paymentMethod,
      paymentStatus: 'paid',
      status: new Date(draft.travelDate) >= new Date() ? 'upcoming' : 'completed',
      bookedAt: new Date().toISOString(),
      userEmail: auth?.email,
    })

    setConfirmedId(bookingId)
    clearBookingDraft()
  }, [draft, addBooking, auth])

  if (!draft) {
    return <Navigate to="/tours" replace />
  }

  const paymentLabel = {
    upi: 'UPI',
    card: 'Debit / Credit Card',
    netbanking: 'Net Banking',
  }[draft.paymentMethod] || draft.paymentMethod

  return (
    <div className="page booking-success-page">
      <div className="container">
        <div className="success-card card fade-in-up">
          <div className="success-icon">
            <Icon name="check" size={32} />
          </div>
          <h1>Payment Successful!</h1>
          <p className="success-subtitle">Your booking has been confirmed</p>

          <div className="success-details">
            <div className="success-detail-row">
              <span>Booking ID</span>
              <strong>{confirmedId || 'Processing...'}</strong>
            </div>
            <div className="success-detail-row">
              <span>Tour</span>
              <strong>{draft.tourTitle}</strong>
            </div>
            <div className="success-detail-row">
              <span>Location</span>
              <strong>{draft.tourLocation}</strong>
            </div>
            <div className="success-detail-row">
              <span>Travel Date</span>
              <strong>{draft.travelDate}</strong>
            </div>
            <div className="success-detail-row">
              <span>Travelers</span>
              <strong>{draft.travelers}</strong>
            </div>
            <div className="success-detail-row">
              <span>Payment Method</span>
              <strong>{paymentLabel}</strong>
            </div>
            <div className="success-detail-row highlight">
              <span>Amount Paid</span>
              <strong>{formatRupee(draft.totalAmount)}</strong>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/bookings">
              <Button>View My Bookings</Button>
            </Link>
            <Link to="/tours">
              <Button variant="outline">Browse More Tours</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
