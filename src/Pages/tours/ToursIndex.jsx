import { useSearchParams } from 'react-router-dom'
import TourCard from '../../Components/TourCard'
import { tours } from '../../data/tours'

function ToursIndex() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(query.toLowerCase()) ||
    tour.location.toLowerCase().includes(query.toLowerCase()) ||
    tour.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fade-in-up">
      <p className="results-count">
        {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} available
        {query && ` matching "${query}"`}
      </p>

      {filteredTours.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem 0' }}>
          <p>No tours found matching your search term.</p>
        </div>
      ) : (
        <div className="tour-grid">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ToursIndex
