import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// Demo users
const DEMO_USERS = {
  user: {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "User"
  },
  admin: {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Dr. Psikolog"
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

    if (
      email === DEMO_USERS.user.email &&
      password === DEMO_USERS.user.password
    ) {
      foundUser = DEMO_USERS.user
    } else if (
      email === DEMO_USERS.admin.email &&
      password === DEMO_USERS.admin.password
    ) {
      foundUser = DEMO_USERS.admin
    }

    if (foundUser) {
      login({
        id: Date.now(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      })
      navigate(foundUser.role === "admin" ? "/admin" : "/dashboard")
    } else {
      setError("Email atau password salah")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center p-6">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">
          Ruang Cerita 🌿
        </h1>
        <p className="text-indigo-600 text-xl max-w-md leading-relaxed">
          Platform aman untuk berbagi cerita, mendapatkan dukungan,
          dan pulih bersama dengan nyaman.
        </p>

        <div className="mt-10 space-y-4 text-indigo-700">
          <p>💙 Aman & tanpa penghakiman</p>
          <p>💬 Curhat dengan psikolog</p>
          <p>🌱 Fokus pemulihan mental</p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN CARD */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-700">
              Login
            </h2>
            <p className="text-slate-500 mt-2">
              Masuk ke ruang aman milikmu
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl mb-4 text-sm">
              ❌ {error}
            </div>
          )}

          {/* DEMO INFO */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700 mb-6">
            <p className="font-semibold mb-2">📋 Demo Akun</p>
            <p>👤 user@example.com / user123</p>
            <p>👨‍⚕️ admin@example.com / admin123</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Masuk
            </button>
          </form>

          {/* REGISTER */}
          <button
            onClick={() => navigate("/register")}
            className="w-full mt-4 border-2 border-indigo-300 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Buat Akun Baru
          </button>

          {/* BACK */}
          <Link
            to="/"
            className="block text-center text-sm text-indigo-500 mt-4 hover:underline"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
