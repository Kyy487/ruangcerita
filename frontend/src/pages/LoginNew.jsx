import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// Demo users - dalam production gunakan backend
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
  const [role, setRole] = useState("user") // user atau admin
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Email dan password harus diisi")
      return
    }

    // Validasi login
    const demoUser = DEMO_USERS[role]
    
    if (email === demoUser.email && password === demoUser.password) {
      // Login berhasil
      const userData = {
        id: Date.now(),
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role
      }
      login(userData)
      navigate(role === "admin" ? "/admin" : "/dashboard")
    } else {
      setError("Email atau password salah untuk role ini")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            RuangPulih
          </h1>
          <p className="text-slate-600">Login dengan Role User & Admin</p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => {
              setRole("user")
              setError("")
            }}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              role === "user"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            👤 User
          </button>
          <button
            onClick={() => {
              setRole("admin")
              setError("")
            }}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              role === "admin"
                ? "bg-purple-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            🔑 Admin
          </button>
        </div>

        {/* DEMO CREDENTIALS */}
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl mb-6">
          <p className="text-sm font-semibold text-amber-900 mb-2">📋 Demo Credentials:</p>
          {role === "user" ? (
            <>
              <p className="text-sm text-amber-800">Email: <code className="font-mono">user@example.com</code></p>
              <p className="text-sm text-amber-800">Password: <code className="font-mono">user123</code></p>
            </>
          ) : (
            <>
              <p className="text-sm text-amber-800">Email: <code className="font-mono">admin@example.com</code></p>
              <p className="text-sm text-amber-800">Password: <code className="font-mono">admin123</code></p>
            </>
          )}
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 p-4 rounded-xl mb-6">
            <p className="text-sm text-red-900">❌ {error}</p>
          </div>
        )}

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
            className={`w-full text-white py-3 rounded-xl font-semibold transition shadow-lg ${
              role === "admin"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            }`}
          >
            ➤ Masuk sebagai {role === "admin" ? "Admin" : "User"}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6 text-sm">
          Demo: Gunakan credentials di atas untuk testing
        </p>
      </div>
    </div>
  )
}
