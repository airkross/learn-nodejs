import { BaseModuleController } from "./base-module.controller";

export type BaseModelValues = Record<string, unknown>;

export interface BaseRouterModuleParams<C extends BaseModuleController = BaseModuleController> {
    controllerModule: C;
}
