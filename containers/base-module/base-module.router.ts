import { Router } from "express";
import { BaseModuleController } from "./base-module.controller";
import { BaseModelValues } from "./base-module.types";

export class BaseModuleRoutes<
    V extends BaseModelValues, 
    C extends BaseModuleController<V>
> {
    router!: ReturnType<typeof Router>;
    controllerModule!: C;

    constructor() {
        this.router = Router();
        this.controllerModule = this.getController();

        this.routesInit();
    }

    protected getController(): C {
        throw new Error("Method not implemented.");
    }

    protected routesInit(): void {
        throw new Error("Method not implemented.");
    }
}
