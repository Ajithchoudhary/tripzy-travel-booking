import { createContext, useContext, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookingContext = createContext(null)

function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      }
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload } : b
        ),
      }
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload),
      }
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [storedBookings, setStoredBookings] = useLocalStorage('tourBookings', [])

  const [state, dispatch] = useReducer(bookingReducer, {
    bookings: storedBookings,
  })

  const addBooking = (booking) => {
    const newBooking = { ...booking, id: booking.id || Date.now() }
    dispatch({ type: 'ADD_BOOKING', payload: newBooking })
    setStoredBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBooking = (booking) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: booking })
    setStoredBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, ...booking } : b))
    )
  }

  const deleteBooking = (id) => {
    dispatch({ type: 'DELETE_BOOKING', payload: id })
    setStoredBookings((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <BookingContext.Provider
      value={{ ...state, addBooking, updateBooking, deleteBooking }} >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBooking must be used within BookingProvider')
  return context
}
