import { useState, useEffect } from "react"
import Layout from "../components/Layout"

// Load stories
function loadStories() {
  try {
    const saved = localStorage.getItem("stories")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Save stories
function saveStories(stories) {
  localStorage.setItem("stories", JSON.stringify(stories))
}

export default function Cerita() {
  const [stories, setStories] = useState([])
  const [name, setName] = useState("")
  const [story, setStory] = useState("")

  useEffect(() => {
    setStories(loadStories())
  }, [])

  const submitStory = () => {
    if (!name.trim() || !story.trim()) return

    const newStory = {
      id: Date.now(),
      author: name,
      story,
      createdAt: new Date().toISOString(),
    }

    const updated = [newStory, ...stories]
    setStories(updated)
    saveStories(updated)
    setStory("")
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">📝 Ruang Cerita</h1>
            <p className="text-slate-600 mt-2">
              Tempat aman untuk berbagi cerita dan perasaan
            </p>
          </div>

          {/* FORM CERITA */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama (boleh samaran)"
              className="w-full p-4 border rounded-xl"
            />

            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tulis ceritamu di sini..."
              rows={5}
              className="w-full p-4 border rounded-xl resize-none"
            />

            <button
              onClick={submitStory}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Kirim Cerita
            </button>
          </div>

          {/* DAFTAR CERITA */}
          <div className="space-y-4">
            {stories.length === 0 && (
              <p className="text-center text-slate-400 italic">
                Belum ada cerita yang dibagikan
              </p>
            )}

            {stories.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-blue-600">
                    {item.author}
                  </h3>
                  <span className="text-sm text-slate-400">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>

                <p className="text-slate-700 whitespace-pre-wrap">
                  {item.story}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  )
}
