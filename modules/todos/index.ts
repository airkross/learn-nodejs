import { BaseModule } from '../../config/base-module'
import { TodosRouter } from './todos.routes'
import { TodosController } from './todos.controller'
import { TodoModel } from './todos.model'
import { TodosModuleParams, TodoModelValues } from './todos.types'

class TodosModule extends BaseModule<TodosRouter, TodoModelValues, TodosController> {
    constructor(params: TodosModuleParams) {
        super(params)

        this.init()
    }

    init() {
        this.routesInit()
    }

    /**
     * @todo возможно перенести этот метод инита в модуль роутов
     */
    routesInit() {
        this.routerModule.router.get("/todos-lists/:list_id/todos", this.controllerModule.getTodos.bind(this.controllerModule));

        this.routerModule.router.get("/todos-lists/:list_id/todos/:id", this.controllerModule.getTodo.bind(this.controllerModule));

        this.routerModule.router.post("/todos-lists/:list_id/todos", this.controllerModule.addTodo.bind(this.controllerModule));

        this.routerModule.router.put("/todos-lists/:list_id/todos/:id", this.controllerModule.editTodo.bind(this.controllerModule));

        this.routerModule.router.patch("/todos-lists/:list_id/todos/:id", this.controllerModule.checkTodo.bind(this.controllerModule));

        this.routerModule.router.delete("/todos-lists/:list_id/todos/:id", this.controllerModule.deleteTodo.bind(this.controllerModule));
    }
}

const todosModule = new TodosModule({
    routerModule: new TodosRouter(),
    controllerModule: new TodosController(TodoModel)
})

export default todosModule