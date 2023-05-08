import { BaseModule } from '../../config/base-module'
import { TodosListsRouter } from './todos-lists.routes'
import { TodosListsController } from './todos-lists.controller'
import { TodosListModel } from './todos-lists.model'
import { TodosListsModuleParams, TodosListsModelValues } from './todos-list.types'

class TodosListsModule extends BaseModule<TodosListsRouter, TodosListsModelValues, TodosListsController> {
    constructor(params: TodosListsModuleParams) {
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
        this.routerModule.router.get("/todos-lists", this.controllerModule.getTodosLists.bind(this.controllerModule));

        this.routerModule.router.get("/todos-lists/:id", this.controllerModule.getTodoList.bind(this.controllerModule));

        this.routerModule.router.post("/todos-lists", this.controllerModule.addTodosList.bind(this.controllerModule));

        this.routerModule.router.put("/todos-lists/:id", this.controllerModule.editTodosList.bind(this.controllerModule));

        this.routerModule.router.delete("/todos-lists/:id", this.controllerModule.deleteTodosList.bind(this.controllerModule));
    }
}

const todosListsModule = new TodosListsModule({
    routerModule: new TodosListsRouter(),
    controllerModule: new TodosListsController(TodosListModel)
})

export default todosListsModule