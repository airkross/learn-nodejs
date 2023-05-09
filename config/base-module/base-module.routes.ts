import { Router } from "express";
import { BaseModuleController } from "./base-module.controller";
import { BaseModelValues, BaseRouterModuleParams } from "./base-module.types";

export class BaseModuleRoutes<
    V extends BaseModelValues, 
    C extends BaseModuleController<V>
> {
    router!: ReturnType<typeof Router>;
    controllerModule!: C;

    constructor({ controllerModule }: BaseRouterModuleParams<V, C>) {
        this.router = Router();
        this.controllerModule = controllerModule;
        /**
         * @todo исправить баг с тем что роуты инициализируются до того как появляется конструктор в дочернем классе
         * возможно перенести конструкторМодуль в этот класс из ребенка
         */
        this.routesInit();
    }

    protected routesInit(): void {
        throw new Error("Method not implemented.");
    }
}
