import { BaseModuleController } from "./base-module.controller";

export type BaseModelValues = Record<string, unknown>;

export interface BaseRouterModuleParams<
    V extends BaseModelValues = BaseModelValues, 
    C extends BaseModuleController<V> = BaseModuleController<V>
> {
    controllerModule: C;
}
