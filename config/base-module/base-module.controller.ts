import { Model } from "mongoose"

export type BaseModelValue = Record<string, unknown>

export class BaseModuleController<M extends BaseModelValue = BaseModelValue> {
    model!: Model<M>

    /**
     * @todo сделать интерфейс BaseControllerParams и положить туда model
     */
    constructor(model: Model<M>) {
        this.model = model
    }
}