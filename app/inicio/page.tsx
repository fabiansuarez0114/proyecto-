"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Bienvenida() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-100 text-gray-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold tracking-tight">🌐 Proyecto Crystal Clear</h1>
          <nav className="flex gap-6 text-lg font-medium">
            <Link href="/" className="hover:text-yellow-300 transition">
              Inicio
            </Link>
            <Link href="/metodologias" className="hover:text-yellow-300 transition">
              Metodologías
            </Link>
            <Link href="/register/page" className="hover:text-yellow-300 transition">
              Proyecto XP
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO / BIENVENIDA */}
      <section className="text-center py-20 bg-gradient-to-r from-sky-100 to-indigo-100">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-indigo-800 mb-4"
        >
          Bienvenido al Objeto Digital de Conocimiento (ODC)
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Este espacio digital te guía en el aprendizaje de{" "}
          <span className="font-semibold text-blue-700">metodologías ágiles</span>,
          aseguramiento de calidad, innovación y sostenibilidad en proyectos reales.
          Un entorno creado para aprender, experimentar e inspirar el cambio tecnológico.
        </motion.p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
          alt="Ilustración ODC"
          className="mx-auto w-40 opacity-95 hover:scale-110 transition-transform"
        />
      </section>

      {/* REA */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl font-bold text-blue-800 mb-4"
        >
          🎓 Resultado Esperado de Aprendizaje (REA)
        </motion.h3>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1 }}
          className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed"
        >
          Al finalizar este ODC, los participantes serán capaces de aplicar de forma práctica
          metodologías ágiles, identificar métricas de calidad, evaluar riesgos, y proponer
          soluciones innovadoras basadas en la sostenibilidad y el impacto digital.
          Se busca fortalecer competencias tanto técnicas como blandas, potenciando la colaboración interdisciplinaria.
        </motion.p>
      </section>

      {/* PÚBLICO OBJETIVO */}
      <section className="bg-gradient-to-b from-white via-blue-50 to-indigo-50 py-16 px-6 text-center">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-3xl font-bold text-indigo-800 mb-4"
        >
          🎯 Público Objetivo
        </motion.h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Estudiantes, docentes y profesionales de ingeniería y tecnología que buscan mejorar su comprensión
          de la gestión ágil, la calidad del software y la transformación digital. También orientado a emprendedores
          que deseen implementar prácticas modernas y sostenibles en sus proyectos.
        </p>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/target-audience-6502798-5395343.png"
          alt="Público objetivo"
          className="mx-auto mt-10 w-72"
        />
      </section>

      {/* CONCEPTOS Y ESTADÍSTICAS */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-3xl font-bold text-center text-indigo-800 mb-10">📊 Conceptos Clave y Datos</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Calidad de Software",
              text: "Más del 70% de los proyectos tecnológicos fallan por falta de pruebas adecuadas. La calidad se construye con planeación, colaboración y mejora continua.",
              img: "https://cdn-icons-png.flaticon.com/512/4149/4149644.png",
            },
            {
              title: "Metodologías Ágiles",
              text: "Scrum, XP y Kanban transforman la manera en que los equipos trabajan, promoviendo transparencia, iteración y comunicación efectiva.",
              img: "https://cdn-icons-png.flaticon.com/512/2721/2721290.png",
            },
            {
              title: "Productividad Sostenible",
              text: "El equilibrio entre innovación, bienestar y medio ambiente es clave para un desarrollo tecnológico responsable.",
              img: "https://cdn-icons-png.flaticon.com/512/4762/4762315.png",
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="card text-center bg-white border-t-4 border-blue-500 shadow-md"
            >
              <img src={c.img} alt={c.title} className="w-20 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{c.title}</h4>
              <p className="text-gray-700">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PUBLICIDAD Y COMPETITIVIDAD */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 className="text-3xl font-bold text-blue-800 mb-4">📢 Publicidad y Difusión</h3>
          <p className="text-gray-700 text-lg">
            La visibilidad digital es esencial. Aprender a comunicar ideas, resultados y productos tecnológicos
            con estrategias de marketing digital, diseño de marca y posicionamiento ético permite amplificar el impacto del conocimiento.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h3 className="text-3xl font-bold text-indigo-800 mb-4">⚙️ Competitividad</h3>
          <p className="text-gray-700 text-lg">
            En la era digital, la competitividad no solo depende de la tecnología,
            sino de la capacidad para adaptarse, colaborar y crear valor en entornos cambiantes.
          </p>
        </motion.div>
      </section>

      {/* RETOS DIGITALES */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 via-sky-50 to-white">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">💡 Retos Digitales del Siglo XXI</h3>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-10">
          El futuro digital exige mentes críticas, éticas e innovadoras. Cada reto representa una oportunidad
          de construir un mundo más seguro, eficiente e inclusivo.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: "🤖", title: "Inteligencia Artificial", text: "Automatiza tareas y potencia decisiones inteligentes." },
            { icon: "🌍", title: "Transformación Digital", text: "Adopta tecnologías que optimicen y humanicen los procesos." },
            { icon: "🔐", title: "Ciberseguridad", text: "Protege datos e infraestructuras críticas con responsabilidad digital." },
          ].map((r, i) => (
            <motion.div key={i} className="card text-center" whileHover={{ scale: 1.05 }}>
              <h4 className="font-semibold text-blue-700 mb-2 text-xl">{r.icon} {r.title}</h4>
              <p className="text-gray-700">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRANSLOCALIDAD */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" className="text-3xl font-bold text-indigo-800 mb-4">
          🌎 Translocalidad
        </motion.h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          La translocalidad fomenta la colaboración entre regiones, culturas y disciplinas. Gracias a las herramientas digitales,
          el conocimiento fluye sin fronteras, creando redes de innovación global que conectan mentes con propósito.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
          alt="Colaboración Global"
          className="mx-auto mt-10 w-64"
        />
      </section>

      {/* APLICABILIDAD */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 py-16 text-center">
        <h3 className="text-3xl font-bold text-blue-800 mb-6">💼 Aplicabilidad en el Mundo Real</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          Este ODC no se queda en la teoría: impulsa la implementación práctica de cada concepto aprendido.
          Las metodologías vistas se aplican en contextos educativos, empresariales y de innovación social,
          donde la calidad y la agilidad se convierten en herramientas reales de transformación.
        </p>
      </section>

      {/* ENGAGEMENT / ANÁLISIS */}
      <section className="py-16 text-center bg-gradient-to-r from-white via-blue-50 to-indigo-50">
        <h3 className="text-3xl font-bold text-indigo-800 mb-6">📈 Engagement y Análisis</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          Mediante evaluaciones, actividades interactivas y visualizaciones dinámicas,
          el ODC busca mantener al usuario comprometido y consciente de su progreso.
          La analítica del aprendizaje permite medir avances y promover la autorreflexión.
        </p>
      </section>

      {/* SOSTENIBILIDAD */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-green-700 mb-6">🌱 Sostenibilidad y Futuro Digital</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          En el contexto del desarrollo ágil y la calidad del software, la sostenibilidad no solo se refiere al medio ambiente, sino también a la capacidad de los equipos para mantener procesos eficientes, éticos y escalables en el tiempo.

Este proyecto promueve la creación de soluciones tecnológicas que equilibren rendimiento, impacto social y evolución continua, fomentando un desarrollo responsable que aporte valor real a las personas y a las organizaciones.

La sostenibilidad digital implica escribir código mantenible, usar recursos de forma inteligente y construir productos que perduren, inspirando una cultura de mejora constante, colaboración y propósito.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 bg-blue-900 text-white mt-10 shadow-inner">
        © {new Date().getFullYear()} Proyecto Crystal Clear — Universidad de Cundinamarca
      </footer>
    </div>
  );
}
