import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [totalUsers] = useState(5)
  const [totalChats] = useState(12)
  const [totalStories] = useState(8)
  const [activeSection, setActiveSection] = useState("overview")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-pink-700 text-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">🔑 Ruang Cerita</h2>
          <p className="text-sm text-purple-100 mt-1">Admin Panel</p>
        </div>

        {/* USER INFO */}
        <div className="p-6 border-b border-white/20">
          <p className="text-xs text-purple-100 mb-1">Logged in as:</p>
          <p className="font-semibold text-lg">{user?.name}</p>
          <p className="text-xs text-purple-200">{user?.email}</p>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="p-4 space-y-2 flex-1">
          <button
            onClick={() => setActiveSection("overview")}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "overview"
                ? "bg-white/25 border-l-4 border-white"
                : "hover:bg-white/10"
            }`}
          >
            📊 Dashboard
          </button>
          <Link
            to="/admin/chat"
            className="block px-4 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            💬 Kelola Chat ({totalChats})
          </Link>
          <button
            onClick={() => setActiveSection("stories")}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "stories"
                ? "bg-white/25 border-l-4 border-white"
                : "hover:bg-white/10"
            }`}
          >
            📖 Review Cerita ({totalStories})
          </button>
          <button
            onClick={() => setActiveSection("users")}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "users"
                ? "bg-white/25 border-l-4 border-white"
                : "hover:bg-white/10"
            }`}
          >
            👥 Kelola User ({totalUsers})
          </button>
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeSection === "overview" && (
            <>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">📊 Dashboard Admin</h1>
              <p className="text-slate-600 mb-8">Kelola chat user dan monitor sistem</p>

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
                      className="block p-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl hover:shadow-lg transition font-semibold text-center"
                    >
                      💬 Kelola Chat User → {totalChats} Pesan
                    </Link>
                    <button 
                      onClick={() => setActiveSection("users")}
                      className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition font-semibold"
                    >
                      👥 Lihat Semua User
                    </button>
                    <button 
                      onClick={() => setActiveSection("stories")}
                      className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition font-semibold"
                    >
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
                    <p className="text-purple-100">Anda memiliki akses penuh untuk mengelola sistem Ruang Cerita</p>
                  </div>
                </div>
                <div className="bg-white/20 border border-white/30 rounded-xl p-4 mt-4">
                  <p className="text-sm text-purple-100">
                    💡 <strong>Tips:</strong> Gunakan panel admin untuk membalas chat user, melihat cerita yang diunggah, dan memonitor aktivitas sistem. Setiap balasan Anda sangat membantu user dalam proses penyembuhan mereka.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeSection === "stories" && (
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">📖 Review Cerita User</h1>
              <p className="text-slate-600 mb-8">Lihat semua cerita yang diunggah oleh user</p>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-4">
                  {[
                    { id: 1, user: "User Normal", date: "20 Jan 2026", mood: "😔", preview: "Aku cerita cerita..." },
                    { id: 2, user: "User 2", date: "19 Jan 2026", mood: "😟", preview: "Saya merasa sedih karena..." },
                    { id: 3, user: "User 3", date: "18 Jan 2026", mood: "😢", preview: "Ini adalah cerita saya..." }
                  ].map(story => (
                    <div key={story.id} className="p-4 border-2 border-slate-200 rounded-xl hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-slate-800">{story.user} {story.mood}</p>
                          <p className="text-sm text-slate-500">{story.date}</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                          👁️ Lihat
                        </button>
                      </div>
                      <p className="text-slate-600">{story.preview}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "users" && (
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">👥 Kelola User</h1>
              <p className="text-slate-600 mb-8">Lihat daftar semua user terdaftar</p>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Terdaftar</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: "User Normal", email: "user@example.com", date: "20 Jan 2026", status: "Active" },
                        { id: 2, name: "User 2", email: "user2@example.com", date: "19 Jan 2026", status: "Active" },
                        { id: 3, name: "User 3", email: "user3@example.com", date: "18 Jan 2026", status: "Active" },
                        { id: 4, name: "User 4", email: "user4@example.com", date: "17 Jan 2026", status: "Active" },
                        { id: 5, name: "User 5", email: "user5@example.com", date: "16 Jan 2026", status: "Active" }
                      ].map(user => (
                        <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{user.date}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                              👁️ Lihat
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
