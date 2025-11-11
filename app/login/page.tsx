"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("⚠ No hay usuarios registrados. Regístrate primero.");
      router.push("/register");
      return;
    }

    const { email: savedEmail, password: savedPassword } = JSON.parse(savedUser);

    if (email === savedEmail && password === savedPassword) {
      alert("✅ Inicio de sesión exitoso");
      router.push("/dashboard"); // Redirige a un panel principal
    } else {
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}