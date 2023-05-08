import { BaseModuleParams, BaseModelValues } from './base-module.types'
import { BaseModuleRoutes } from './base-module.routes'
import { BaseModuleController } from './base-module.controller'

export class BaseModule<
    R extends BaseModuleRoutes,
    V extends BaseModelValues,
    C extends BaseModuleController<V>
> {
    routerModule!: BaseModuleParams<R, V, C>['routerModule']
    controllerModule!: BaseModuleParams<R, V, C>['controllerModule']

    constructor({ routerModule, controllerModule }: BaseModuleParams<R, V, C>) {
        this.routerModule = routerModule
        this.controllerModule = controllerModule
    }
}