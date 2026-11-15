import { Router } from "express";
import { TaskStatus } from "@prisma/client"; // enum
import { HttpError } from "../../middleware/error.js";
import * as service from "./tasks.service.js";

export const tasksRouter = Router();

// parses id into a number 
function toId(value: unknown, label = "id"): number {
    const n = Number(value);
    if (!Number.isInteger(n)) throw new HttpError(400, `Invalid ${label}`);
    return n;
}

// create an event task
// e.g. http://localhost:4000/api/events/1/tasks
tasksRouter.post("/events/:id/tasks", async (req, res, next) => {
    try {
        const eventId = toId(req.params.id); // e.g. "1"
        const { title, dueDate, ownerId } = req.body ?? {};
        if (!title || Number.isNaN(Date.parse(dueDate))) {
            throw new HttpError(400, "title and a valid due date are required");
        }
        res.status(201).json(
            await service.createTask(eventId, { title, dueDate, ownerId: toId(ownerId, "ownerId") })
        );
    } catch (e) { next(e); }
});

// list all event tasks
// e.g. http://localhost:4000/api/1/tasks
tasksRouter.get("/events/:id/tasks", async (req, res, next) => {
    try {
        res.json(await service.listEventTasks(toId(req.params.id)));
    } catch (e) { next(e); }
});

// update task status
// e.g. http://localhost:4000/api/tasks/1
tasksRouter.patch("/tasks/:id", async (req, res, next) => {
    try {
        const { status } = req.body ?? {};
        if (!Object.values(TaskStatus).includes(status)) {
            throw new HttpError(400, `status must be one of: ${Object.values(TaskStatus)}`);
        }
        res.json(await service.updateTaskStatus(toId(req.params.id), status));
    } catch (e) { next(e); }
});

// list user's tasks
// e.g. http://localhost:4000/api/me/tasks
tasksRouter.get("/me/tasks", async (req, res, next) => {
    try {
        res.json(await service.listMyTasks(toId(req.query.ownerId, "ownerId")));
    } catch (e) { next(e); }
});