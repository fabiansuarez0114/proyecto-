"use client";
import { useState } from "react";

export default function ProjectForm() {
  const [tipo, setTipo] = useState("Sitio web estático");
  const [dias, setDias] = useState(5);
  const [horas, setHoras] = useState(4);
  const [personas, setPersonas] = useState(2);
  const [cronograma, setCronograma] = useState<any[]>([]);

  const handleGenerarCronograma = () => {
    let sprints: string[] = [];

    switch (tipo) {
      case "Sitio web estático":
        sprints = ["Diseño", "Desarrollo HTML/CSS/JS", "Pruebas/Deploy"];
        break;
      case "Sitio web dinámico":
        sprints = ["Diseño UI", "Backend/DB", "Frontend", "Pruebas/Deploy"];
        break;
      case "Aplicación web progresiva (PWA)":
        sprints = ["Diseño UI", "Frontend", "Backend/API", "Testing/Deploy"];
        break;
      case "E-commerce / Tienda en línea":
        sprints = ["Diseño UI", "Frontend", "Backend/DB", "Carrito/Pagos", "Testing/Deploy"];
        break;
    }

    const diasPorSprint = Math.ceil(dias / sprints.length);

    const resultado = sprints.map((tarea, index) => {
      let subtareas = [];
      for (let i = 1; i <= personas; i++) {
        subtareas.push(`Persona ${i}: ${tarea}`);
      }

      return {
        sprint: index + 1,
        tarea,
        subtareas,
        dias: diasPorSprint,
        horasPorDia: horas,
        personas,
      };
    });

    setCronograma(resultado);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Planificador Scrum</h2>

      <div className="flex flex-col gap-4 mb-4">
        <label>
          Tipo de proyecto:
          <select
            className="border p-2 rounded w-full"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option>Sitio web estático</option>
            <option>Sitio web dinámico</option>
            <option>Aplicación web progresiva (PWA)</option>
            <option>E-commerce / Tienda en línea</option>
          </select>
        </label>

        <label>
          Días totales:
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
          />
        </label>

        <label>
          Horas por día:
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
          />
        </label>

        <label>
          Número de personas:
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={personas}
            onChange={(e) => setPersonas(Number(e.target.value))}
          />
        </label>
      </div>

      <button
        onClick={handleGenerarCronograma}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Generar Cronograma
      </button>

      {cronograma.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Cronograma Scrum</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cronograma.map((item) => (
              <div key={item.sprint} className="p-4 bg-gray-100 rounded shadow">
                <p><strong>Sprint {item.sprint}</strong></p>
                <p>Tarea: {item.tarea}</p>
                <p>Días: {item.dias}</p>
                <p>Horas/día: {item.horasPorDia}</p>
                <p>Personas: {item.personas}</p>
                <p className="mt-2 font-semibold">Subtareas:</p>
                <ul className="list-disc list-inside">
                  {item.subtareas.map((sub, idx) => (
                    <li key={idx}>{sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
