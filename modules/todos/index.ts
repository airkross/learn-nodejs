import { BaseModule } from "../../containers/base-module";
import { TodosRouter } from "./todos.routes";
import { TodosController } from "./todos.controller";
import { TodosModelValues } from "./todos.types";

export class TodosModule extends BaseModule<TodosModelValues, TodosController, TodosRouter> {
    protected override getRouter() {
        return new TodosRouter();
    }
}