import { Model } from "mongoose";
import { BaseModelValues } from "./base-module.types";
import { BaseModuleRoutes } from "./base-module.routes";
import { BaseModuleController } from "./base-module.controller";

export class BaseModule<
    C extends BaseModuleController = BaseModuleController,
    R extends BaseModuleRoutes<C> = BaseModuleRoutes<C>, 
    V extends BaseModelValues = BaseModelValues
> {
    routerModule!: R;
    controllerModule!: C;
    modelModule!: Model<V>;

    constructor() {
        this.init();
    }

    protected init(): void {
        this.modelModule = this.getModelModule();
        this.controllerModule = this.getControllerModule();
        this.routerModule = this.getRouterModule();
    }

    protected getRouterModule(): R {
        throw new Error("Method not implemented.");
    }

    protected getControllerModule(): C {
        throw new Error("Method not implemented.");
    }

    protected getModelModule(): Model<V> {
        throw new Error("Method not implemented.");
    }
}
