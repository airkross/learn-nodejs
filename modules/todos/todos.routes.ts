import { Router } from "express";
import TodosController from "./todos.controller";

const { getTodos, getTodo, addTodo, editTodo, deleteTodo } = TodosController;
const router = Router();

router.get("/todos", getTodos);

router.get("/todos/:id", getTodo);

router.post("/todos", addTodo);

router.put("/todos/:id", editTodo);

router.delete("/todos/:id", deleteTodo);

export default router;
