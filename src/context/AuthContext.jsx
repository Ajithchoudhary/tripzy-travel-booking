import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('tripzyUsers', [])
  const [auth, setAuth] = useLocalStorage('tripzyAuth', null)

  const signup = useCallback(
    ({ name, email, password, phone }) => {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'An account with this email already exists.' }
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        phone: phone || '',
        memberSince: new Date().getFullYear().toString(),
      }

      setUsers((prev) => [...prev, newUser])
      setAuth({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        memberSince: newUser.memberSince,
      })
      return { success: true }
    },
    [users, setUsers, setAuth]
  )

  const login = useCallback(
    ({ email, password }) => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )

      if (!user) {
        return { success: false, error: 'Invalid email or password.' }
      }

      setAuth({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        memberSince: user.memberSince,
      })

      return { success: true }
    },
    [users, setAuth]
  )
  const logout = useCallback(() => {
    setAuth(null)
  }, [setAuth])
  const isAuthenticated = Boolean(auth)
  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
