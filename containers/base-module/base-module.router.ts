import { Router } from "express";
import { BaseModuleController } from "./base-module.controller";
import { BaseModelValues } from "./base-module.types";
import { BaseModuleMiddleware } from "./base-module.middleware";

export class BaseModuleRoutes<
    V extends BaseModelValues, 
    C extends BaseModuleController<V>,
    M extends BaseModuleMiddleware
> {
    router!: ReturnType<typeof Router>;
    controllerModule!: C;
    middlewareModule!: M;

    constructor() {
        this.router = Router();
        this.controllerModule = this.getController();
        this.middlewareModule = this.getMiddleware();

        this.routesInit();
    }

    protected getController(): C {
        throw new Error("Method not implemented.");
    }

    protected getMiddleware(): M {
        throw new Error("Method not implemented.");
    }

    protected routesInit(): void {
        throw new Error("Method not implemented.");
    }
}
