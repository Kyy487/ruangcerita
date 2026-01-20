import { useState, useEffect, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// ===== localStorage helpers =====
function loadChatMessages() {
  try {
    const saved = localStorage.getItem("chat_messages")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveChatMessages(messages) {
  localStorage.setItem("chat_messages", JSON.stringify(messages))
}

export default function AdminChat() {
  const [messages, setMessages] = useState([])
  const [adminReply, setAdminReply] = useState("")
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [filterUser, setFilterUser] = useState("all")
  const messagesEndRef = useRef(null)

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // ===== LOAD + REALTIME LISTENER =====
  useEffect(() => {
    const load = () => {
      const data = loadChatMessages()
      setMessages(Array.isArray(data) ? data : [])
    }

    load()

    const handleStorage = (e) => {
      if (e.key === "chat_messages") {
        load()
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  // ===== AUTO SCROLL =====
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, filterUser])

  // ===== REPLY MESSAGE =====
  const replyMessage = () => {
    if (!adminReply.trim() || !selectedMessageId) return

    const updated = messages.map(msg =>
      msg.id === selectedMessageId
        ? {
            ...msg,
            reply: {
              text: adminReply,
              from: user?.name || "Admin",
              timestamp: new Date().toISOString(),
            },
            read: true,
          }
        : msg
    )

    setMessages(updated)
    saveChatMessages(updated)
    setAdminReply("")
    setSelectedMessageId(null)
  }

  // ===== DELETE MESSAGE =====
  const deleteMessage = (id) => {
    if (!window.confirm("Hapus pesan ini?")) return
    const updated = messages.filter(m => m.id !== id)
    setMessages(updated)
    saveChatMessages(updated)
  }

  // ===== DATA DERIVED =====
  const uniqueUsers = [...new Set(messages.map(m => m.username))]

  const filteredMessages =
    filterUser === "all"
      ? messages
      : messages.filter(m => m.username === filterUser)

  const unreadCount = messages.filter(
    m => m.sender === "user" && !m.read
  ).length

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // ===== RENDER =====
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-3 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold"
            >
              ← Kembali
            </button>

            <h1 className="text-2xl font-bold">💬 Admin Chat Panel</h1>
            <p className="text-purple-100 text-sm">
              Menunggu & membalas pesan user
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-500 px-4 py-2 rounded-full font-bold">
              {unreadCount} Belum Dibalas
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* LEFT: USER LIST */}
        <div className="w-64 bg-white rounded-2xl shadow p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">👥 User</h3>

          <button
            onClick={() => {
              setFilterUser("all")
              setSelectedMessageId(null)
            }}
            className={`w-full p-3 rounded-lg mb-3 text-left font-semibold ${
              filterUser === "all"
                ? "bg-purple-600 text-white"
                : "bg-slate-100"
            }`}
          >
            Semua ({messages.length})
          </button>

          {uniqueUsers.map(name => {
            const unread = messages.filter(
              m => m.username === name && !m.read
            ).length

            return (
              <button
                key={name}
                onClick={() => {
                  setFilterUser(name)
                  setSelectedMessageId(null)
                }}
                className={`w-full p-3 rounded-lg mb-2 flex justify-between font-semibold ${
                  filterUser === name
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                <span>{name}</span>
                {unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unread}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* RIGHT: CHAT */}
        <div className="flex-1 flex flex-col bg-slate-50 rounded-2xl shadow overflow-hidden">
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                <p className="text-xl">💭 Tidak ada pesan</p>
              </div>
            ) : (
              filteredMessages.map(msg => (
                <div key={msg.id} className="space-y-2">
                  {/* USER MESSAGE */}
                  <div className="bg-blue-100 border p-4 rounded-xl">
                    <p className="font-bold text-blue-900">
                      👤 {msg.username}
                    </p>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs text-blue-700 mt-1">
                      {new Date(msg.timestamp).toLocaleString("id-ID")}
                    </p>

                    {!msg.reply && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setSelectedMessageId(msg.id)}
                          className="bg-blue-300 px-3 py-1 rounded-lg text-sm font-semibold"
                        >
                          Balas
                        </button>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="bg-red-400 px-3 py-1 rounded-lg text-sm font-semibold text-white"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ADMIN REPLY */}
                  {msg.reply && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl text-right">
                      <p className="font-bold">🟣 {msg.reply.from}</p>
                      <p className="whitespace-pre-wrap">
                        {msg.reply.text}
                      </p>
                      <p className="text-xs mt-1">
                        {new Date(
                          msg.reply.timestamp
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* REPLY FORM */}
          <div className="p-4 bg-white border-t">
            {selectedMessageId ? (
              <>
                <textarea
                  value={adminReply}
                  onChange={e => setAdminReply(e.target.value)}
                  rows={3}
                  className="w-full p-3 border rounded-xl mb-3"
                  placeholder="Tulis balasan admin..."
                />
                <button
                  onClick={replyMessage}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold"
                >
                  Kirim Balasan
                </button>
              </>
            ) : (
              <p className="text-center text-slate-500">
                👆 Pilih pesan untuk dibalas
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
