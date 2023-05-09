import { Model } from "mongoose";
import { BaseModelValues } from "./base-module.types";
import { BaseModuleRoutes } from "./base-module.routes";
import { BaseModuleController } from "./base-module.controller";

export class BaseModule<
    V extends BaseModelValues,
    C extends BaseModuleController<V>, 
    R extends BaseModuleRoutes<V, C>
> {
    routerModule!: R;

    constructor() {
        this.init();
    }

    protected init(): void {
        this.routerModule = this.getRouterModule();
    }

    protected getRouterModule(): R {
        throw new Error("Method not implemented.");
    }
}
