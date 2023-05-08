import { BaseModuleRoutes } from './base-module.routes'
import { BaseModuleController } from './base-module.controller'

export type BaseModelValues = Record<string, unknown>

export interface BaseModuleParams<
    R extends BaseModuleRoutes = BaseModuleRoutes,
    V extends BaseModelValues = BaseModelValues,
    C extends BaseModuleController<V> = BaseModuleController<V>
> {
    routerModule: R
    controllerModule: C
}
