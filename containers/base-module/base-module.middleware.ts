import { Middlewares } from "./base-module.types"

export class BaseModuleMiddleware {
    middlewares!: Middlewares

    constructor() {
        this.middlewares = this.middlewaresInit()
    }

    protected middlewaresInit(): Middlewares {
        throw new Error("Method not implemented.");
    }
}