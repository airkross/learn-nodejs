import { getTodos, getTodoById, addTodo, editTodo, deleteTodoById } from "./store.js";

const getTodosController = async (req, res) => {
  const todos = await getTodos();

  res.status(200).json(todos);
};

const getTodoController = async (req, res) => {
  const { id } = req.params;
  const todo = await getTodoById(id);

  if (todo) {
    res.status(200).json(todo);
  }
  
  res.status(404).json({
    message: `Заметка с id=${id} не существует.`,
  });
};

const addTodoController = async (req, res) => {
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

const editTodoController = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  const isSuccess = await editTodo(id, todo);

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



const deleteTodoController = async (req, res) => {
  const { id } = req.params;
  const isSuccess = await deleteTodoById(id);

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
