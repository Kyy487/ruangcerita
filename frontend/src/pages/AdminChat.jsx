import { useState, useEffect, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

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

  useEffect(() => {
    const saved = loadChatMessages()
    setMessages(saved)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const replyMessage = () => {
    if (!adminReply.trim() || !selectedMessageId) return

    const updated = messages.map(msg => {
      if (msg.id === selectedMessageId) {
        return {
          ...msg,
          reply: {
            text: adminReply,
            timestamp: new Date().toISOString(),
            from: user?.name || "Admin"
          },
          read: true
        }
      }
      return msg
    })

    setMessages(updated)
    saveChatMessages(updated)
    setAdminReply("")
    setSelectedMessageId(null)
  }

  const deleteMessage = (id) => {
    if (window.confirm("Hapus pesan ini?")) {
      const updated = messages.filter(msg => msg.id !== id)
      setMessages(updated)
      saveChatMessages(updated)
    }
  }

  const uniqueUsers = [...new Set(messages.map(m => m.username))]

  const filteredMessages =
    filterUser === "all"
      ? messages
      : messages.filter(m => m.username === filterUser)

  const unreadCount = messages.filter(m => !m.read).length

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            {/* === BUTTON KEMBALI (SATU-SATUNYA TAMBAHAN) === */}
            <button
              onClick={() => navigate(-1)}
              className="mb-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              ← Kembali
            </button>

            <h1 className="text-3xl font-bold mb-1">💬 Admin Chat Panel</h1>
            <p className="text-purple-100">
              Balas pesan user dan kelola komunikasi
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              {unreadCount} Belum Dibalas
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex gap-6 p-8 overflow-hidden">
        {/* LEFT: USER LIST */}
        <div className="w-64 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">👥 Filter User</h3>

          <button
            onClick={() => {
              setFilterUser("all")
              setSelectedMessageId(null)
            }}
            className={`w-full p-3 rounded-lg mb-3 font-semibold transition text-left ${
              filterUser === "all"
                ? "bg-purple-600 text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            Semua ({messages.length})
          </button>

          <div className="border-t pt-4">
            {uniqueUsers.length === 0 ? (
              <p className="text-slate-500 text-sm">Belum ada user</p>
            ) : (
              uniqueUsers.map(username => {
                const userMessages = messages.filter(
                  m => m.username === username
                )
                const userUnread = userMessages.filter(
                  m => !m.read
                ).length
                return (
                  <button
                    key={username}
                    onClick={() => {
                      setFilterUser(username)
                      setSelectedMessageId(null)
                    }}
                    className={`w-full p-3 rounded-lg mb-2 font-semibold transition text-left flex justify-between items-center ${
                      filterUser === username
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    <span>{username}</span>
                    {userUnread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {userUnread}
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* RIGHT: CHAT AREA */}
        <div className="flex-1 flex flex-col bg-slate-50 rounded-2xl shadow-lg overflow-hidden">
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div className="text-slate-400">
                  <p className="text-5xl mb-4">💭</p>
                  <p className="text-xl font-semibold">Tidak ada pesan</p>
                </div>
              </div>
            ) : (
              filteredMessages.map(message => (
                <div key={message.id} className="space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-2xl bg-blue-100 border-2 border-blue-300 p-5 rounded-2xl rounded-bl-none">
                      <p className="text-sm font-bold text-blue-900 mb-2">
                        👤 {message.username}
                      </p>
                      <p className="text-slate-800 whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <p className="text-xs text-blue-700 mt-2">
                        {new Date(
                          message.timestamp
                        ).toLocaleString("id-ID")}
                      </p>

                      {!message.reply && (
                        <button
                          onClick={() =>
                            setSelectedMessageId(message.id)
                          }
                          className="mt-3 px-4 py-2 rounded-lg font-semibold text-sm bg-blue-300 hover:bg-blue-400"
                        >
                          💬 Balas
                        </button>
                      )}
                    </div>
                  </div>

                  {message.reply && (
                    <div className="flex justify-end">
                      <div className="max-w-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-2xl rounded-br-none">
                        <p className="text-sm font-bold mb-2">
                          🟣 {message.reply.from}
                        </p>
                        <p className="whitespace-pre-wrap">
                          {message.reply.text}
                        </p>
                        <p className="text-xs text-purple-100 mt-2">
                          {new Date(
                            message.reply.timestamp
                          ).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* REPLY FORM */}
          <div className="border-t-2 border-slate-200 p-6 bg-white">
            {selectedMessageId ? (
              <>
                <textarea
                  value={adminReply}
                  onChange={e => setAdminReply(e.target.value)}
                  rows="3"
                  className="w-full p-4 border rounded-xl mb-4"
                />

                <button
                  onClick={replyMessage}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl"
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
