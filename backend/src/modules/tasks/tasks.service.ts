import { TaskStatus } from "@prisma/client"; // enum 
import { prisma } from "../../db/client.js";
import { HttpError } from "../../middleware/error.js";

export async function createTask(eventId: number, data: { title: string; dueDate: string; ownerId: number }
) {
  const [event, owner] = await Promise.all([
    prisma.event.findUnique({ where: { id: eventId } }),
    prisma.user.findUnique({ where: { id: data.ownerId } }),
  ]);
  if (!event) throw new HttpError(404, "Event not found");
  if (!owner) throw new HttpError(400, "Owner not found");

  return prisma.task.create({
    data: {
      title: data.title,
      dueDate: new Date(data.dueDate),
      eventId,
      ownerId: data.ownerId,
    },
  });
}

export function listEventTasks(eventId: number) {
  return prisma.task.findMany({
    where: { eventId },
    orderBy: { dueDate: "asc" },
    include: { owner: { select: { id: true, name: true } } },
  });
}

export async function updateTaskStatus(id: number, status: TaskStatus) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) throw new HttpError(404, "Task not found");
  return prisma.task.update({ where: { id }, data: { status } });
}

export function listMyTasks(ownerId: number) {
  return prisma.task.findMany({
    where: { ownerId },
    orderBy: { dueDate: "asc" },
    include: { event: { select: { id: true, name: true } } },
  });
}