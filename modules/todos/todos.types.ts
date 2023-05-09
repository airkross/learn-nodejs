import { Model } from "mongoose";
import { BaseModelValues } from "../../config/base-module/base-module.types";
import { TodosListsModelValues } from "../todos-lists/todos-list.types";

export interface TodosModelValues extends BaseModelValues {
    isChecked?: boolean;
    title: string;
    description?: string;
    todosListId: string;
}

export interface TodosControllerModuleParams {
    todosListsModel: Model<TodosListsModelValues>;
    model: Model<TodosModelValues>;
}