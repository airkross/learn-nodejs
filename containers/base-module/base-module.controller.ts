import { Model } from 'mongoose'
import { BaseModelValues } from './base-module.types'

export class BaseModuleController<V extends BaseModelValues> {
    model!: Model<V>

    constructor() {
        this.model = this.getModel()
    }

    protected getModel(): Model<V> {
        throw new Error("Method not implemented.");
    }
}
