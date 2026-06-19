import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import Icon from '../../Components/Icon'
import { formatRupee, getBookingDraft, setBookingDraft } from '../../utils/bookingDraft'

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: 'mobile', desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Debit / Credit Card', icon: 'card', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: 'bank', desc: 'All major Indian banks' },
]

function Payment() {
  const navigate = useNavigate()
  const draft = getBookingDraft()
  const [method, setMethod] = useState(draft?.paymentMethod || 'upi')
  const [processing, setProcessing] = useState(false)

  if (!draft) {
    return <Navigate to="/tours" replace />
  }

  const handlePay = () => {
    setProcessing(true)
    const updatedDraft = { ...draft, paymentMethod: method }
    setBookingDraft(updatedDraft)

    setTimeout(() => {
      navigate('/book/success', { state: { draft: updatedDraft } })
    }, 1200)
  }

  return (
    <div className="page booking-flow-page">
      <div className="page-header">
        <div className="container">
          <h1>Payment</h1>
          <p>Choose your preferred payment method</p>
        </div>
      </div>

      <section className="section">
        <div className="container booking-flow-grid fade-in-up">
          <div className="payment-card card">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`payment-method-option ${method === pm.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.id}
                    checked={method === pm.id}
                    onChange={() => setMethod(pm.id)}
                  />
                  <span className="payment-method-icon">
                    <Icon name={pm.icon} size={24} />
                  </span>
                  <div>
                    <strong>{pm.label}</strong>
                    <span>{pm.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="booking-flow-actions">
              <Link to={`/book/summary/${draft.tourId}`} className="btn btn-outline btn-sm">
                Back
              </Link>
              <Button
                className="btn-sm"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </div>

          <aside className="booking-price-card card">
            <h3>Order Summary</h3>
            <div className="payment-summary-tour">
              <img src={draft.tourImage} alt={draft.tourTitle} />
              <div>
                <strong>{draft.tourTitle}</strong>
                <p>{draft.tourLocation}</p>
              </div>
            </div>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Travelers</span>
                <span>{draft.travelers}</span>
              </div>
              <div className="price-row">
                <span>Travel Date</span>
                <span>{draft.travelDate}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>{formatRupee(draft.totalAmount)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Payment
