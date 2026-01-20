import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const menu = [
    { name: "Beranda", path: "/dashboard", icon: "🏠" },
    { name: "Cerita", path: "/cerita", icon: "✍️" },
    { name: "Curhat", path: "/curhat", icon: "💬" },
    { name: "Pulih", path: "/pulih", icon: "🌱" },
    { name: "Edukasi", path: "/edukasi", icon: "📘" },
    { name: "Komunitas", path: "/komunitas", icon: "👥" },
  ]

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col justify-between">

      <div>
        <div className="px-6 py-6 text-xl font-bold text-blue-600 flex items-center gap-2">
          🌿 Ruang Cerita
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-500 text-white shadow"
                    : "text-slate-600 hover:bg-blue-50"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <button className="w-full py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </aside>
  )
}
