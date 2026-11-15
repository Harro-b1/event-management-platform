import express from 'express';
import { healthRouter } from './routes/health.js';
import { eventsRouter } from "./modules/events/events.routes.js";
import { tasksRouter } from "./modules/tasks/tasks.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

export const app = express();

app.use(express.json());

app.use("/api/health", healthRouter); // singular method atm 
app.use("/api/events", eventsRouter);
app.use("/api", tasksRouter);

app.use(notFound);      // after all routes
app.use(errorHandler);  // always last