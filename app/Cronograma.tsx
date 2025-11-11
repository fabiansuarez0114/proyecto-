"use client";

type Assignment = {
  member: string;
  task: string;
  done?: boolean;
};

type ScheduleRow = {
  date: Date;
  sprint: string;
  assignments: Assignment[];
};

type CronogramaProps = {
  schedule: ScheduleRow[];
  editing: boolean;
  updateScheduleEntry: (dayIndex: number, assignIndex: number, field: "member" | "task", value: string) => void;
  toggleDone: (dayIndex: number, assignIndex: number) => void;
};

export default function Cronograma({ schedule, editing, updateScheduleEntry, toggleDone }: CronogramaProps) {
  // Calcular progreso por sprint
  const sprintProgress: Record<string, number> = {};
  schedule.forEach((row) => {
    const total = row.assignments.length;
    const done = row.assignments.filter((a) => a.done).length;
    if (!sprintProgress[row.sprint]) sprintProgress[row.sprint] = 0;
    sprintProgress[row.sprint] += total > 0 ? done / total : 0;
  });

  // Normalizar por número de días por sprint
  const sprintCounts: Record<string, number> = {};
  schedule.forEach((row) => {
    if (!sprintCounts[row.sprint]) sprintCounts[row.sprint] = 0;
    sprintCounts[row.sprint] += 1;
  });
  Object.keys(sprintProgress).forEach((s) => {
    sprintProgress[s] = Math.round((sprintProgress[s] / sprintCounts[s]) * 100);
  });

  return (
    <div id="cronograma-below" className="mt-8">
      <div className="card overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4">📋 Cronograma</h3>
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 border">Fecha</th>
              <th className="p-3 border">Sprint</th>
              <th className="p-3 border">Integrante</th>
              <th className="p-3 border">Tarea</th>
              <th className="p-3 border">Hecho</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, i) =>
              row.assignments.map((a, idx) => {
                const allDone = row.assignments.every((ass) => ass.done);
                const bgColor = a.done ? "#34D39933" : allDone ? "#34D39922" : "white";

                return (
                  <tr key={`${i}-${idx}`} style={{ backgroundColor: bgColor }}>
                    {idx === 0 && (
                      <>
                        <td rowSpan={row.assignments.length} className="p-3 border font-medium text-sm">
                          {row.date.toLocaleDateString()}
                        </td>
                        <td rowSpan={row.assignments.length} className="p-3 border text-indigo-600 font-semibold relative">
                          {row.sprint}
                          {/* Barra de progreso responsive */}
                          <div className="mt-1 w-full h-2 bg-gray-200 rounded relative overflow-hidden">
                            <div
                              className="h-2 bg-green-500 absolute top-0 left-0 rounded"
                              style={{ width: `${sprintProgress[row.sprint]}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-700 absolute top-0 right-1">
                            {sprintProgress[row.sprint]}%
                          </span>
                        </td>
                      </>
                    )}
                    <td className="p-3 border text-sm">{a.member}</td>
                    <td className="p-3 border text-sm">
                      {editing ? (
                        <input
                          value={a.task}
                          onChange={(e) => updateScheduleEntry(i, idx, "task", e.target.value)}
                          className="w-full px-1 py-0.5 border rounded"
                        />
                      ) : (
                        a.task
                      )}
                    </td>
                    <td className="p-3 border text-center">
                      <input type="checkbox" checked={!!a.done} onChange={() => toggleDone(i, idx)} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          table {
            font-size: 0.875rem; /* texto más pequeño en móvil */
          }
          td,
          th {
            padding: 0.3rem;
          }
          .absolute span {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
}
