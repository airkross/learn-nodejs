import { Router } from "express";
import todosController from "./todos.controller";

const { getTodos, getTodo, addTodo, editTodo, checkTodo, deleteTodo } = todosController;
const router = Router();

router.get("/todos-lists/:list_id/todos", getTodos);

router.get("/todos-lists/:list_id/todos/:id", getTodo);

router.post("/todos-lists/:list_id/todos", addTodo);

router.put("/todos-lists/:list_id/todos/:id", editTodo);

router.patch("/todos-lists/:list_id/todos/:id", checkTodo);

router.delete("/todos-lists/:list_id/todos/:id", deleteTodo);

export default router;
