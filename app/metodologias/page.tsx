"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Metodologias() {
  const [selected, setSelected] = useState<number | null>(null);

  const metodologias = [
    {
      id: 0,
      name: "Extreme Programming (XP)",
      gradient: "from-cyan-500 to-blue-600",
      desc: "Fuerte enfoque técnico: TDD, pair programming y refactorización. Ideal cuando la calidad del código es prioritaria.",
      bullets: [
        "Calidad técnica muy alta",
        "Entrega frecuente y feedback inmediato",
        "Reduce defectos a largo plazo",
      ],
      extra: `XP enfatiza la simplicidad, la comunicación y la retroalimentación continua. 
      Los equipos trabajan en parejas, escriben pruebas antes del código (TDD) y liberan pequeñas versiones con frecuencia.`,
    },
    {
      id: 1,
      name: "Scrum",
      gradient: "from-emerald-400 to-emerald-600",
      desc: "Organiza el trabajo en sprints y facilita la coordinación del equipo. Excelente para proyectos con entregas iterativas.",
      bullets: [
        "Roles claros y ceremonias definidas",
        "Fácil medición del progreso",
        "Promueve la mejora continua",
      ],
      extra: `Scrum define roles (Product Owner, Scrum Master, Equipo) y eventos (Daily, Sprint Review, Retrospective) 
      para garantizar transparencia, inspección y adaptación constante.`,
    },
    {
      id: 2,
      name: "Kanban",
      gradient: "from-amber-400 to-orange-500",
      desc: "Visualiza el flujo de trabajo y limita el WIP (trabajo en progreso). Muy útil para equipos que necesitan flexibilidad.",
      bullets: [
        "Visualización y control del flujo",
        "Reducción de cuellos de botella",
        "Muy adaptable a entornos cambiantes",
      ],
      extra: `Kanban permite gestionar tareas visualmente. 
      Cada columna representa un estado y se establecen límites WIP para evitar la sobrecarga del equipo.`,
    },
  ];

  const timeline = [
    {
      year: "1990s",
      title: "Nacimiento del Ágil",
      desc: "A finales de los 90, las empresas buscaban alternativas al modelo Waterfall. Surgió el enfoque ágil: priorizar al cliente, la colaboración y la adaptabilidad.",
      color: "from-indigo-400 to-fuchsia-400",
    },
    {
      year: "2001",
      title: "Manifiesto Ágil",
      desc: "Publicación del Manifiesto Ágil: valores y principios que ponen a las personas, el software y la respuesta al cambio por encima de procesos rígidos.",
      color: "from-cyan-400 to-blue-500",
    },
    {
      year: "2002-2005",
      title: "Scrum y XP se consolidan",
      desc: "Scrum y Extreme Programming (XP) se popularizan por su rapidez para entregar valor y su foco en retroalimentación continua.",
      color: "from-emerald-300 to-green-500",
    },
    {
      year: "2010s",
      title: "Kanban y Lean",
      desc: "Kanban y principios Lean se adoptan masivamente para optimizar flujo, eliminar desperdicios y visualizar el trabajo.",
      color: "from-amber-300 to-orange-400",
    },
    {
      year: "Hoy",
      title: "Agilidad Híbrida",
      desc: "Equipos combinan prácticas (Scrum+Kanban+XP+Design Thinking) apoyados en herramientas digitales y trabajo remoto.",
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-gray-800 text-slate-100">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-4 bg-gradient-to-r from-slate-800/80 to-indigo-900/80 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-300 to-cyan-400 shadow-md" />
          <h1 className="text-lg md:text-xl font-semibold text-white">
            Proyecto XP
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-slate-200">
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            Proyecto
          </Link>
          <Link
            href="/metodologias"
            className="text-yellow-300 font-semibold hover:text-yellow-200 transition-colors"
          >
            Metodologías
          </Link>
          <Link
            href="/inicio"
            className="text-yellow-300 font-semibold hover:text-yellow-200 transition-colors"
          >
           inicio
          </Link>
        </div>

        <button className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition">
          Cerrar sesión
        </button>
      </nav>

      {/* HEADER */}
      <motion.header
        className="max-w-5xl mx-auto px-6 text-center pt-12 pb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-emerald-300 to-yellow-300 text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]">
          Metodologías Ágiles
        </h2>
        <p className="mt-4 text-slate-200 text-base md:text-lg max-w-3xl mx-auto">
          Las metodologías ágiles transformaron la forma de crear software. Aquí exploramos{" "}
          <span className="text-yellow-300 font-semibold">XP</span>,{" "}
          <span className="text-yellow-300 font-semibold">Scrum</span> y{" "}
          <span className="text-yellow-300 font-semibold">Kanban</span>.
        </p>
      </motion.header>

      {/* TARJETAS INTERACTIVAS */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 md:px-0 mt-6">
        {metodologias.map((m, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl p-6 cursor-pointer bg-gradient-to-br ${m.gradient} shadow-lg text-white transition-all duration-500`}
            onClick={() => setSelected(selected === m.id ? null : m.id)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-lg font-bold mb-2">{m.name}</h4>
            <p className="text-sm mb-3">{m.desc}</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-2">
              {m.bullets.map((b, k) => (
                <li key={k}>{b}</li>
              ))}
            </ul>

            <AnimatePresence>
              {selected === m.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-sm bg-white/15 p-3 rounded-lg shadow-inner"
                >
                  {m.extra}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      {/* LÍNEA DE TIEMPO */}
      <main className="max-w-6xl mx-auto px-6 md:px-0 mt-16 pb-20">
        <section className="relative">
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-slate-700/60" />

          <div className="space-y-14">
            {timeline.map((item, idx) => (
              <motion.article
                key={idx}
                className="relative md:pl-20 pl-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <div
                  className={`absolute -left-10 md:-left-14 top-1 w-9 h-9 rounded-full bg-gradient-to-br ${item.color} shadow-md ring-2 ring-white/10`}
                />
                <h3 className="text-lg md:text-xl font-bold text-yellow-300">
                  {item.title}
                </h3>
                <time className="block text-sm text-slate-400 mb-2">{item.year}</time>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-block bg-yellow-300 text-slate-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-400 transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>

      <footer className="text-center py-8 text-slate-400 border-t border-slate-700">
        © {new Date().getFullYear()} Proyecto XP — Evolución del desarrollo ágil
      </footer>
    </div>
  );
}
