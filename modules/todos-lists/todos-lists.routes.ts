import { Router } from "express";
import TodosListsController from "./todos-lists.controller";

const { getTodosLists, getTodoList, addTodosList, editTodosList, deleteTodosList } = TodosListsController;
const router = Router();

router.get("/todos-lists", getTodosLists);

router.get("/todos-lists/:id", getTodoList);

router.post("/todos-lists", addTodosList);

router.put("/todos-lists/:id", editTodosList);

router.delete("/todos-lists/:id", deleteTodosList);

export default router;
