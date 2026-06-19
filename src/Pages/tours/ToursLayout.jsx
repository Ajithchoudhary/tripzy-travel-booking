import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { tourCategories } from '../../data/tours'

function ToursLayout() {
  const { tourId, category } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('q') || ''

  const categoryList = Object.entries(tourCategories).map(([id, cat]) => ({
    id,
    ...cat,
  }))

  if (tourId) {
    return <Outlet />
  }

  const currentCategory = category || ''

  return (
    <div className="tours-page">
      <div className="tours-page-header">
        <div className="container fade-in-up">
          <h1>Explore  Destinations Around the World</h1>
          <p>Browse our collection of handpicked domestic and international tours.
            From cultural experiences and nature escapes to luxury vacations and
            family-friendly adventures, find the perfect journey that matches your
            travel style and budget.</p>
          <div className="tours-filter-bar">
            <label htmlFor="categoryFilter" className="tours-filter-label">
              Filter by Destination
            </label>
            <select
              id="categoryFilter"
              className="tours-category-select"
              value={currentCategory}
              onChange={(e) => {
                const val = e.target.value
                const queryStr = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''
                navigate(val ? `/tours/${val}${queryStr}` : `/tours${queryStr}`)
              }}>
              <option value="">All Destinations</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}> {cat.name} </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container tours-content-wrap">
        <Outlet />
      </div>
    </div>
  )
}

export default ToursLayout
