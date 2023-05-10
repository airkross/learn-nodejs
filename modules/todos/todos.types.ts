import { BaseModelValues } from "../../containers/base-module/base-module.types";

export interface TodosModelValues extends BaseModelValues {
    isChecked?: boolean;
    title: string;
    description?: string;
    todosListId: string;
}