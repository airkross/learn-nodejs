import { Model } from "mongoose";
import { BaseModule } from "../../config/base-module";
import { TodosListsRouter } from "./todos-lists.routes";
import { TodosListsController } from "./todos-lists.controller";
import { TodosListModel } from "./todos-lists.model";
import { TodosListsModelValues } from "./todos-list.types";
import { TodosModel } from "../todos/todos.model";

export class TodosListsModule extends BaseModule<TodosListsController, TodosListsRouter, TodosListsModelValues> {
    protected override getRouterModule() {
        return new TodosListsRouter({
            controllerModule: this.controllerModule,
        });
    }

    protected override getControllerModule() {
        /**
         * @todo исправить баг что todosModule - undefined
         */
        return new TodosListsController({
            model: this.modelModule,
            todosModel: TodosModel,
        });
    }

    protected override getModelModule() {
        return TodosListModel;
    }
}
const todosLists = new TodosListsModule();

export default todosLists;
