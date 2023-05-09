import { Model } from "mongoose";
import { BaseModelValues } from "../../config/base-module/base-module.types";
import { TodosModelValues } from "../todos/todos.types";

export interface TodosListsModelValues extends BaseModelValues {
    title: string;
    description?: string;
}

export interface TodosListsControllerModuleParams {
    todosModel: Model<TodosModelValues>;
    model: Model<TodosListsModelValues>;
}
