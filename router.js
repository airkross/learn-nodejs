import { Router } from 'express'
import { getTodosController, getTodoController, addTodoController, editTodoController, deleteTodoController } from './controllers.js'

const router = new Router()

router.get("/todos", getTodosController);

router.get("/todos/:id", getTodoController);

router.post("/todos", addTodoController);

router.put("/todos/:id", editTodoController);

router.post("/todos/:id", deleteTodoController);

export default router