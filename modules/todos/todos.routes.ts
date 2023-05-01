import { Router } from "express";
import { getTodosController, getTodoController, addTodoController, editTodoController, deleteTodoController } from "./todos.controller";

const router = Router();

router.get("/todos", getTodosController);

router.get("/todos/:id", getTodoController);

router.post("/todos", addTodoController);

router.put("/todos/:id", editTodoController);

router.delete("/todos/:id", deleteTodoController);

export default router;
