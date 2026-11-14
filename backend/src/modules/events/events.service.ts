import { prisma } from "../../db/client.js";
import { HttpError } from "../../middleware/error.js";

export function createEvent(data: { name: string; date: string; venue: string }) {
    return prisma.event.create({
        data: { name: data.name, venue: data.venue, date: new Date(data.date) },
    });
}

export function listEvents(past: boolean) {
    const now = new Date();
    return prisma.event.findMany({
        where: { date: past ? { lt: now } : { gte: now } },
        orderBy: { date: past ? "desc" : "asc" },
    });
}

export async function getEvent(id: number) {
    const event = await prisma.event.findUnique({
        where: { id },
        include: { tasks: true, allocations: { include: { equipment: true } } },
    });
    if (!event) throw new HttpError(404, "Event not found");
    return event;
}