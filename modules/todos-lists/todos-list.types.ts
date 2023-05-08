import { BaseModuleParams, BaseModelValues } from "../../config/base-module/base-module.types";
import { TodosListsRouter } from './todos-lists.routes'
import { TodosListsController } from './todos-lists.controller'

export interface TodosListsModelValues extends BaseModelValues {
    title: string
    description?: string
}

export type TodosListsModuleParams = BaseModuleParams<TodosListsRouter, TodosListsModelValues, TodosListsController>