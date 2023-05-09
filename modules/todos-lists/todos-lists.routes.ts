import { BaseModuleRoutes } from "../../config/base-module/base-module.routes";
import { TodosListsController } from "./todos-lists.controller";
import { TodosListsModelValues } from "./todos-lists.types";

export class TodosListsRouter extends BaseModuleRoutes<TodosListsModelValues, TodosListsController> {
    protected override getController(): TodosListsController {
        return new TodosListsController()
    }

    override routesInit() {
        this.router.get("/todos-lists", this.controllerModule.getTodosLists.bind(this.controllerModule));

        this.router.get("/todos-lists/:id", this.controllerModule.getTodoList.bind(this.controllerModule));

        this.router.post("/todos-lists", this.controllerModule.addTodosList.bind(this.controllerModule));

        this.router.put("/todos-lists/:id", this.controllerModule.editTodosList.bind(this.controllerModule));

        this.router.delete("/todos-lists/:id", this.controllerModule.deleteTodosList.bind(this.controllerModule));
    }
}
