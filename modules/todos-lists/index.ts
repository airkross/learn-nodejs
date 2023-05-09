import { BaseModule } from "../../config/base-module";
import { TodosListsRouter } from "./todos-lists.routes";
import { TodosListsController } from "./todos-lists.controller";
import { TodosListsModelValues } from "./todos-lists.types";

export class TodosListsModule extends BaseModule<TodosListsModelValues, TodosListsController, TodosListsRouter> {
    protected override getRouterModule() {
        return new TodosListsRouter();
    }
}

export default new TodosListsModule();
