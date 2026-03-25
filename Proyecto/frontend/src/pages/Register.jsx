import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register({ onSwitch, onClose }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    // Validaciones en el frontend antes de enviar
    if (!form.name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!form.email.trim()) {
      setError("El correo es obligatorio");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      onClose();
    } catch (e) {
      // Mensajes específicos del backend
      const errors = e.response?.data?.errors;
      if (errors) {
        if (errors.email) {
          setError(errors.email[0]);
          return;
        }
        if (errors.password) {
          setError(errors.password[0]);
          return;
        }
        if (errors.name) {
          setError(errors.name[0]);
          return;
        }
      }
      const msg = e.response?.data?.mensaje;
      if (msg) {
        setError(msg);
        return;
      }
      setError("Error al registrarse, intenta de nuevo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-gray-900">Crear cuenta</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Correo
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-3 py-2 bg-cyan-50 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-bold rounded-full transition-colors"
      >
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{" "}
        <span
          onClick={onSwitch}
          className="text-cyan-600 font-semibold cursor-pointer hover:underline"
        >
          Inicia sesión
        </span>
      </p>
    </div>
  );
}
