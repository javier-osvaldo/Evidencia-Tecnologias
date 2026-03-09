import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Citas from "./pages/Citas";

// ── Estilos de botones ────────────────────────────────────────────────────────
const btn = {
  primary: {
    backgroundColor: "#0891b2",
    color: "#ffffff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  dark: {
    backgroundColor: "#164e63",
    color: "#ffffff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  danger: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  large: {
    backgroundColor: "#0891b2",
    color: "#ffffff",
    border: "none",
    padding: "14px 36px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(8,145,178,0.4)",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#0891b2",
    border: "2px solid #0891b2",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    fontWeight: "700",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="1.5" width="44" height="44">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Servicios de maternidad",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="1.5" width="44" height="44">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Procedimientos quirúrgicos",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="1.5" width="44" height="44">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Servicios ginecológicos",
  },
];

const DOCTORS = [
  {
    name: "Dr. Juan David Tirado",
    specialty: "MEDICINA GENERAL",
    bio: "Especialista en medicina general con amplia experiencia en atención primaria.",
  },
  {
    name: "Dra. Yanely Sanchez Lopez",
    specialty: "ANESTESIOLOGÍA",
    bio: "Experta en anestesiología con más de 10 años de experiencia en procedimientos quirúrgicos.",
  },
  {
    name: "Dr. Javier Osvaldo Losoya",
    specialty: "PEDIATRÍA",
    bio: "Especialista en pediatría dedicado a la salud y bienestar de los más pequeños.",
  },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onLoginClick, user, onLogout, onCitasClick }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e0f2fe",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <div style={{
        width: "100%", margin: "0 auto",
        padding: "14px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
            <path d="M20 5 L20 35 M5 20 L35 20" stroke="#0891b2" strokeWidth="6" strokeLinecap="round" />
            <circle cx="20" cy="20" r="18" stroke="#0891b2" strokeWidth="3" opacity="0.3" />
          </svg>
          <span style={{ fontWeight: "800", color: "#111827", fontSize: "18px" }}>
            Centro Médico Apollo
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a href="#servicios" style={btn.primary}>Información</a>
          <a href="#acerca" style={btn.primary}>Acerca</a>
          {user ? (
            <>
              <button onClick={onCitasClick} style={btn.primary}>Mis citas</button>
              <span style={{ color: "#374151", fontWeight: "600", fontSize: "14px", padding: "0 4px" }}>
                {user.name}
              </span>
              <button onClick={onLogout} style={btn.danger}>Salir</button>
            </>
          ) : (
            <button onClick={onLoginClick} style={btn.dark}>Iniciar sesión</button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection({ onReservaClick }) {
  return (
    <section style={{
      position: "relative", width: "100%", minHeight: "100vh",
      display: "flex", alignItems: "center",
      overflow: "hidden", paddingTop: "64px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&auto=format&fit=crop&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(255,255,255,0.97) 40%, rgba(255,255,255,0.65) 65%, transparent)",
      }} />
      <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "80px 40px" }}>
        <div style={{ maxWidth: "540px" }}>
          <h1 style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: "900", color: "#111827",
            lineHeight: 1.1, marginBottom: "20px",
          }}>
            Infor<span style={{ color: "#0891b2" }}>mación</span>
          </h1>
          <p style={{
            color: "#4b5563", fontSize: "18px",
            lineHeight: 1.7, marginBottom: "36px",
          }}>
            Con su consulta registrada se le encargará al doctor que pueda verlo o verla para su revisión.
          </p>
          <button onClick={onReservaClick} style={btn.large}>
            Más información
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="servicios" style={{ width: "100%", padding: "88px 40px", backgroundColor: "#ffffff" }}>
      <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", color: "#0891b2", textTransform: "uppercase", marginBottom: "10px" }}>
        Nuestros Servicios
      </p>
      <p style={{ color: "#4b5563", fontSize: "17px", maxWidth: "520px", marginBottom: "52px", lineHeight: 1.7 }}>
        El Centro Médico Apollo ofrece una atención de primera categoría especializada en la salud de la mujer.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
        {SERVICES.map((s) => (
          <div key={s.title} style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px", padding: "40px 32px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "18px", textAlign: "center",
          }}>
            {s.icon}
            <h3 style={{ fontWeight: "700", color: "#111827", fontSize: "16px" }}>{s.title}</h3>
            <button style={btn.outline}>+</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Doctors ───────────────────────────────────────────────────────────────────
function DoctorsSection() {
  return (
    <section id="acerca" style={{ width: "100%", padding: "88px 40px", backgroundColor: "#0891b2" }}>
      <h2 style={{
        fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: "900", color: "#ffffff",
        textAlign: "center", marginBottom: "56px",
      }}>
        Conoce a nuestros médicos
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
        {DOCTORS.map((d) => (
          <div key={d.name} style={{
            backgroundColor: "#ffffff", borderRadius: "16px",
            padding: "32px 24px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex", flexDirection: "column",
            alignItems: "center", textAlign: "center", gap: "14px",
          }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, #22d3ee, #0d9488)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>
              <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: "700", fontSize: "16px", color: "#111827" }}>{d.name}</p>
              <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: "#0891b2", textTransform: "uppercase", marginTop: "4px" }}>
                {d.specialty}
              </p>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.65 }}>{d.bio}</p>
            <button style={btn.outline}>+</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onReservaClick }) {
  return (
    <footer style={{ width: "100%", backgroundColor: "#ffffff", borderTop: "1px solid #f3f4f6" }}>
      <div style={{
        width: "100%", margin: "0 auto",
        padding: "72px 40px",
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", gap: "48px",
      }}>
        <div>
          <div style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: "900", color: "#111827",
            lineHeight: 1.1, marginBottom: "28px",
          }}>
            Centro<br />Médico<br />
            <span style={{ color: "#0891b2" }}>Apollo</span>
          </div>
          <button onClick={onReservaClick} style={btn.large}>
            Reserva una consulta
          </button>
        </div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.12em", color: "#9ca3af", textTransform: "uppercase", marginBottom: "20px" }}>
            Ponte en contacto
          </p>
          {[
            { label: "Dirección",          value: "Angostura, Sinaloa, México" },
            { label: "Correo electrónico", value: "contacto@apollomedico.com" },
            { label: "Número telefónico",  value: "667 123 4567" },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "18px" }}>
              <p style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>{label}</p>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #f3f4f6", textAlign: "center", padding: "16px 40px", fontSize: "12px", color: "#9ca3af" }}>
        © 2026 Centro Médico Apollo. Todos los derechos reservados.
      </div>
    </footer>
  );
}

// ── Modales ───────────────────────────────────────────────────────────────────
function AuthModal({ onClose }) {
  const [modo, setModo] = useState("login");
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
    }}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: "16px", padding: "36px",
        width: "100%", maxWidth: "420px", position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          width: "32px", height: "32px", borderRadius: "50%",
          border: "none", backgroundColor: "#f3f4f6",
          color: "#374151", fontWeight: "700", fontSize: "16px", cursor: "pointer",
        }}>✕</button>
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
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
    }}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: "16px", padding: "36px",
        width: "100%", maxWidth: "580px", position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          width: "32px", height: "32px", borderRadius: "50%",
          border: "none", backgroundColor: "#f3f4f6",
          color: "#374151", fontWeight: "700", fontSize: "16px", cursor: "pointer",
        }}>✕</button>
        <Citas onClose={onClose} />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const { user, logout } = useAuth();
  const [showAuth,  setShowAuth]  = useState(false);
  const [showCitas, setShowCitas] = useState(false);

  const handleReserva = () => {
    if (!user) { setShowAuth(true); return; }
    setShowCitas(true);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        user={user}
        onLogout={logout}
        onCitasClick={() => setShowCitas(true)}
      />
      <HeroSection  onReservaClick={handleReserva} />
      <ServicesSection />
      <DoctorsSection />
      <Footer onReservaClick={handleReserva} />
      {showAuth  && <AuthModal  onClose={() => setShowAuth(false)} />}
      {showCitas && <CitasModal onClose={() => setShowCitas(false)} />}
    </div>
  );
}
