import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils.ts/prisma";


// 📌 Obtener todas las tareas
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return NextResponse.json({ error: "Error al obtener tareas" }, { status: 500 });
  }
}

// 📌 Crear una nueva tarea
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, assignedTo, date, sprint } = data;

    if (!title) {
      return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        assignedTo,
        date: new Date(date),
        sprint,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return NextResponse.json({ error: "Error al crear tarea" }, { status: 500 });
  }
}
