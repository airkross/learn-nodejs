import { BaseModuleRoutes } from "../../config/base-module/base-module.routes";
// import todosListsController from "./todos-lists.controller";

// const { getTodosLists, getTodoList, addTodosList, editTodosList, deleteTodosList } = todosListsController;

export class TodosListsRouter extends BaseModuleRoutes {
    /**
     * @todo порефачить добавление роутов чтоб убрать импорт todosController
     */
    override addRoutes() {
        // this.router.get("/todos-lists/:list_id/todos", getTodosLists.bind(todosListsController));

        // this.router.get("/todos-lists/:list_id/todos/:id", getTodoList.bind(todosListsController));

        // this.router.post("/todos-lists/:list_id/todos", addTodosList.bind(todosListsController));

        // this.router.put("/todos-lists/:list_id/todos/:id", editTodosList.bind(todosListsController));

        // this.router.delete("/todos-lists/:list_id/todos/:id", deleteTodosList.bind(todosListsController));
    }
}
