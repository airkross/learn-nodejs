import { Router } from "express";
import todosListsController from "./todos-lists.controller";

const { getTodosLists, getTodoList, addTodosList, editTodosList, deleteTodosList } = todosListsController;
const router = Router();
/**
 * @todo сделать класс-обертку надо роутами
 */
router.get("/todos-lists", getTodosLists.bind(todosListsController));

router.get("/todos-lists/:id", getTodoList.bind(todosListsController));

router.post("/todos-lists", addTodosList.bind(todosListsController));

router.put("/todos-lists/:id", editTodosList.bind(todosListsController));

router.delete("/todos-lists/:id", deleteTodosList.bind(todosListsController));

export default router;
