import { Link } from 'react-router-dom'
import Icon from '../Components/Icon'

function TourCard({ tour }) {
  const formattedPrice = tour.price.toLocaleString('en-IN')

  return (
    <article className="tour-card fade-in-up">
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} loading="lazy" />
        <span className="tour-card-badge">₹{formattedPrice}</span>
        <span className="tour-card-duration">{tour.duration}</span>
      </div>
      <div className="tour-card-body">
        <div className="tour-card-meta">
          <span className="tour-rating">
            <Icon name="star" size={14} />
            {tour.rating}
          </span>
        </div>
        <h3>{tour.title}</h3>
        <p className="tour-card-desc">{tour.description}</p>
        <div className="tour-card-actions">
          <Link to={`/tours/${tour.category}/${tour.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default TourCard
