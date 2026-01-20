import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 text-slate-800 overflow-x-hidden">

      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-indigo-200">
        <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center font-bold text-lg text-white">
              🌱
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
              Ruang Cerita
            </h1>
          </div>

          <div className="hidden lg:flex space-x-8 text-indigo-600 font-medium">
            <a href="#fitur" className="hover:text-indigo-800 transition">Fitur</a>
            <a href="#tentang" className="hover:text-indigo-800 transition">Tentang</a>
            <a href="#hubungi" className="hover:text-indigo-800 transition">Hubungi</a>
          </div>

          <div className="flex space-x-3">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen grid md:grid-cols-2 gap-12 px-6 md:px-12 pt-32 items-center max-w-7xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-indigo-900">
            Kamu Berharga.
            <br />
            <span className="text-indigo-600">
              Kami Hadir Untukmu.
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Ruang Cerita adalah platform kesehatan mental yang aman dan nyaman
            untuk berbagi cerita, mendapatkan dukungan, dan pulih bersama.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition text-center"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/register"
              className="border-2 border-indigo-300 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition text-center"
            >
              Daftar Gratis
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              { num: "100%", label: "Aman" },
              { num: "24/7", label: "Dukungan" },
              { num: "∞", label: "Peduli" }
            ].map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-3xl font-bold text-indigo-700">{stat.num}</h3>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="hidden md:block bg-white/70 backdrop-blur-xl border border-indigo-200 rounded-3xl p-12 shadow-xl space-y-6">
          <h3 className="text-2xl font-bold text-indigo-700">
            Mengapa Ruang Cerita?
          </h3>

          {[
            { icon: "🔐", title: "Privasi Terjamin", desc: "Data Anda aman dan rahasia" },
            { icon: "💬", title: "Ruang Aman", desc: "Didengar tanpa penghakiman" },
            { icon: "🏥", title: "Profesional", desc: "Didampingi psikolog" },
            { icon: "📚", title: "Edukasi", desc: "Belajar & pulih bersama" }
          ].map((item, idx) => (
            <div key={idx} className="flex space-x-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-semibold text-indigo-800">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dirancang untuk kenyamanan dan pemulihan mental
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: "💬", title: "Ruang Cerita", desc: "Curhat aman & nyaman" },
            { icon: "🧠", title: "Edukasi Mental", desc: "Artikel terpercaya" },
            { icon: "🌱", title: "Healing", desc: "Panduan pemulihan" },
            { icon: "👥", title: "Chat Psikolog", desc: "Dukungan profesional" },
            { icon: "📖", title: "Belajar", desc: "Pahami dirimu" },
            { icon: "🆘", title: "Bantuan Darurat", desc: "Akses cepat bantuan" }
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition border border-indigo-200"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="tentang" className="py-24 px-6 md:px-12 bg-indigo-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-800">
            Tentang Kami
          </h2>
          <p className="text-slate-600 text-lg">
            Kami percaya setiap orang pantas merasa aman, didengar,
            dan didukung dalam perjalanan pemulihan mentalnya.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="hubungi" className="py-24 px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-6">
          Kamu Tidak Sendiri
        </h2>
        <p className="text-lg text-slate-600 mb-10">
          Kami siap menemanimu kapan pun kamu butuh.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-4 rounded-xl font-semibold shadow hover:shadow-xl transition"
          >
            Login Sekarang
          </Link>
          <Link
            to="/register"
            className="border-2 border-indigo-300 text-indigo-600 px-10 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Buat Akun Baru
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-slate-600 bg-white border-t border-indigo-200">
        © 2025 Ruang Cerita · Bersama kita pulih 🌱
      </footer>
    </div>
  )
}
