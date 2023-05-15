import { BaseModelValues } from "./base-module.types";
import { BaseModuleRoutes } from "./base-module.router";
import { BaseModuleController } from "./base-module.controller";
import { BaseModuleMiddleware } from "./base-module.middleware";

export class BaseModule<
    V extends BaseModelValues,
    M extends BaseModuleMiddleware, 
    C extends BaseModuleController<V>, 
    R extends BaseModuleRoutes<V, C, M>
> {
    router!: R;

    constructor() {
        this.init();
    }

    protected init(): void {
        this.router = this.getRouter();
    }

    protected getRouter(): R {
        throw new Error("Method not implemented.");
    }
}
