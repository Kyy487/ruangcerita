import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [totalUsers, setTotalUsers] = useState(5)
  const [totalChats, setTotalChats] = useState(12)
  const [totalStories, setTotalStories] = useState(8)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔑 Admin Dashboard</h1>
            <p className="text-purple-100">Kelola chat user dan monitor sistem</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100 mb-2">Logged in as:</p>
            <p className="text-lg font-semibold mb-4">{user?.name}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-8">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-600 text-sm">Total Users</p>
                <p className="text-4xl font-bold text-purple-600">{totalUsers}</p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-600 text-sm">Pesan Chat</p>
                <p className="text-4xl font-bold text-pink-600">{totalChats}</p>
              </div>
              <div className="text-5xl">💬</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-600 text-sm">Cerita User</p>
                <p className="text-4xl font-bold text-red-600">{totalStories}</p>
              </div>
              <div className="text-5xl">📖</div>
            </div>
          </div>
        </div>

        {/* MAIN SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">⚡ Aksi Cepat</h2>
            <div className="space-y-4">
              <Link
                to="/admin/chat"
                className="block p-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl hover:shadow-lg transition font-semibold"
              >
                💬 Kelola Chat User → {totalChats} Pesan
              </Link>
              <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition font-semibold">
                👥 Lihat Semua User
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition font-semibold">
                📖 Review Cerita User
              </button>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">📊 Aktivitas Terbaru</h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded">
                <p className="font-semibold text-slate-800">Pesan baru dari User</p>
                <p className="text-sm text-slate-600">5 menit yang lalu</p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                <p className="font-semibold text-slate-800">Cerita baru diunggah</p>
                <p className="text-sm text-slate-600">1 jam yang lalu</p>
              </div>
              <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded">
                <p className="font-semibold text-slate-800">User baru mendaftar</p>
                <p className="text-sm text-slate-600">2 jam yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">📢</div>
            <div>
              <h3 className="text-2xl font-bold">Selamat Datang Admin!</h3>
              <p className="text-purple-100">Anda memiliki akses penuh untuk mengelola sistem RuangPulih</p>
            </div>
          </div>
          <div className="bg-white/20 border border-white/30 rounded-xl p-4 mt-4">
            <p className="text-sm text-purple-100">
              💡 <strong>Tips:</strong> Gunakan panel admin untuk membalas chat user, melihat cerita yang diunggah, dan memonitor aktivitas sistem. Setiap balasan Anda sangat membantu user dalam proses penyembuhan mereka.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
