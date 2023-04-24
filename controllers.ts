import { Request, Response } from 'express'
import { getTodos, getTodoById, addTodo, editTodo, deleteTodoById } from "./store";

const getTodosController = async (req: Request, res: Response): Promise<void> => {
  const todos = await getTodos();

  res.status(200).json(todos);
};

const getTodoController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const todo = await getTodoById(Number(id));

  if (todo) {
    res.status(200).json(todo);
  }
  
  res.status(404).json({
    message: `Заметка с id=${id} не существует.`,
  });
};

const addTodoController = async (req: Request, res: Response): Promise<void> => {
  const todo = req.body;
  const isSuccess = await addTodo(todo);

  if (isSuccess) {
    res.status(200).json({
      message: "Заметка усшено создана.",
    });
    return;
  }

  res.status(400).json({
    message: "Ошбика создания заметки.",
  });
};

const editTodoController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const todo = req.body;
  const isSuccess = await editTodo(Number(id), todo);

  if (isSuccess) {
    res.status(200).json({
      message: "Заметка усшено редактирована.",
    });
    return;
  }

  res.status(404).json({
    message: `Заметка с id=${id} не существует.`,
  });
};



const deleteTodoController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const isSuccess = await deleteTodoById(Number(id));

  if (isSuccess) {
    res.status(200).send({
      message: `Заметка с id=${id} успешно удалена`,
    });
    return;
  }

  res.status(404).json({
    message: `Заметка с id=${id} не существует.`,
  });
};

export {
  getTodosController,
  getTodoController,
  addTodoController,
  editTodoController,
  deleteTodoController,
};
