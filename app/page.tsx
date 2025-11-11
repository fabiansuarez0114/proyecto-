"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/button";
import PanelDerecho from "./panelderecho";
import Calendario from "./Calendario";
import Integrantes from "./Integrantes";
import Cronograma from "./Cronograma";

/* -------------------- Tipos -------------------- */
type ScheduleRow = {
  date: Date;
  sprint: string;
  assignments: {
    member: string;
    task: string;
    done?: boolean;
  }[];
};

type StoredScheduleRow = {
  date: string; // ISO
  sprint: string;
  assignments: { member: string; task: string; done?: boolean }[];
};

type ProjectData = {
  id: string;
  name: string;
  type: string;
  selectedDays: string[]; // ISO strings
  teamMembers: string[];
  manualTasksByIndex: Record<number, string>;
  schedule: StoredScheduleRow[];
};

/* -------------------- Toast -------------------- */
const Toast = ({ message }: { message: string }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28 }}
        className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium z-50"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

/* -------------------- Componente Dashboard -------------------- */
export default function Dashboard() {
  /* Estados editor */
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>(""); // id del proyecto abierto
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("web");
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([""]);
  const [manualTasksByIndex, setManualTasksByIndex] = useState<Record<number, string>>({});
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState("");

  /* PanelDerecho hooks (dejas como estaba) */
  const {
    projectTypes,
    projectTypeIndex,
    setProjectTypeIndex,
    prevProjectType,
    nextProjectType,
  } = (PanelDerecho as any).useProjectTypes();

  /* -------------------- Inicializar desde localStorage -------------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dashboardProjects");
      const lastId = localStorage.getItem("lastOpenedProjectId");

      if (raw) {
        const parsed: ProjectData[] = JSON.parse(raw);
        setProjects(parsed || []);
        // Si hay lastOpenedProjectId, lo cargamos; sino si hay proyectos cargamos el primero
        const toOpen = lastId || (parsed && parsed.length > 0 ? parsed[0].id : "");
        if (toOpen) {
          // loadProject internamente hará set de estados
          setTimeout(() => loadProject(toOpen), 80); // pequeño delay para evitar conflictos en montaje
        }
      } else {
        // nada guardado: dejamos el editor vacío (usuario creará nuevo proyecto y luego guardará)
      }
    } catch (err) {
      console.error("Error al inicializar proyectos:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------- Persistencia automática de la lista de proyectos -------------------- */
  useEffect(() => {
    try {
      localStorage.setItem("dashboardProjects", JSON.stringify(projects));
    } catch (err) {
      console.error("Error guardando proyectos en localStorage:", err);
    }
  }, [projects]);

  /* -------------------- Helpers -------------------- */
  const sortUniqueDates = (dates: Date[]) => {
    const unique = Array.from(new Map(dates.map((d) => [d.toDateString(), d])).values());
    return unique.sort((a, b) => a.getTime() - b.getTime());
  };

  const toggleDaySelection = (day: Date) => {
    const exists = selectedDays.some((d) => d.toDateString() === day.toDateString());
    setSelectedDays((prev) =>
      exists ? prev.filter((d) => d.toDateString() !== day.toDateString()) : [...prev, day]
    );
  };

  const addMember = () => setTeamMembers((prev) => [...prev, ""]);

  const handleMemberChange = (index: number, value: string) => {
    setTeamMembers((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  const removeMember = (index: number) =>
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));

  const handleManualTaskChange = (index: number, value: string) =>
    setManualTasksByIndex((prev) => ({ ...prev, [index]: value }));

  /* -------------------- Lógica mejorada de distribución de tareas -------------------- */
  const generateSchedule = () => {
    if (teamMembers.length === 0 || teamMembers.every((m) => m.trim() === "")) {
      alert("Agrega al menos un integrante con nombre.");
      return;
    }

    const projectDef = projectTypes[projectTypeIndex];
    const sprints = projectDef.sprints;
    const tasksBySprint = projectDef.tasksBySprint;

    const daysToUse =
      selectedDays.length > 0
        ? sortUniqueDates(selectedDays)
        : (() => {
            const days: Date[] = [];
            const totalDays = Math.max(1, sprints.length);
            const start = new Date();
            for (let i = 0; i < totalDays; i++) {
              const d = new Date(start);
              d.setDate(start.getDate() + i);
              days.push(d);
            }
            return sortUniqueDates(days);
          })();

    if (daysToUse.length === 0) {
      alert("No hay días seleccionados.");
      return;
    }

    const chunkSize = Math.ceil(daysToUse.length / sprints.length);
    const sprintForDayIndex = (idx: number) => sprints[Math.min(Math.floor(idx / chunkSize), sprints.length - 1)];

    // Preparar tareas manuales por integrante
    const manualEntries: Record<number, string[]> = {};
    teamMembers.forEach((_, idx) => {
      const txt = manualTasksByIndex[idx];
      manualEntries[idx] = txt && txt.trim() !== "" ? txt.split(/[,;|]/).map((p) => p.trim()).filter(Boolean) : [];
    });

    // Construir cronograma: cada miembro recibe su propio conjunto de tareas (si puso manuales)
    const scheduleMap: ScheduleRow[] = daysToUse.map((d, dayIndex) => {
      const sprintName = sprintForDayIndex(dayIndex);
      const tasksForSprint = tasksBySprint[sprintName] || [];

      const assignments = teamMembers.map((member, memberIndex) => {
        let task = "Tarea general";

        // Si el miembro definió tareas manuales -> repartir de su lista
        if (manualEntries[memberIndex] && manualEntries[memberIndex].length > 0) {
          const arr = manualEntries[memberIndex];
          task = arr[dayIndex % arr.length];
        } else if (tasksForSprint.length > 0) {
          // Si no hay manuales, tomar tarea del sprint pero rotada por memberIndex para diversificar
          const idx = (dayIndex + memberIndex) % tasksForSprint.length;
          task = tasksForSprint[idx] || "Tarea general";
        }

        return { member, task, done: false };
      });

      return { date: d, sprint: sprintName, assignments };
    });

    setSchedule(scheduleMap);

    // Si ya hay un proyecto abierto, actualizarlo automáticamente en la lista (auto-save behavior)
    if (currentProjectId) {
      const updatedProject: ProjectData = {
        id: currentProjectId,
        name: projectName || "Sin nombre",
        type: projectType,
        selectedDays: selectedDays.map((d) => d.toISOString()),
        teamMembers,
        manualTasksByIndex,
        schedule: scheduleMap.map((r) => ({
          date: r.date.toISOString(),
          sprint: r.sprint,
          assignments: r.assignments.map((a) => ({ ...a })),
        })),
      };
      setProjects((prev) => prev.map((p) => (p.id === currentProjectId ? updatedProject : p)));
      localStorage.setItem("lastOpenedProjectId", currentProjectId);
    }

    setToastMessage("🧾 Cronograma generado");
    setTimeout(() => setToastMessage(""), 1200);
    setTimeout(() => document.getElementById("cronograma-below")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  /* -------------------- Actualizar entrada de schedule -------------------- */
  const updateScheduleEntry = (dayIndex: number, assignIndex: number, field: "member" | "task", value: string) => {
    setSchedule((prev) =>
      prev.map((row, rIdx) =>
        rIdx === dayIndex ? { ...row, assignments: row.assignments.map((a, aIdx) => (aIdx === assignIndex ? { ...a, [field]: value } : a)) } : row
      )
    );
  };

  const toggleDone = (dayIndex: number, assignIndex: number) => {
    setSchedule((prev) =>
      prev.map((row, rIdx) =>
        rIdx === dayIndex ? { ...row, assignments: row.assignments.map((a, aIdx) => (aIdx === assignIndex ? { ...a, done: !a.done } : a)) } : row
      )
    );
  };

  /* -------------------- Guardar proyecto actual (manual) -------------------- */
  const saveCurrentProject = () => {
    if (!projectName.trim()) {
      alert("Ponle un nombre al proyecto antes de guardar.");
      return;
    }

    const newProject: ProjectData = {
      id: currentProjectId || Date.now().toString(),
      name: projectName,
      type: projectType,
      selectedDays: selectedDays.map((d) => d.toISOString()),
      teamMembers,
      manualTasksByIndex,
      schedule: schedule.map((row) => ({
        date: row.date.toISOString(),
        sprint: row.sprint,
        assignments: row.assignments.map((a) => ({ ...a })),
      })),
    };

    setProjects((prev) => {
      const existing = prev.findIndex((p) => p.id === newProject.id);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = newProject;
        return copy;
      } else {
        return [...prev, newProject];
      }
    });

    setCurrentProjectId(newProject.id);
    localStorage.setItem("lastOpenedProjectId", newProject.id);
    setToastMessage("✅ Proyecto guardado correctamente");
    setTimeout(() => setToastMessage(""), 1600);
  };

  /* -------------------- Cargar proyecto por id -------------------- */
  const loadProject = (id: string) => {
    if (!id) {
      // limpiar editor
      setCurrentProjectId("");
      setProjectName("");
      setProjectType("web");
      setSelectedDays([]);
      setTeamMembers([""]);
      setManualTasksByIndex({});
      setSchedule([]);
      return;
    }
    const p = projects.find((pp) => pp.id === id);
    if (!p) return;
    setCurrentProjectId(p.id);
    setProjectName(p.name);
    setProjectType(p.type || "web");
    setSelectedDays((p.selectedDays || []).map((s) => new Date(s)));
    setTeamMembers(p.teamMembers?.length ? p.teamMembers : [""]);
    setManualTasksByIndex(p.manualTasksByIndex || {});
    setSchedule(
      (p.schedule || []).map((r) => ({
        date: new Date(r.date),
        sprint: r.sprint,
        assignments: r.assignments.map((a) => ({ ...a })),
      }))
    );
    localStorage.setItem("lastOpenedProjectId", p.id);
    setToastMessage(`Proyecto "${p.name}" cargado`);
    setTimeout(() => setToastMessage(""), 1400);
  };

  /* -------------------- Duplicar proyecto -------------------- */
  const duplicateProject = (id: string) => {
    const p = projects.find((pp) => pp.id === id);
    if (!p) return;
    const copy: ProjectData = {
      ...p,
      id: Date.now().toString(),
      name: `${p.name} (copia)`,
    };
    setProjects((prev) => [...prev, copy]);
    setToastMessage("📋 Proyecto duplicado");
    setTimeout(() => setToastMessage(""), 1200);
  };

  /* -------------------- Eliminar proyecto -------------------- */
  const deleteProject = (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (currentProjectId === id) {
      // limpiar editor
      setCurrentProjectId("");
      setProjectName("");
      setProjectType("web");
      setSelectedDays([]);
      setTeamMembers([""]);
      setManualTasksByIndex({});
      setSchedule([]);
    }
    localStorage.removeItem("lastOpenedProjectId");
    setToastMessage("🗑️ Proyecto eliminado");
    setTimeout(() => setToastMessage(""), 1400);
  };

  /* -------------------- Autosave (solo si hay proyecto abierto) -------------------- */
  useEffect(() => {
    if (!currentProjectId) return; // evitar crear proyectos vacíos
    // actualizar el proyecto existente en la lista
    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              name: projectName || p.name,
              type: projectType,
              selectedDays: selectedDays.map((d) => d.toISOString()),
              teamMembers,
              manualTasksByIndex,
              schedule: schedule.map((r) => ({ date: r.date.toISOString(), sprint: r.sprint, assignments: r.assignments.map((a) => ({ ...a })) })),
            }
          : p
      )
    );
    // marcar último abierto
    localStorage.setItem("lastOpenedProjectId", currentProjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName, projectType, selectedDays, teamMembers, manualTasksByIndex, schedule]);

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-white">
      {/* NAVBAR */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">📊 Proyecto XP</h1>

          <nav className="flex gap-8 text-lg font-semibold">
            <Link href="/register/page" className="hover:text-yellow-300">Proyecto</Link>
            <Link href="/metodologias" className="hover:text-yellow-300">Metodologías</Link>
          <Link href="/inicio" className="hover:text-yellow-300">Inicio</Link>
          </nav>

          <Button onClick={() => alert("Cerrar sesión")}>Cerrar sesión</Button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Proyectos guardados */}
                <div className="flex gap-3 items-center">
                  <label className="font-semibold">Proyectos guardados:</label>
                  <select
                    className="border rounded px-3 py-2"
                    value={currentProjectId}
                    onChange={(e) => loadProject(e.target.value)}
                  >
                    <option value="">-- Nuevo / Selecciona un proyecto --</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  {currentProjectId && (
                    <>
                      <button onClick={() => duplicateProject(currentProjectId)} className="px-3 py-2 bg-gray-200 rounded">
                        📋 Duplicar
                      </button>
                      <button onClick={() => deleteProject(currentProjectId)} className="px-3 py-2 bg-red-600 text-white rounded">
                        🗑️ Eliminar
                      </button>
                    </>
                  )}
                </div>

                <div className="card">
                  <label className="text-sm font-semibold text-gray-700">Nombre del proyecto</label>
                  <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ej. App móvil de ventas" className="w-full" />

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Tipo de proyecto</label>
                      <select
                        value={projectType}
                        onChange={(e) => {
                          setProjectType(e.target.value);
                          const idx = projectTypes.findIndex((p: any) => p.id === e.target.value);
                          if (idx >= 0) setProjectTypeIndex(idx);
                        }}
                        className="w-full"
                      >
                        {projectTypes.map((pt: any) => (
                          <option key={pt.id} value={pt.id}>
                            {pt.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Calendario selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
                  </div>
                </div>

                <Integrantes
                  teamMembers={teamMembers}
                  addMember={addMember}
                  removeMember={removeMember}
                  handleMemberChange={handleMemberChange}
                  manualTasksByIndex={manualTasksByIndex}
                  handleManualTaskChange={handleManualTaskChange}
                />

                <div className="flex flex-wrap gap-3">
                  <Button onClick={generateSchedule}>🪄 Generar cronograma</Button>
                  <Button onClick={saveCurrentProject}>💾 Guardar proyecto</Button>

                  <button
                    onClick={() => {
                      setSelectedDays([]);
                      setTeamMembers([""]);
                      setManualTasksByIndex({});
                      setSchedule([]);
                      setCurrentProjectId("");
                      setProjectName("");
                    }}
                    className="px-6 py-3 bg-white border rounded-lg"
                  >
                    Limpiar todo
                  </button>

                  <button
                    onClick={() => setEditing((s) => !s)}
                    className={`px-4 py-2 rounded-lg ${editing ? "bg-green-600 text-white" : "bg-white border"}`}
                  >
                    {editing ? "💾 Guardar edición" : "✏️ Editar cronograma"}
                  </button>
                </div>
              </div>

              <aside className="hidden lg:block">
                <PanelDerecho
                  projectTypes={projectTypes}
                  projectTypeIndex={projectTypeIndex}
                  setProjectTypeIndex={setProjectTypeIndex}
                  prevProjectType={prevProjectType}
                  nextProjectType={nextProjectType}
                />
              </aside>
            </div>

            <Cronograma schedule={schedule} editing={editing} updateScheduleEntry={updateScheduleEntry} toggleDone={toggleDone} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Toast message={toastMessage} />
    </div>
  );
}
