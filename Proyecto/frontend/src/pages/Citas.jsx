import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";



const s = {
  // Layout general
  wrapper: { fontFamily: "system-ui, sans-serif", paddingTop: "8px" },

  // Tabs
  tabs: {
    display: "flex",
    gap: "8px",
    borderBottom: "1.5px solid #e5e7eb",
    paddingBottom: "14px",
    marginBottom: "28px",
  },
  tabActive: {
    padding: "8px 20px",
    borderRadius: "999px",
    border: "none",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#0891b2",
    color: "#ffffff",
  },
  tabInactive: {
    padding: "8px 20px",
    borderRadius: "999px",
    border: "none",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#4b5563",
  },

  // Formulario
  formGroup: { marginBottom: "20px" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    backgroundColor: "#ecfeff",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    backgroundColor: "#ecfeff",
    outline: "none",
  },

  // Horarios
  horariosTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px",
  },
  horariosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  horarioLibre: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "1.5px solid #a5f3fc",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#ecfeff",
    color: "#0e7490",
    textAlign: "center",
  },
  horarioOcupado: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "1.5px solid #fecaca",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "not-allowed",
    backgroundColor: "#fef2f2",
    color: "#fca5a5",
    textDecorationLine: "line-through",
    textAlign: "center",
  },
  horarioSeleccionado: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "1.5px solid #0891b2",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#0891b2",
    color: "#ffffff",
    textAlign: "center",
    transform: "scale(1.05)",
  },

  // Botones
  btnConfirmar: {
    width: "100%",
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    backgroundColor: "#0891b2",
    color: "#ffffff",
    marginTop: "8px",
  },
  btnConfirmarDisabled: {
    width: "100%",
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "not-allowed",
    backgroundColor: "#e5e7eb",
    color: "#9ca3af",
    marginTop: "8px",
  },
  btnCancelar: {
    fontSize: "13px",
    color: "#ef4444",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },

  // Alertas
  alertSuccess: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#16a34a",
  },
  alertError: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
  },

  // Cita card
  citaCard: {
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "12px",
  },
  citaDoctor: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#111827",
    marginBottom: "4px",
  },
  citaFecha: { fontSize: "13px", color: "#4b5563" },
  citaMotivo: { fontSize: "12px", color: "#9ca3af", marginTop: "2px" },

  // Badges
  badgePending: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#fef9c3",
    color: "#a16207",
    whiteSpace: "nowrap",
  },
  badgeAttended: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#dcfce7",
    color: "#15803d",
    whiteSpace: "nowrap",
  },
  badgeCanceled: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    whiteSpace: "nowrap",
  },

  // Empty state
  empty: {
    textAlign: "center",
    color: "#9ca3af",
    padding: "40px 0",
    fontSize: "14px",
  },

  // Loading
  loading: { fontSize: "13px", color: "#9ca3af", padding: "8px 0" },
};

export default function Citas({ onClose }) {

  const { user } = useAuth();
  
  const [doctores, setDoctores] = useState([]);
  const [vista, setVista] = useState("agendar");
  const [doctorId, setDoctorId] = useState("");
  const [fecha, setFecha] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [motivo, setMotivo] = useState("");
  const [misCitas, setMisCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState(""); // 'success' | 'error'
  const [loadingH, setLoadingH] = useState(false);

  const hoy = new Date().toISOString().split("T")[0];

  // Cargar horarios cuando cambia doctor o fecha
  useEffect(() => {
    if (!doctorId || !fecha) return;
    setLoadingH(true);
    setHoraSeleccionada("");
    api
      .get("/horarios", { params: { doctor_id: doctorId, fecha } })
      .then((res) => setHorarios(res.data))
      .catch(() => setHorarios([]))
      .finally(() => setLoadingH(false));
  }, [doctorId, fecha]);

  // Cargar mis citas
  useEffect(() => {
    if (vista !== "mis-citas") return;
    api
      .get("/citas/mis-citas")
      .then((res) => setMisCitas(res.data.citas))
      .catch(() => setMisCitas([]));
  }, [vista]);

  useEffect(() => {
    api
      .get("/doctores")
      .then((res) => {
        console.log(res.data);
        setDoctores(res.data);
      })
      .catch((err) => {
        console.log(err);
        setDoctores([]);
      });
  }, []);

  const agendarCita = async () => {
    setMensaje("");
    try {
      await api.post("/citas", {
        doctor_id: doctorId,
        fecha,
        hora: horaSeleccionada,
        motivo,
      });
      setMensaje("¡Cita agendada exitosamente!");
      setMensajeTipo("success");
      setHoraSeleccionada("");
      setMotivo("");
      const res = await api.get("/horarios", {
        params: { doctor_id: doctorId, fecha },
      });
      setHorarios(res.data);
    } catch (e) {
      setMensaje(e.response?.data?.mensaje || "Error al agendar la cita");
      setMensajeTipo("error");
    }
  };

  const cancelarCita = async (id) => {
    try {
      await api.put(`/citas/${id}/cancelar`);
      setMisCitas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, estado: "cancelada" } : c)),
      );
    } catch {}
  };

  const badgeStyle = (estado) =>
    ({
      pendiente: s.badgePending,
      atendida: s.badgeAttended,
      cancelada: s.badgeCanceled,
    })[estado] || s.badgePending;

  const horarioStyle = (h) => {
    if (!h.disponible) return s.horarioOcupado;
    if (horaSeleccionada === h.hora) return s.horarioSeleccionado;
    return s.horarioLibre;
  };

  return (
    <div style={s.wrapper}>
      {/* Tabs */}
      <div style={s.tabs}>
        <button
          style={vista === "agendar" ? s.tabActive : s.tabInactive}
          onClick={() => setVista("agendar")}
        >
          Agendar cita
        </button>
        <button
          style={vista === "mis-citas" ? s.tabActive : s.tabInactive}
          onClick={() => setVista("mis-citas")}
        >
          Mis citas
        </button>
      </div>

      {/* ── Agendar ── */}
      {vista === "agendar" && (
        <div>
          {/* Doctor */}
          <div style={s.formGroup}>
            <label style={s.label}>Doctor</label>
            <select
              style={s.select}
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div style={s.formGroup}>
            <label style={s.label}>Fecha</label>
            <input
              type="date"
              min={hoy}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={s.input}
            />
          </div>

          {/* Horarios */}
          {doctorId && fecha && (
            <div style={s.formGroup}>
              <p style={s.horariosTitle}>Horarios disponibles</p>
              {loadingH ? (
                <p style={s.loading}>Cargando horarios...</p>
              ) : (
                <div style={s.horariosGrid}>
                  {horarios.map((h) => (
                    <button
                      key={h.hora}
                      disabled={!h.disponible}
                      onClick={() =>
                        h.disponible && setHoraSeleccionada(h.hora)
                      }
                      style={horarioStyle(h)}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Motivo */}
          {horaSeleccionada && (
            <div style={s.formGroup}>
              <label style={s.label}>Motivo de consulta (opcional)</label>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej: Revisión general"
                style={s.input}
              />
            </div>
          )}

          {/* Mensaje */}
          {mensaje && (
            <div
              style={mensajeTipo === "success" ? s.alertSuccess : s.alertError}
            >
              {mensaje}
            </div>
          )}

          {/* Botón confirmar */}
          <button
            onClick={agendarCita}
            disabled={!horaSeleccionada}
            style={horaSeleccionada ? s.btnConfirmar : s.btnConfirmarDisabled}
          >
            Confirmar cita
          </button>
        </div>
      )}

      {/* ── Mis citas ── */}
      {vista === "mis-citas" && (
        <div>
          {misCitas.length === 0 ? (
            <p style={s.empty}>No tienes citas registradas.</p>
          ) : (
            misCitas.map((cita) => (
              <div key={cita.id} style={s.citaCard}>
                <div>
                  <p style={s.citaDoctor}>{cita.doctor?.nombre || "Doctor"}</p>
                  <p style={s.citaFecha}>
                    {cita.fecha} — {cita.hora?.slice(0, 5)}
                  </p>
                  {cita.motivo && <p style={s.citaMotivo}>{cita.motivo}</p>}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  <span style={badgeStyle(cita.estado)}>{cita.estado}</span>
                  {cita.estado === "pendiente" && (
                    <button
                      onClick={() => cancelarCita(cita.id)}
                      style={s.btnCancelar}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
