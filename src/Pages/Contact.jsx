import { useRef, useState } from 'react'
import Button from '../Components/Button'
import Icon from '../Components/Icon'
import LoadingSpinner from '../Components/LoadingSpinner'
import { useFormValidation } from '../hooks/useFormValidation'
import { submitContactForm } from '../services/api'

const validationRules = {
  name: ['required', (v) => (v.length >= 2 ? '' : 'Name must be at least 2 characters')],
  email: ['required', 'email'],
  phone: ['phone'],
  subject: ['required'],
  message: ['required', (v) => (v.length >= 10 ? '' : 'Message must be at least 10 characters')],
}

const contactCards = [
  { icon: 'phone', title: 'Phone', value: '+91 99406 xxxxx', desc: 'Mon – Sat, 9AM – 7PM IST' },
  { icon: 'mail', title: 'Email', value: 'info@tripzy.com', desc: 'We reply within 24 hours' },
  { icon: 'location', title: 'Address', value: 'Star Complex', desc: 'Chennai, Tamil Nadu 600 001' },
]

const faqs = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 2–6 weeks before departure to secure the best availability, pricing, and preferred travel dates.',
  },
  {
    q: 'Are flights included in the package?',
    a: 'Most packages do not include flights unless specifically mentioned. Please check the tour details page for complete inclusions and exclusions.',
  },
  {
    q: 'Can I travel solo on group tours?',
    a: 'Absolutely. Many of our travelers join solo and enjoy meeting like-minded people during guided group experiences.',
  },
  {
    q: 'What happens if I need to cancel my trip?',
    a: 'Cancellation policies vary by destination and package. Our support team will help you understand refund eligibility and rescheduling options.',
  },
  {
    q: 'Do you offer customized travel packages?',
    a: 'Yes. We can create personalized itineraries based on your budget, destination preferences, travel dates, and group size.',
  },
  {
    q: 'Is travel insurance recommended?',
    a: 'Yes. We strongly recommend travel insurance to protect against unexpected events such as trip cancellations, medical emergencies, or baggage delays.',
  },
]
function Contact() {
  const nameInputRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const { values, errors, touched, handleChange, handleBlur, validateAll, resetForm } =
    useFormValidation(
      { name: '', email: '', phone: '', subject: '', message: '' },
      validationRules
    )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) {
      nameInputRef.current?.focus()
      return
    }

    setSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm({
        title: values.subject,
        body: values.message,
        userId: 1,
        name: values.name,
        email: values.email,
        phone: values.phone,
      })
      setSubmitStatus('success')
      resetForm()
    } catch {
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page contact-page">
      <div className="page-header">
        <div className="container">
          <h1>Let's Plan Next Adventure Together</h1>
          <p>
            Have questions about destinations, tour packages, or existing bookings?
            Our travel specialists are here to help you every step of the way.
            Reach out to us for personalized travel assistance and expert guidance.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-cards-grid fade-in-up">
            {contactCards.map((card) => (
              <div key={card.title} className="contact-info-card card">
                <span className="contact-info-icon">
                  <Icon name={card.icon} size={28} />
                </span>
                <h3>{card.title}</h3>
                <strong>{card.value}</strong>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container contact-grid fade-in-up">
          <form className="contact-form card" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            <p className="form-intro">Fill out the form and our team will get back to you shortly.</p>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                Message sent! We&apos;ll get back to you within one business day.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="alert alert-error">
                Something went wrong. Please try again.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                ref={nameInputRef}
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Full Name"
                className={touched.name && errors.name ? 'input-error' : ''}
              />
              {touched.name && errors.name && (
                <span className="error-msg">{errors.name}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="xxxx@gmail.com"
                  className={touched.email && errors.email ? 'input-error' : ''}
                />
                {touched.email && errors.email && (
                  <span className="error-msg">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Mobile Number"
                  className={touched.phone && errors.phone ? 'input-error' : ''}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tour inquiry"
                className={touched.subject && errors.subject ? 'input-error' : ''}
              />
              {touched.subject && errors.subject && (
                <span className="error-msg">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                placeholder="Tell us about your dream trip..."
                className={touched.message && errors.message ? 'input-error' : ''}
              />
              {touched.message && errors.message && (
                <span className="error-msg">{errors.message}</span>
              )}
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>

            {submitting && <LoadingSpinner message="Submitting..." />}
          </form>

          <div className="contact-side">
            <div className="contact-side-card card">
              <h3>Why Choose Tripzy?</h3>
              <ul className="contact-benefits">
                <li><Icon name="check" size={16} /> Curated premium tour packages</li>
                <li><Icon name="check" size={16} /> Transparent pricing in ₹</li>
                <li><Icon name="check" size={16} /> 24/7 customer support</li>
                <li><Icon name="check" size={16} /> Secure booking & payment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head fade-in-up">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <div key={item.q} className="faq-item card fade-in-up">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
