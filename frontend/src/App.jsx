import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./context/AuthContext"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Cerita from "./pages/Cerita"
import Chat from "./pages/Chat"
import AdminChat from "./pages/AdminChat"
import Healing from "./pages/Healing"
import Education from "./pages/Education"

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />
    } else {
      return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

function AppRoutes() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

      {/* USER ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <Navigate to="/admin" /> : <Dashboard />}
          </ProtectedRoute>
        }
      />
      <Route path="/story" element={<ProtectedRoute><Cerita /></ProtectedRoute>} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <Navigate to="/admin/chat" /> : <Chat />}
          </ProtectedRoute>
        }
      />
      <Route path="/healing" element={<ProtectedRoute><Healing /></ProtectedRoute>} />
      <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/chat"
        element={<ProtectedRoute requiredRole="admin"><AdminChat /></ProtectedRoute>}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
