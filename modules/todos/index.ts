import { BaseModule } from "../../containers/base-module";
import { TodosRouter } from "./todos.router";
import { TodosController } from "./todos.controller";
import { TodosModelValues } from "./todos.types";
import { TodosMiddleware } from "./todos.middleware";

export class TodosModule extends BaseModule<TodosModelValues, TodosMiddleware, TodosController, TodosRouter> {
    protected override getRouter() {
        return new TodosRouter();
    }
}