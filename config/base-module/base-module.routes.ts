import { Router } from "express";

export class BaseModuleRoutes {
    router!: ReturnType<typeof Router>;

    constructor() {
        this.router = Router();
    }

    protected addRoutes(): void {}
}
