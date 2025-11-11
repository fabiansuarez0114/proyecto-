// app/lib/tasksApi.ts
export type TaskPayload = {
  id?: number;
  title: string;
  description?: string;
  assignedTo?: string;
  sprint?: string;
  date: string; // ISO string
  completed?: boolean;
};

export async function fetchTasks() {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("Error fetching tasks");
  return res.json();
}

export async function createTask(payload: TaskPayload) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creating task");
  return res.json();
}

export async function updateTask(payload: Partial<TaskPayload> & { id: number }) {
  const res = await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error updating task");
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch("/api/tasks", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Error deleting task");
  return res.json();
}
