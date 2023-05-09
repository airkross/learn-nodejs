import { Router } from "express";
import { BaseModuleController } from './base-module.controller'
import { BaseRouterModuleParams } from './base-module.types'

export class BaseModuleRoutes<
    C extends BaseModuleController
> {
    router!: ReturnType<typeof Router>;
    controllerModule!: C

    constructor({ controllerModule }: BaseRouterModuleParams<C>) {
        this.router = Router();
        this.controllerModule = controllerModule
        /**
         * @todo исправить баг с тем что роуты инициализируются до того как появляется конструктор в дочернем классе
         * возможно перенести конструкторМодуль в этот класс из ребенка
         */
        this.routesInit()
    }

    protected routesInit(): void {
        throw new Error("Method not implemented.");
    }
}
