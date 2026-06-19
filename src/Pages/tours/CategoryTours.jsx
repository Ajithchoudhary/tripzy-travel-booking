import { useParams, Link, useSearchParams } from 'react-router-dom'
import TourCard from '../../Components/TourCard'
import { getToursByCategory, tourCategories } from '../../data/tours'

function CategoryTours() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const categoryInfo = tourCategories[category]
  const categoryTours = getToursByCategory(category)

  const filteredTours = categoryTours.filter((tour) =>
    tour.title.toLowerCase().includes(query.toLowerCase()) ||
    tour.location.toLowerCase().includes(query.toLowerCase()) ||
    tour.description.toLowerCase().includes(query.toLowerCase())
  )

  if (!categoryInfo) {
    return (
      <div className="empty-state">
        <h2>Category not found</h2>
        <p>The tour category you are looking for does not exist.</p>
        <Link to="/tours" className="btn btn-outline btn-sm">
          View all tours
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="category-header">
        <span className="category-icon-lg">{categoryInfo.icon}</span>
        <div>
          <h2>{categoryInfo.name} Tours</h2>
          <p>Explore amazing destinations and travel experiences.</p>
        </div>
      </div>

      {categoryTours.length === 0 ? (
        <div className="empty-state">
          <p>No tours available in this category yet.</p>
        </div>
      ) : filteredTours.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem 0' }}>
          <p>No tours found matching your search term in this category.</p>
        </div>
      ) : (
        <>
          <p className="results-count">
            {filteredTours.length} tour(s) found {query && ` matching "${query}"`}
          </p>

          <div className="tour-grid">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CategoryTours