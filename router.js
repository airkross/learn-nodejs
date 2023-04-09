import { Router } from 'express'
import { getTodosController, getTodoController, addTodoController, deleteTodoController } from './controllers.js'

const router = new Router()

router.get("/todos", getTodosController);

router.get("/todos/:id", getTodoController);

router.post("/todos", addTodoController);

router.post("/todo-delete", deleteTodoController);

export default router