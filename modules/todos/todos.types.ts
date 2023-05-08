import { BaseModelValues, BaseModuleParams } from "../../config/base-module/base-module.types";
import { TodosRouter } from './todos.routes'
import { TodosController } from './todos.controller'

export interface TodoModelValues extends BaseModelValues {
    isChecked?: boolean
    title: string
    description?: string
    todosListId: string
}

export type TodosModuleParams = BaseModuleParams<TodosRouter, TodoModelValues, TodosController>