import { BaseModelValues } from "../../config/base-module/base-module.types";

export interface TodosListsModelValues extends BaseModelValues {
    title: string;
    description?: string;
}
