import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from './Button'
import Icon from './Icon'
import TripzyLogo from './TripzyLogo'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, logout, auth } = useAuth()
  const navigate = useNavigate()
  const navLinks = [ { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/tours', label: 'Tours' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/contact', label: 'Contact' },
    { to: '/profile', label: 'Profile' }, ]

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <TripzyLogo linkTo="/" onClick={() => setMenuOpen(false)} />
        <nav className={`navbar-nav navbar-center ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link' }> {link.label} 
                </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <> <span className="navbar-user">Hi, {auth.name.split(' ')[0]}</span>
              <Button size="sm" variant="outline" onClick={handleLogout}> Logout </Button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}> <Button size="sm">Login</Button> </Link>
          )}

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen} >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
