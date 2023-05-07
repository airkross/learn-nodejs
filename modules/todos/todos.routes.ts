import { Router } from "express";
import todosController from "./todos.controller";

const { getTodos, getTodo, addTodo, editTodo, checkTodo, deleteTodo } = todosController;
const router = Router();

/**
 * @todo сделать класс-обертку надо роутами
 */

router.get("/todos-lists/:list_id/todos", getTodos.bind(todosController));

router.get("/todos-lists/:list_id/todos/:id", getTodo.bind(todosController));

router.post("/todos-lists/:list_id/todos", addTodo.bind(todosController));

router.put("/todos-lists/:list_id/todos/:id", editTodo.bind(todosController));

router.patch("/todos-lists/:list_id/todos/:id", checkTodo.bind(todosController));

router.delete("/todos-lists/:list_id/todos/:id", deleteTodo.bind(todosController));

export default router;
