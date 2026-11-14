import express from 'express';
import { healthRouter } from './routes/health.js';
import { notFound, errorHandler } from "./middleware/error.js";
import { eventsRouter } from "./modules/events/events.routes.js";

export const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);

app.use("/api/events", eventsRouter);

app.use(notFound);      // after all routes
app.use(errorHandler);  // always last