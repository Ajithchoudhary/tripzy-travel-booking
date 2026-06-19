import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import ProtectedRoute from './Components/ProtectedRoute'
import PageTransition from './Components/PageTransition'
import Home from './Pages/Home'
import About from './Pages/About'
import Bookings from './Pages/Bookings'
import Contact from './Pages/Contact'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ToursLayout from './Pages/tours/ToursLayout'
import ToursIndex from './Pages/tours/ToursIndex'
import CategoryTours from './Pages/tours/CategoryTours'
import TourDetail from './Pages/tours/TourDetail'
import BookingSummary from './Pages/book/BookingSummary'
import Payment from './Pages/book/Payment'
import PaymentSuccess from './Pages/book/PaymentSuccess'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppShell() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <NavBar />}
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/tours" element={<ProtectedRoute><ToursLayout /></ProtectedRoute>}>
              <Route index element={<ToursIndex />} />
              <Route path=":category" element={<CategoryTours />} />
              <Route path=":category/:tourId" element={<TourDetail />} />
            </Route>

            <Route path="/book/summary/:tourId" element={<ProtectedRoute><BookingSummary /></ProtectedRoute>} />
            <Route path="/book/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/book/success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />

            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </PageTransition>
      </main>
      {!isAuthPage && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AppShell />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
