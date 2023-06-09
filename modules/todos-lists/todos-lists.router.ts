import { BaseModuleRoutes } from "../../containers/base-module/base-module.router";
import { TodosListsController } from "./todos-lists.controller";
import { TodosListsMiddleware } from "./todos-lists.middleware";
import { TodosListsModelValues } from "./todos-lists.types";

export class TodosListsRouter extends BaseModuleRoutes<TodosListsModelValues, TodosListsController, TodosListsMiddleware> {
    protected override getController(): TodosListsController {
        return new TodosListsController()
    }

    protected override getMiddleware(): TodosListsMiddleware {
        return new TodosListsMiddleware()
    }

    override routesInit() {
        this.router.get("/todos-lists", this.controllerModule.getTodosLists.bind(this.controllerModule));

        this.router.get("/todos-lists/:list_id", this.middlewareModule.middlewares.list_id, this.controllerModule.getTodoList.bind(this.controllerModule));

        this.router.post("/todos-lists", this.controllerModule.addTodosList.bind(this.controllerModule));

        this.router.put("/todos-lists/:list_id", this.middlewareModule.middlewares.list_id, this.controllerModule.editTodosList.bind(this.controllerModule));

        this.router.delete("/todos-lists/:list_id", this.middlewareModule.middlewares.list_id, this.controllerModule.deleteTodosList.bind(this.controllerModule));
    }
}
