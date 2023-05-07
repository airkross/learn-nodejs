import { BaseModelValue } from "../../config/base-module/base-module.controller";

export interface TodosListModelProps extends BaseModelValue {
    title: string
    description?: string
}