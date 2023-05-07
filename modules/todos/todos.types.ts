import { BaseModelValue } from "../../config/base-module/base-module.controller";


export interface TodoModelProps extends BaseModelValue {
    isChecked?: boolean
    title: string
    description?: string
    todosListId: string
}