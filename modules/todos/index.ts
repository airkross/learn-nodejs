import { BaseModule } from "../../config/base-module";
import { TodosRouter } from "./todos.routes";
import { TodosController } from "./todos.controller";
import { TodosModel } from "./todos.model";
import { TodosModelValues } from "./todos.types";
import { TodosListModel } from "../todos-lists/todos-lists.model";

export class TodosModule extends BaseModule<TodosController, TodosRouter, TodosModelValues> {
    protected override getRouterModule() {
        return new TodosRouter({
            controllerModule: this.controllerModule,
        });
    }

    protected override getControllerModule() {
        return new TodosController({
            todosListsModel: TodosListModel,
            model: this.modelModule
        });
    }

    protected override getModelModule() {
        return TodosModel;
    }
}

const todosModule = new TodosModule()

export default todosModule;