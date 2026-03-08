import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const DOCTORS = [
  { id: 7, nombre: 'Dra. Juan David Tirado' },
  { id: 8, nombre: 'Dr. Yanely Sanchez Lopez' },
  { id: 9, nombre: 'Dra. Javier Osvaldo Losoya Osornio' },
]

export default function Citas({ onClose }) {
  const { user } = useAuth()
  const [vista, setVista]         = useState('agendar') // 'agendar' | 'mis-citas'
  const [doctorId, setDoctorId]   = useState('')
  const [fecha, setFecha]         = useState('')
  const [horarios, setHorarios]   = useState([])
  const [horaSeleccionada, setHoraSeleccionada] = useState('')
  const [motivo, setMotivo]       = useState('')
  const [misCitas, setMisCitas]   = useState([])
  const [mensaje, setMensaje]     = useState('')
  const [loadingH, setLoadingH]   = useState(false)

  // Fecha mínima = hoy
  const hoy = new Date().toISOString().split('T')[0]

  // Cargar horarios cuando cambia doctor o fecha
  useEffect(() => {
    if (!doctorId || !fecha) return
    setLoadingH(true)
    setHoraSeleccionada('')
    api.get('/horarios', { params: { doctor_id: doctorId, fecha } })
      .then(res => setHorarios(res.data))
      .catch(() => setHorarios([]))
      .finally(() => setLoadingH(false))
  }, [doctorId, fecha])

  // Cargar mis citas
  useEffect(() => {
    if (vista === 'mis-citas') {
      api.get('/citas/mis-citas')
        .then(res => setMisCitas(res.data.citas))
        .catch(() => setMisCitas([]))
    }
  }, [vista])

  const agendarCita = async () => {
    setMensaje('')
    try {
      await api.post('/citas', {
        doctor_id: doctorId,
        fecha,
        hora: horaSeleccionada,
        motivo,
      })
      setMensaje('¡Cita agendada exitosamente!')
      setHoraSeleccionada('')
      setMotivo('')
      // Recargar horarios
      const res = await api.get('/horarios', { params: { doctor_id: doctorId, fecha } })
      setHorarios(res.data)
    } catch (e) {
      setMensaje(e.response?.data?.mensaje || 'Error al agendar')
    }
  }

  const cancelarCita = async (id) => {
    try {
      await api.put(`/citas/${id}/cancelar`)
      setMisCitas(prev => prev.map(c => c.id === id ? { ...c, estado: 'cancelada' } : c))
    } catch {}
  }

  const estadoColor = (estado) => ({
    pendiente: 'bg-yellow-100 text-yellow-700',
    atendida:  'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-600',
  }[estado] || '')

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100 pb-3">
        <button
          onClick={() => setVista('agendar')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            vista === 'agendar'
              ? 'bg-cyan-500 text-white'
              : 'text-gray-500 hover:text-cyan-600'
          }`}
        >
          Agendar cita
        </button>
        <button
          onClick={() => setVista('mis-citas')}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            vista === 'mis-citas'
              ? 'bg-cyan-500 text-white'
              : 'text-gray-500 hover:text-cyan-600'
          }`}
        >
          Mis citas
        </button>
      </div>

      {/* Agendar */}
      {vista === 'agendar' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Doctor</label>
            <select
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Seleccione un doctor</option>
              {DOCTORS.map(d => (
                <option key={d.id} value={d.id}>{d.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fecha</label>
            <input
              type="date"
              min={hoy}
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Horarios */}
          {doctorId && fecha && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Horario disponible
              </label>
              {loadingH ? (
                <p className="text-sm text-gray-400">Cargando horarios...</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {horarios.map(h => (
                    <button
                      key={h.hora}
                      disabled={!h.disponible}
                      onClick={() => h.disponible && setHoraSeleccionada(h.hora)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                        !h.disponible
                          ? 'bg-red-100 text-red-400 cursor-not-allowed line-through'
                          : horaSeleccionada === h.hora
                          ? 'bg-cyan-500 text-white shadow-md scale-105'
                          : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200'
                      }`}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {horaSeleccionada && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Motivo de consulta (opcional)
              </label>
              <input
                type="text"
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                placeholder="Ej: Revisión general"
                className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          )}

          {mensaje && (
            <div className={`text-sm px-3 py-2 rounded-lg ${
              mensaje.includes('exitosamente')
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {mensaje}
            </div>
          )}

          <button
            onClick={agendarCita}
            disabled={!horaSeleccionada}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-full transition-colors"
          >
            Confirmar cita
          </button>
        </div>
      )}

      {/* Mis citas */}
      {vista === 'mis-citas' && (
        <div className="space-y-3">
          {misCitas.length === 0 ? (
            <p className="text-center text-gray-400 py-6">No tienes citas registradas.</p>
          ) : (
            misCitas.map(cita => (
              <div key={cita.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    {cita.doctor?.nombre || 'Doctor'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {cita.fecha} — {cita.hora?.slice(0,5)}
                  </p>
                  {cita.motivo && (
                    <p className="text-xs text-gray-400 mt-0.5">{cita.motivo}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${estadoColor(cita.estado)}`}>
                    {cita.estado}
                  </span>
                  {cita.estado === 'pendiente' && (
                    <button
                      onClick={() => cancelarCita(cita.id)}
                      className="text-xs text-red-500 hover:underline"
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
  )
}