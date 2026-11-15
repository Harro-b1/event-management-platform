import { Router } from "express";
import { HttpError } from "../../middleware/error.js";
import * as service from "./events.service.js";

export const eventsRouter = Router();

// create an event
// e.g.http://localhost:4000/api/events
eventsRouter.post("/", async (req, res, next) => {
    try {
        const { name, date, venue } = req.body ?? {};
        if (!name || !venue || Number.isNaN(Date.parse(date))) {
            throw new HttpError(400, "name, venue and a valid date are required");
        }
        res.status(201).json(await service.createEvent({ name, date, venue }));
    } catch (e) { next(e); }
});

// retrieve all events or past events
// e.g. http://localhost:4000/api/events or http://localhost:4000/api/event?past=true
eventsRouter.get("/", async (req, res, next) => {
    try {
        res.json(await service.listEvents(req.query.past === "true"));
    } catch (e) { next(e); }
});

// retrieve an event
// e.g. http://localhost:4000/api/events/1
eventsRouter.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) throw new HttpError(400, "Invalid id");
        res.json(await service.getEvent(id));
    } catch (e) { next(e); }
});
