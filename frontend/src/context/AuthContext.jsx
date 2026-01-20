import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user dari localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("current_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Login user
  const login = (userData) => {
    localStorage.setItem("current_user", JSON.stringify(userData))
    setUser(userData)
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("current_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
