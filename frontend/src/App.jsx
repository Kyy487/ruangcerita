import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./context/AuthContext"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import RuangCerita from "./pages/RuangCerita"
import Chat from "./pages/Chat"
import AdminChat from "./pages/AdminChat"
import Healing from "./pages/Healing"
import Education from "./pages/Education"

/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext)

  // Belum login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Role tidak sesuai
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
  }

  return children
}

/* ================= ROUTES ================= */

function AppRoutes() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>

      {/* ========= PUBLIC ========= */}
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} /> : <Register />}
      />

      {/* ========= USER ========= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/story"
        element={
          <ProtectedRoute requiredRole="user">
            <RuangCerita />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute requiredRole="user">
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/healing"
        element={
          <ProtectedRoute requiredRole="user">
            <Healing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/education"
        element={
          <ProtectedRoute requiredRole="user">
            <Education />
          </ProtectedRoute>
        }
      />

      {/* ========= ADMIN ========= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/chat"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminChat />
          </ProtectedRoute>
        }
      />

      {/* ========= FALLBACK ========= */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}

/* ================= APP ROOT ================= */

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
