import LoadingSpinner from '../components/LoadingSpinner'
import { useFetch } from '../hooks/useFetch'

function About() {
  const { data: apiUsers, loading } = useFetch(
    'https://jsonplaceholder.typicode.com/users?_limit=4'
  )

  const stats = [{ value: '500+', label: 'Tours completed' },
  { value: '50+', label: 'Destinations' },
  { value: '10K+', label: 'Happy travelers' },
  { value: '15', label: 'Years experience' },]

  const values = [{
    icon: '🧭',
    title: 'Local first',
    text: 'Every itinerary is built with guides who live where you\'re traveling, not a call center.',
  },
  {
    icon: '🌱',
    title: 'Travel responsibly',
    text: 'We cap group sizes and partner with operators who reinvest in the places we visit.',
  },
  {
    icon: '🤝',
    title: 'No hidden costs',
    text: 'The price you see on a tour card is the price you pay. No surprise fees at checkout.',
  },]

  const team = [
    { name: 'Sarah Chen', role: 'Founder & CEO', emoji: '👩‍💼' },
    { name: 'Marco Rossi', role: 'Head of Adventures', emoji: '🧗' },
    { name: 'Priya Sharma', role: 'Cultural Tours Lead', emoji: '🏛️' },
    { name: 'James Wilson', role: 'Customer Experience', emoji: '⭐' },
  ]

  return (
    <div className="page about-page">
      <div className="page-header">
        <div className="container">
          <h1>Creating Unforgettable Travel Experiences</h1>
          <p>
            At Tripzy, we believe travel should be exciting, accessible, and
            stress-free. Our mission is to connect travelers with extraordinary
            destinations through carefully crafted tours, trusted travel partners,
            and exceptional customer support.
          </p>        </div>
      </div>

      <section className="section">
        <div className="container about-content">
          <div className="about-text">
            <h2>How we started</h2>
            <p>
              Wanderlust Tours began with one small adventure company in Nepal and a simple
              belief: travel should transform you, not just photograph well. We grew slowly,
              one trusted local guide at a time, instead of buying up package deals.
            </p>
            <p>
              Today we run tours across 50+ destinations, but the approach hasn't changed —
              handpicked routes, small groups, and itineraries that balance excitement with
              actual rest.
            </p>
          </div>
          <div className="about-image">
            <img
              src="/images/bg/about-story.jpg"
              alt="Travelers exploring a mountain trail together"
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">What we won't compromise on</h2>
            <p className="section-subtitle">Three things every tour is built around</p>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.title} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Meet the team</h2>
            <p className="section-subtitle">The people planning your next trip</p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <span className="team-emoji">{member.emoji}</span>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Our ground partners</h2>
            <p className="section-subtitle">Local operators we work with directly</p>
          </div>
          {loading ? (
            <LoadingSpinner message="Loading partners..." />
          ) : (
            <div className="team-grid">
              {apiUsers?.map((user) => (
                <div key={user.id} className="team-card">
                  <span className="team-emoji">🌍</span>
                  <h3>{user.company.name}</h3>
                  <p>{user.address.city}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
export default About
