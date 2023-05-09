import { BaseModelValues } from "../../config/base-module/base-module.types";

export interface TodosModelValues extends BaseModelValues {
    isChecked?: boolean;
    title: string;
    description?: string;
    todosListId: string;
}