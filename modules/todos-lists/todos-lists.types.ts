import { BaseModelValues } from "../../containers/base-module/base-module.types";

export interface TodosListsModelValues extends BaseModelValues {
    title: string;
    description?: string;
}
