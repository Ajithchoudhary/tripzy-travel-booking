import { Link } from 'react-router-dom'
import Icon from './Icon'
import TripzyLogo from './TripzyLogo'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <TripzyLogo linkTo="/" />
            <p> Your premium gateway to unforgettable adventures. Curated tours, trusted guides, and seamless booking for travelers worldwide.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">in</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><Link to="/tours/india">India</Link></li>
              <li><Link to="/tours/dubai">Dubai</Link></li>
              <li><Link to="/tours/thailand">Thailand</Link></li>
              <li><Link to="/tours/bali">Bali</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul className="footer-contact-list">
              <li> <Icon name="mail" size={18} /> <span>info@tripzy.com</span> </li>
              <li><Icon name="phone" size={18} /> <span>+91 99406 xxxxx</span></li>
              <li><Icon name="location" size={18} /> <span>Chennai, India</span> </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tripzy. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
