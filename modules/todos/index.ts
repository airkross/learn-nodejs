import { BaseModule } from "../../config/base-module";
import { TodosRouter } from "./todos.routes";
import { TodosController } from "./todos.controller";
import { TodosModelValues } from "./todos.types";

export class TodosModule extends BaseModule<TodosModelValues, TodosController, TodosRouter> {
    protected override getRouterModule() {
        return new TodosRouter({
            controllerModule: this.controllerModule,
        });
    }

    protected override getControllerModule() {
        return new TodosController();
    }
}

export default new TodosModule();
