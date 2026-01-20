import { useState, useEffect, useRef } from "react"
import Layout from "../components/Layout"

// ===== localStorage helpers =====
function loadMessages() {
  try {
    const saved = localStorage.getItem("chat_messages")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveMessages(messages) {
  localStorage.setItem("chat_messages", JSON.stringify(messages))
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [username, setUsername] = useState("")
  const [showUsernameForm, setShowUsernameForm] = useState(true)
  const messagesEndRef = useRef(null)

  // ===== load data =====
  useEffect(() => {
    const savedMessages = loadMessages()
    setMessages(Array.isArray(savedMessages) ? savedMessages : [])

    const savedUsername = localStorage.getItem("user_chat_name")
    if (savedUsername) {
      setUsername(savedUsername)
      setShowUsernameForm(false)
    }
  }, [])

  // ===== auto scroll =====
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ===== set username =====
  const handleSetUsername = (e) => {
    e.preventDefault()
    if (!username.trim()) return
    localStorage.setItem("user_chat_name", username)
    setShowUsernameForm(false)
  }

  // ===== send message =====
  const sendMessage = () => {
    if (!input.trim() || !username.trim()) return

    const newMessage = {
      id: Date.now(),
      sender: "user",
      username,
      text: input,
      timestamp: new Date().toISOString(),
      read: false,
    }

    const updated = [...messages, newMessage]
    setMessages(updated)
    saveMessages(updated)
    setInput("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // ===== username form =====
  if (showUsernameForm) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
          <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
              💬 Selamat Datang
            </h1>
            <p className="text-center text-slate-600 mb-6">
              Sebelum mulai curhat, masukkan nama Anda
            </p>

            <form onSubmit={handleSetUsername} className="space-y-4">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nama (boleh samaran)"
                className="w-full p-4 border rounded-xl"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Lanjutkan
              </button>
            </form>
          </div>
        </div>
      </Layout>
    )
  }

  // ===== MAIN CHAT =====
  return (
    <Layout>
      <div className="h-screen flex flex-col bg-white">
        {/* HEADER */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">💬 Curhat & Konsultasi</h1>
          <p className="text-blue-100 text-sm">
            Halo {username}, silakan ceritakan keluh kesah Anda
          </p>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <p className="text-4xl mb-2">💭</p>
              <p className="font-semibold">Mulai percakapan Anda</p>
              <p className="text-sm">
                Tuliskan cerita atau perasaan Anda dengan aman
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-xl bg-blue-600 text-white p-4 rounded-2xl">
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs mt-2 text-blue-200">
                  {new Date(msg.timestamp).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
              placeholder="Tulis ceritamu di sini..."
              className="flex-1 p-3 border rounded-xl resize-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 rounded-xl font-semibold"
            >
              Kirim
            </button>
          </div>

          <p className="text-xs text-center text-slate-500 mt-2">
            Nama: <strong>{username}</strong> |{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                localStorage.removeItem("user_chat_name")
                setShowUsernameForm(true)
              }}
            >
              Ganti Nama
            </button>
          </p>
        </div>
      </div>
    </Layout>
  )
}
