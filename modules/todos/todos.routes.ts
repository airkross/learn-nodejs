import { BaseModuleRoutes } from "../../config/base-module/base-module.routes";
import todosController from "./todos.controller";

const { getTodos, getTodo, addTodo, editTodo, checkTodo, deleteTodo } = todosController;

export class TodosRouter extends BaseModuleRoutes {
    /**
     * @todo порефачить добавление роутов чтоб убрать импорт todosController
     */
    override addRoutes() {
        // this.router.get("/todos-lists/:list_id/todos", getTodos.bind(todosController));

        // this.router.get("/todos-lists/:list_id/todos/:id", getTodo.bind(todosController));

        // this.router.post("/todos-lists/:list_id/todos", addTodo.bind(todosController));

        // this.router.put("/todos-lists/:list_id/todos/:id", editTodo.bind(todosController));

        // this.router.patch("/todos-lists/:list_id/todos/:id", checkTodo.bind(todosController));

        // this.router.delete("/todos-lists/:list_id/todos/:id", deleteTodo.bind(todosController));
    }
}
