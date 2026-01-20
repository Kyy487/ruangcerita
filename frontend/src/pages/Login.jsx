import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// Demo users
const DEMO_USERS = {
  user: {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "User Normal"
  },
  admin: {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Dr. Psikolog (Admin)"
  }
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Email dan password harus diisi")
      return
    }

    let foundUser = null
    let userRole = null

    // Check both user and admin credentials
    if (email === DEMO_USERS.user.email && password === DEMO_USERS.user.password) {
      foundUser = DEMO_USERS.user
      userRole = "user"
    } else if (email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
      foundUser = DEMO_USERS.admin
      userRole = "admin"
    }

    if (foundUser) {
      const userData = {
        id: Date.now(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }
      login(userData)
      navigate(userRole === "admin" ? "/admin" : "/dashboard")
    } else {
      setError("Email atau password salah")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ruang Cerita
          </h1>
          <p className="text-slate-600">Platform Kesehatan Mental</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 p-4 rounded-xl mb-6">
            <p className="text-sm text-red-900">❌ {error}</p>
          </div>
        )}

        {/* DEMO CREDENTIALS INFO */}
        <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-xl mb-6">
          <p className="text-xs font-semibold text-blue-900 mb-2">📋 Demo Credentials:</p>
          <p className="text-xs text-blue-800 mb-1"><strong>User:</strong> user@example.com / user123</p>
          <p className="text-xs text-blue-800"><strong>Admin:</strong> admin@example.com / admin123</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              🔐 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-xl font-semibold transition shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ➤ Masuk
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6 text-sm">
          Demo: Gunakan credentials di atas untuk testing
        </p>
      </div>
    </div>
  )
}
