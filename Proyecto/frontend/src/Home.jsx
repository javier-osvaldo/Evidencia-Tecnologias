import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Citas from "./pages/Citas";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Servicios de maternidad",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Procedimientos quirúrgicos",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Servicios ginecológicos",
  },
];

const DOCTORS = [
  {
    name: "Dra. Juan David Tirado",
    specialty: "MEDICINA GENERAL",
    bio: "Especialista en medicina general con amplia experiencia en atención primaria.",
    color: "from-cyan-400 to-teal-500",
  },
  {
    name: "Dr. Yanely Sanchez Lopez",
    specialty: "ANESTESIOLOGÍA",
    bio: "Experta en anestesiología con más de 10 años de experiencia en procedimientos quirúrgicos.",
    color: "from-teal-400 to-cyan-600",
  },
  {
    name: "Dra. Javier Osvaldo Losoya",
    specialty: "PEDIATRÍA",
    bio: "Especialista en pediatría dedicado a la salud y bienestar de los más pequeños.",
    color: "from-cyan-500 to-sky-500",
  },
];

function Navbar({ onLoginClick, user, onLogout, onCitasClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-cyan-100 shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 text-cyan-500">
            <svg viewBox="0 0 40 40" fill="none">
              <path d="M20 5 L20 35 M5 20 L35 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight whitespace-nowrap">
            Centro Médico Apollo
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href="#servicios" className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors">
            Información
          </a>
          <a href="#acerca" className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors">
            Acerca
          </a>
          {user ? (
            <>
              <button onClick={onCitasClick} className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors">
                Mis citas
              </button>
              <span className="text-sm text-gray-700 font-medium px-1">{user.name}</span>
              <button onClick={onLogout} className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                Salir
              </button>
            </>
          ) : (
            <button onClick={onLoginClick} className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 transition-colors">
              Iniciar sesión
            </button>
          )}
        </div>

        <button className="md:hidden p-2 text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-cyan-100 px-4 py-3 flex flex-col gap-2">
          <a href="#servicios" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-cyan-500 text-center">Información</a>
          <a href="#acerca" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-cyan-500 text-center">Acerca</a>
          {user ? (
            <>
              <button onClick={() => { onCitasClick(); setMenuOpen(false); }} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-teal-600 text-center">Mis citas</button>
              <span className="text-center text-sm text-gray-700 font-medium">{user.name}</span>
              <button onClick={() => { onLogout(); setMenuOpen(false); }} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-red-500 text-center">Salir</button>
            </>
          ) : (
            <button onClick={() => { onLoginClick(); setMenuOpen(false); }} className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-cyan-800 text-center">Iniciar sesión</button>
          )}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onReservaClick }) {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&auto=format&fit=crop&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-24">
        <div className="max-w-xl">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-4">
            Infor<span className="text-cyan-500">mación</span>
          </h1>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Con su consulta registrada se le encargará al doctor que pueda verlo o verla para su revisión.
          </p>
          <button
            onClick={onReservaClick}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full shadow-lg shadow-cyan-300/50 transition-all hover:scale-105 active:scale-95"
          >
            Más información
          </button>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-20 bg-white">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8">
        <p className="text-xs font-bold tracking-widest text-cyan-500 uppercase mb-2">Nuestros Servicios</p>
        <p className="text-gray-600 text-lg max-w-xl mb-12">
          El Centro Médico Apollo ofrece una atención de primera categoría especializada en la salud de la mujer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-4 group">
              <div className="text-cyan-500 group-hover:text-teal-600 transition-colors">{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-center">{s.title}</h3>
              <button className="w-8 h-8 rounded-full border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all flex items-center justify-center text-lg font-bold">+</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorsSection() {
  return (
    <section id="acerca" className="w-full py-20 bg-cyan-500">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl font-black text-white text-center mb-14">Conoce a nuestros médicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.map((d) => (
            <div key={d.name} className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center gap-3">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${d.color} flex items-center justify-center shadow-md`}>
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 opacity-90">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{d.name}</h3>
                <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase mt-0.5">{d.specialty}</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{d.bio}</p>
              <button className="w-8 h-8 rounded-full border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all flex items-center justify-center text-lg font-bold mt-1">+</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onReservaClick }) {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-16 flex flex-col sm:flex-row items-start justify-between gap-12">
        <div>
          <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">
            Centro<br />Médico<br /><span className="text-cyan-500">Apollo</span>
          </h2>
          <button
            onClick={onReservaClick}
            className="px-7 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full shadow-lg shadow-cyan-200 transition-all hover:scale-105 active:scale-95"
          >
            Reserva una consulta
          </button>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Ponte en contacto</h3>
          <div className="space-y-4">
            {[
              { label: "Dirección", value: "Angostura, Sinaloa, México" },
              { label: "Correo electrónico", value: "contacto@apollomedico.com" },
              { label: "Número telefónico", value: "667 123 4567" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-sm font-bold text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 text-center py-4 text-xs text-gray-400">
        © 2026 Centro Médico Apollo. Todos los derechos reservados.
      </div>
    </footer>
  );
}

function AuthModal({ onClose }) {
  const [modo, setModo] = useState("login");
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors">
          ✕
        </button>
        {modo === "login"
          ? <Login onSwitch={() => setModo("register")} onClose={onClose} />
          : <Register onSwitch={() => setModo("login")} onClose={onClose} />
        }
      </div>
    </div>
  );
}

function CitasModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors">
          ✕
        </button>
        <Citas onClose={onClose} />
      </div>
    </div>
  );
}

export default function Home() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth]   = useState(false);
  const [showCitas, setShowCitas] = useState(false);

  const handleReserva = () => {
    if (!user) { setShowAuth(true); return; }
    setShowCitas(true);
  };

  return (
    <div className="w-full min-h-screen font-sans overflow-x-hidden">
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        user={user}
        onLogout={logout}
        onCitasClick={() => setShowCitas(true)}
      />
      <HeroSection onReservaClick={handleReserva} />
      <ServicesSection />
      <DoctorsSection />
      <Footer onReservaClick={handleReserva} />
      {showAuth  && <AuthModal  onClose={() => setShowAuth(false)} />}
      {showCitas && <CitasModal onClose={() => setShowCitas(false)} />}
    </div>
  );
}
