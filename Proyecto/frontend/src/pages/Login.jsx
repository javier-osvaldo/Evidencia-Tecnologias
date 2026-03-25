import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!form.email.trim()) {
      setError("El correo es obligatorio");
      return;
    }
    if (!form.password) {
      setError("La contraseña es obligatoria");
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      onClose();
    } catch (e) {
      const status = e.response?.status;
      if (status === 401) {
        setError("Correo o contraseña incorrectos");
      } else if (status === 422) {
        setError("Por favor verifica tus datos");
      } else {
        setError("Error al iniciar sesión, intenta de nuevo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black text-gray-900">Iniciar sesión</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

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
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-sm text-gray-500">
        ¿No tienes cuenta?{" "}
        <span
          onClick={onSwitch}
          className="text-cyan-600 font-semibold cursor-pointer hover:underline"
        >
          Regístrate
        </span>
      </p>
    </div>
  );
}
