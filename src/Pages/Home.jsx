import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import TourCard from '../Components/TourCard'

import LoadingSpinner from '../Components/LoadingSpinner'

import Button from '../Components/Button'

import Icon from '../Components/Icon'

import { tours, tourCategories } from '../data/tours'

import { fetchTourReviews } from '../services/api'



const categoryDescriptions = {
  india: 'Heritage, hills, beaches & vibrant culture',
  dubai: 'Luxury, desert safaris & iconic skylines',
  thailand: 'Tropical beaches, temples & street food',
  singapore: 'Modern cityscapes & world-class attractions',
  malaysia: 'Rainforests, towers & diverse cuisine',
  bali: 'Rice terraces, temples & island paradise',}

const categoryList = Object.entries(tourCategories).map(([id, cat]) => ({
  id,
  ...cat,
  description: categoryDescriptions[id] || 'Explore amazing destinations',
  image: tours.find((t) => t.category === id)?.image,
}))
const stats = [
  { icon: 'map', value: `${tours.length}+`, label: 'Total Tours' },
  { icon: 'globe', value: '6', label: 'Countries' },
  { icon: 'luggage', value: '10K+', label: 'Travelers' },
  { icon: 'star', value: '4.8', label: 'Ratings' },]

function Home() {
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)

  useEffect(() => {
    fetchTourReviews()
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoadingReviews(false))
  }, [])
  const featuredTours = tours.slice(0, 6)
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content fade-in-up">
          <span className="hero-badge">
            <Icon name="spark" size={14} />
            Premium Travel Experiences
          </span>
          <h1>Discover Your Next Adventure</h1>
          <p className="hero-subtitle">
            Book curated tours to breathtaking destinations worldwide. From beach
            escapes to cultural journeys — your perfect trip starts here.
          </p>
          <div className="hero-actions">
            <Link to="/tours">
              <Button size="lg">Explore Tours</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card fade-in-up">
                <span className="stat-icon">
                  <Icon name={stat.icon} size={28} />
                </span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-head fade-in-up">
            <span className="section-eyebrow">Top Picks</span>
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">
              Handpicked regions loved by thousands of travelers
            </p>
          </div>
          <div className="destination-grid">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                to={`/tours/${category.id}`}
                className="destination-card fade-in-up"
              >
                <div
                  className="destination-card-bg"
                  style={{
                    backgroundImage: category.image
                      ? `url(${category.image})`
                      : 'linear-gradient(135deg, #2563EB, #0F172A)',
                  }}
                />
                <div className="destination-card-overlay" />
                <div className="destination-card-content">
                  <span className="destination-card-icon">
                    <Icon name="compass" size={22} />
                  </span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="destination-card-link">Explore tours →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head row fade-in-up">
            <div>
              <span className="section-eyebrow">Popular Packages</span>
              <h2 className="section-title">Trending Tour Packages</h2>
              <p className="section-subtitle section-subtitle-left">
                Hand-picked trips our travelers love most
              </p>
            </div>
            <Link to="/tours" className="btn btn-outline btn-sm">View all tours</Link>
          </div>
          <div className="tour-grid">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

     <section className="section section-dark">
        <div className="container">
          <div className="section-head fade-in-up">
            <span className="section-eyebrow section-eyebrow-light">Testimonials</span>
            <h2 className="section-title">What Travelers Say</h2>
            <p className="section-subtitle">
              Real feedback from real adventures around the world
            </p>
          </div>
          {loadingReviews ? (
            <LoadingSpinner message="Loading reviews..." />
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card fade-in-up">
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-meta">
                      <span className="review-author">{review.author}</span>
                      <div className="review-rating">
                        <Icon name="star" size={14} />
                        {review.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <p className="review-text">&ldquo;{review.text}&rdquo;</p>

               </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="cta-band">
        <div className="container cta-band-inner fade-in-up">
          <div>
            <h2>Ready to Start Your Journey?</h2>
            <p>Browse our full collection and book your next trip in minutes.</p>
          </div>
          <Link to="/tours">
            <Button size="lg" id="homeBtn">Browse All Tours</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
export default Home