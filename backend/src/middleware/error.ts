import type { Request, Response, NextFunction } from "express";

export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export function notFound(_req: Request, res: Response) {
    res.status(404).json({ error: "Not found" });
}

// Express recognises an error handler by its 4 parameters
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}