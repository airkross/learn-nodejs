import { Model } from "mongoose";
import { BaseModelValues } from "./base-module.types";
import { BaseModuleRoutes } from "./base-module.routes";
import { BaseModuleController } from "./base-module.controller";

export class BaseModule<
    V extends BaseModelValues,
    C extends BaseModuleController<V>, 
    R extends BaseModuleRoutes<V, C>
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
