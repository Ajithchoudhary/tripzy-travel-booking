import { useParams, Link } from 'react-router-dom'
import Button from '../../Components/Button'
import { getTourById, tourCategories } from '../../data/tours'
import { tourDetails } from '../../data/tourDetails'

function TourDetail() {
  const { tourId, category } = useParams()
  const tour = getTourById(tourId)
  const details = tour ? tourDetails[tour.id] : null
  const categoryInfo = category ? tourCategories[category] : null

  if (!tour) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Tour Not Found</h2>
            <p>The tour you are looking for does not exist.</p>
            <Link to="/tours" className="btn btn-primary">Back to Tours</Link>
          </div>
        </div>
      </div>
    )
  }

  const formattedPrice = tour.price.toLocaleString('en-IN')

  return (
    <div className="tour-detail-page">
      <div
        className="tour-banner"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="tour-banner-overlay" />
        <div className="container tour-banner-content">
          <Link to={`/tours/${tour.category}`} className="back-link" style={{ color: '#93C5FD' }}>
            ← Back to {categoryInfo?.name || 'Tours'}
          </Link>
          <h1>{tour.title}</h1>
          <div className="tour-banner-meta">
            <span>📍 {tour.location}</span>
            <span>⏱ {tour.duration}</span>
            <span className="tour-rating">★ {tour.rating} Rating</span>
            {categoryInfo && <span>{categoryInfo.icon} {categoryInfo.name}</span>}
          </div>
        </div>
      </div>

      <div className="container tour-detail-body">
        <div className="tour-detail-main">
          <section className="detail-section">
            <h2>About This Tour</h2>
            <p>{tour.description}</p>
          </section>

          {details && (
            <>
              <section className="detail-section">
                <h2>🏨 Facilities</h2>
                <div className="facilities-grid">
                  {details.facilities.map((item, index) => (
                    <div key={index} className="facility-item">
                      <span className="facility-icon">✦</span>
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h2>📅 Itinerary</h2>
                <div className="itinerary-timeline">
                  {details.itinerary.map((day, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot" />
                      <p>{day}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <div className="included-excluded-grid">
                  <div className="included-card">
                    <h3>✔ What&apos;s Included</h3>
                    <ul>
                      {details.included.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="excluded-card">
                    <h3>✕ Not Included</h3>
                    <ul>
                      {details.excluded.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        <aside className="tour-booking-sidebar">
          <div className="booking-card">
            <div className="booking-card-price">
              <div className="price-value">₹{formattedPrice}</div>
              <div className="price-label">per person · taxes included</div>
            </div>

            <div className="booking-card-details">
              <div className="booking-detail-row">
                <span>Duration</span>
                <span>{tour.duration}</span>
              </div>
              <div className="booking-detail-row">
                <span>Location</span>
                <span>{tour.location}</span>
              </div>
              <div className="booking-detail-row">
                <span>Rating</span>
                <span className="tour-rating">★ {tour.rating}</span>
              </div>
            </div>

            <div className="booking-card-actions">
              <Link to={`/book/summary/${tour.id}`}>
                <Button className="btn-sm btn-block">Book This Tour</Button>
              </Link>
              <Link to={`/tours/${tour.category}`}>
                <Button variant="outline" className="btn-sm btn-block">Back to Tours</Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TourDetail
