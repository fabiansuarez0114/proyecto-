"use client";
import { useState } from "react";

type ProjectType = {
  id: string;
  title: string;
  colorClass: string;
  sprints: string[];
  tasksBySprint: Record<string, string[]>;
};

type PanelProps = {
  projectTypes?: ProjectType[];
  projectTypeIndex?: number;
  setProjectTypeIndex?: (n: number) => void;
  prevProjectType?: () => void;
  nextProjectType?: () => void;
};

export default function PanelDerecho({
  projectTypes,
  projectTypeIndex,
  setProjectTypeIndex,
  prevProjectType,
  nextProjectType,
}: PanelProps) {
  // If props not passed, the parent may be using the hook; show when mounted via props.
  const project = projectTypes ? projectTypes[projectTypeIndex ?? 0] : undefined;

  return (
    <aside className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">📚 Tipos de proyecto</h4>
        <div className="flex gap-2">
          <button onClick={prevProjectType} className="px-2 py-1 bg-white border rounded-md">◀</button>
          <button onClick={nextProjectType} className="px-2 py-1 bg-white border rounded-md">▶</button>
        </div>
      </div>

      <div className="space-y-3">
        {(projectTypes || []).map((pt: ProjectType, idx: number) => (
          <div
            key={pt.id}
            className={`${idx === projectTypeIndex ? "ring-2 ring-offset-2 ring-indigo-300" : ""} p-3 rounded-lg transition cursor-pointer`}
            onClick={() => setProjectTypeIndex && setProjectTypeIndex(idx)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{pt.title}</div>
                <div className="text-xs text-gray-500">{pt.sprints.length} sprints</div>
              </div>
              <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${pt.colorClass}`} />
            </div>
            {idx === projectTypeIndex && (
              <div className="mt-3 text-xs text-gray-600">
                {pt.sprints.map((s, i) => <div key={i}>• {s}</div>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ---------------------------
   Hook / provider local dentro del mismo fichero
   --------------------------- */
(PanelDerecho as any).useProjectTypes = function useProjectTypes() {
  const [projectTypeIndex, setProjectTypeIndex] = useState<number>(0);

  const projectTypes: ProjectType[] = [
    {
      id: "web",
      title: "Desarrollo Web",
      colorClass: "from-blue-400 to-indigo-500",
      sprints: [
        "Sprint 1 — Planificación",
        "Sprint 2 — Configuración",
        "Sprint 3 — Frontend",
        "Sprint 4 — Backend",
        "Sprint 5 — Integración y Pruebas",
        "Sprint 6 — Despliegue y Documentación",
      ],
      tasksBySprint: {
        "Sprint 1 — Planificación": ["Reunión inicial y definición de alcance", "Análisis de requerimientos", "Wireframes y arquitectura"],
        "Sprint 2 — Configuración": ["Crear repositorio y configuración de Git", "Configurar entorno (Node, Next, Tailwind)", "Estructura inicial del proyecto"],
        "Sprint 3 — Frontend": ["Diseñar componentes base", "Implementar páginas principales", "Adaptar estilos y responsive"],
        "Sprint 4 — Backend": ["Diseñar la API y endpoints", "Conectar base de datos", "Autenticación básica"],
        "Sprint 5 — Integración y Pruebas": ["Integrar frontend con API", "Pruebas funcionales y corrección de bugs"],
        "Sprint 6 — Despliegue y Documentación": ["Preparar build y despliegue", "Configurar dominio y HTTPS", "Documentación de uso y entrega"],
      },
    },
    {
      id: "mobile",
      title: "Apps Móviles",
      colorClass: "from-emerald-400 to-teal-500",
      sprints: ["Sprint 1 — Planificación", "Sprint 2 — Diseño UI/UX", "Sprint 3 — Desarrollo (App)", "Sprint 4 — Backend & APIs", "Sprint 5 — QA y Tests", "Sprint 6 — Publicación"],
      tasksBySprint: {
        "Sprint 1 — Planificación": ["Reunión de alcance", "Definir plataformas (iOS/Android)"],
        "Sprint 2 — Diseño UI/UX": ["Wireframes móviles", "Prototipos en Figma"],
        "Sprint 3 — Desarrollo (App)": ["Implementar pantallas", "Navegación y estado"],
        "Sprint 4 — Backend & APIs": ["Endpoints móviles", "Autenticación y sync"],
        "Sprint 5 — QA y Tests": ["Pruebas en dispositivos", "Corrección de errores"],
        "Sprint 6 — Publicación": ["Publicar en Stores", "Monitoreo post-release"],
      },
    },
    {
      id: "cloud",
      title: "Proyectos en la Nube",
      colorClass: "from-sky-400 to-cyan-500",
      sprints: [
        "Sprint 1 — Diseño de Arquitectura",
        "Sprint 2 — Infraestructura",
        "Sprint 3 — Desarrollo y Microservicios",
        "Sprint 4 — Integración",
        "Sprint 5 — Harden & Security",
        "Sprint 6 — Despliegue y Monitoring",
      ],
      tasksBySprint: {
        "Sprint 1 — Diseño de Arquitectura": ["Diseñar arquitectura cloud", "Decidir servicios (DB, queues)"],
        "Sprint 2 — Infraestructura": ["Provisionar infra", "IaC (Terraform)"],
        "Sprint 3 — Desarrollo y Microservicios": ["Implementar servicios", "Contenerizar con Docker"],
        "Sprint 4 — Integración": ["CI/CD pipelines", "Pruebas de integración"],
        "Sprint 5 — Harden & Security": ["Políticas IAM", "Escaneo de vulnerabilidades"],
        "Sprint 6 — Despliegue y Monitoring": ["Desplegar producción", "Configurar monitoring/alerts"],
      },
    },
    {
      id: "security",
      title: "Ciberseguridad",
      colorClass: "from-red-400 to-rose-500",
      sprints: [
        "Sprint 1 — Evaluación",
        "Sprint 2 — Pruebas (Pentest)",
        "Sprint 3 — Reportes",
        "Sprint 4 — Mitigación",
        "Sprint 5 — Revisión",
      ],
      tasksBySprint: {
        "Sprint 1 — Evaluación": ["Mapeo de activos", "Recolección de requisitos de seguridad"],
        "Sprint 2 — Pruebas (Pentest)": ["Pentesting interno", "Pruebas externas"],
        "Sprint 3 — Reportes": ["Generar informe de vulnerabilidades", "Priorizar hallazgos"],
        "Sprint 4 — Mitigación": ["Aplicar parches y controles", "Configuración segura"],
        "Sprint 5 — Revisión": ["Verificar mitigaciones", "Plan de mejora continua"],
      },
    },
    {
      id: "ai",
      title: "Inteligencia Artificial",
      colorClass: "from-violet-400 to-purple-600",
      sprints: [
        "Sprint 1 — Preparación de Datos",
        "Sprint 2 — Exploración y ETL",
        "Sprint 3 — Entrenamiento",
        "Sprint 4 — Evaluación",
        "Sprint 5 — Despliegue",
        "Sprint 6 — Monitoreo",
      ],
      tasksBySprint: {
        "Sprint 1 — Preparación de Datos": ["Recolectar datos", "Etiquetado y limpieza"],
        "Sprint 2 — Exploración y ETL": ["Análisis exploratorio", "Pipeline ETL"],
        "Sprint 3 — Entrenamiento": ["Entrenar modelos", "Tuning y validación"],
        "Sprint 4 — Evaluación": ["Métricas y pruebas A/B", "Robustez"],
        "Sprint 5 — Despliegue": ["Deploy del modelo", "API de inferencia"],
        "Sprint 6 — Monitoreo": ["Monitoreo de modelos", "Retraining planificado"],
      },
    },
  ];

  const prevProjectType = () =>
    setProjectTypeIndex((p: number) => (p - 1 + projectTypes.length) % projectTypes.length);
  const nextProjectType = () => setProjectTypeIndex((p: number) => (p + 1) % projectTypes.length);

  return { projectTypes, projectTypeIndex, setProjectTypeIndex, prevProjectType, nextProjectType };
};
