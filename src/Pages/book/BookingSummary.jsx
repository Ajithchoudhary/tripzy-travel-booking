import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Button from '../../Components/Button'
import Icon from '../../Components/Icon'
import { getTourById } from '../../data/tours'
import { useFormValidation } from '../../hooks/useFormValidation'
import { formatRupee, setBookingDraft } from '../../utils/bookingDraft'

const validationRules = {
  travelDate: ['required'],
  travelers: ['required'],
}
function BookingSummary() {
  const { tourId } = useParams()
  const tour = getTourById(tourId)
  const navigate = useNavigate()
  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useFormValidation({ travelDate: '', travelers: '1', notes: '' }, validationRules)

  if (!tour) {
    return <Navigate to="/tours" replace />
  }
  const travelers = Number(values.travelers) || 1
  const totalAmount = tour.price * travelers
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateAll()) return

    setBookingDraft({
      tourId: tour.id,
      tourTitle: tour.title,
      tourLocation: tour.location,
      tourImage: tour.image,
      tourDuration: tour.duration,
      unitPrice: tour.price,
      travelDate: values.travelDate,
      travelers,
      notes: values.notes,
      totalAmount,
    })
    navigate('/book/payment')
  }
  return (
    <div className="page booking-flow-page">
      <div className="page-header">
        <div className="container">
          <h1>Booking Summary</h1>
          <p>Review your trip details before proceeding to payment</p>
        </div>
      </div>

      <section className="section">
        <div className="container booking-flow-grid fade-in-up">
          <div className="booking-summary-card card">
            <div className="booking-summary-tour">
              <img src={tour.image} alt={tour.title} />
              <div>
                <h2>{tour.title}</h2>
                <p className="booking-summary-meta">
                  <Icon name="location" size={14} />
                  {tour.location}
                  <span className="meta-separator">·</span>
                  {tour.duration}</p>
                <span className="tour-rating">
                  <Icon name="star" size={14} />
                  {tour.rating}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-summary-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="travelDate">Travel Date *</label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={values.travelDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={new Date().toISOString().split('T')[0]}
                    className={touched.travelDate && errors.travelDate ? 'input-error' : ''}
                  />
                  {touched.travelDate && errors.travelDate && (
                    <span className="error-msg">{errors.travelDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="travelers">Travelers *</label>
                  <input
                    type="number"
                    id="travelers"
                    name="travelers"
                    value={values.travelers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    max="20"
                    className={touched.travelers && errors.travelers ? 'input-error' : ''}
                  />
                  {touched.travelers && errors.travelers && (
                    <span className="error-msg">{errors.travelers}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Special Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="3"
                  placeholder="Dietary requirements, accessibility needs..."
                />
              </div>

              <div className="booking-flow-actions">
                <Link to={`/tours/${tour.category}/${tour.id}`} className="btn btn-outline btn-sm">
                  Back
                </Link>
                <Button type="submit" className="btn-sm">Continue to Payment</Button>
              </div>
            </form>
          </div>

          <aside className="booking-price-card card">
            <h3>Price Breakdown</h3>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Tour price</span>
                <span>{formatRupee(tour.price)}</span>
              </div>
              <div className="price-row">
                <span>Travelers</span>
                <span>× {travelers}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>{formatRupee(totalAmount)}</span>
              </div>
            </div>
            <p className="price-note">All prices in Indian Rupees (₹). Taxes included.</p>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default BookingSummary
