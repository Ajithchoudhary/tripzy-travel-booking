import { Link } from 'react-router-dom'

function TripzyLogo({ linkTo = '/', onClick }) {
  const logo = (
    <div className="tripzy-logo">
      <img src="/images/tripzy.logo.png.png" alt="Tripzy" />
    </div>
  )
  if (linkTo) {
    return (
      <Link to={linkTo} className="tripzy-logo-link" onClick={onClick}>
        {logo}
      </Link>
    )}
  return logo
}

export default TripzyLogo
