import { BaseModuleRoutes } from "../../config/base-module/base-module.routes";
import { TodosController } from "./todos.controller";

export class TodosRouter extends BaseModuleRoutes<TodosController> {
    override routesInit() {
        this.router.get("/todos-lists/:list_id/todos", this.controllerModule.getTodos.bind(this.controllerModule));

        this.router.get("/todos-lists/:list_id/todos/:id", this.controllerModule.getTodo.bind(this.controllerModule));

        this.router.post("/todos-lists/:list_id/todos", this.controllerModule.addTodo.bind(this.controllerModule));

        this.router.put("/todos-lists/:list_id/todos/:id", this.controllerModule.editTodo.bind(this.controllerModule));

        this.router.patch("/todos-lists/:list_id/todos/:id", this.controllerModule.checkTodo.bind(this.controllerModule));

        this.router.delete("/todos-lists/:list_id/todos/:id", this.controllerModule.deleteTodo.bind(this.controllerModule));
    }
}
