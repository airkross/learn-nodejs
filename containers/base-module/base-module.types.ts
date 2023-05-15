import { Request, Response, NextFunction } from "express";

export type BaseModelValues = Record<string, unknown>;

export type Middleware = (req: Request, res: Response, next: NextFunction) => void

export interface Middlewares {
    [key: string]: Middleware
}