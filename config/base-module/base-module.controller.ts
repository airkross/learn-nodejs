import { Model } from "mongoose"
import { BaseModelValues } from './base-module.types'

export class BaseModuleController<M extends BaseModelValues = BaseModelValues> {
    /**
     * @todo возможно убрать отсюда модель и перенести в индексный файл расширив дженерики
     */
    model!: Model<M>

    /**
     * @todo сделать интерфейс BaseControllerParams и положить туда model
     */
    constructor(model: Model<M>) {
        this.model = model
    }
}