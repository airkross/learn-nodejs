import { BaseModule } from "../../containers/base-module";
import { TodosListsRouter } from "./todos-lists.router";
import { TodosListsController } from "./todos-lists.controller";
import { TodosListsModelValues } from "./todos-lists.types";
import { TodosListsMiddleware } from "./todos-lists.middleware";

export class TodosListsModule extends BaseModule<TodosListsModelValues, TodosListsMiddleware, TodosListsController, TodosListsRouter> {
    protected override getRouter() {
        return new TodosListsRouter();
    }
}