import { Todo } from "./todos.types";

const todos: Array<Todo> = [];

const getTodos = () => {
  return todos;
};

const getTodoById = (id: number) => {
  return todos.find((todo) => todo.id === id);
};

const addTodo = (todo: Pick<Todo, "title" | "description">) => {
  todos.push({ id: Date.now(), ...todo });

  return true;
};

const editTodo = (id: number, todo: Pick<Todo, "title" | "description">) => {
  const index = todos.findIndex(({ id: todoId }) => todoId === +id);
  if (index === -1) {
    return false;
  }

  todos.splice(index, 1, { id, ...todo });
  return true;
};

const deleteTodoById = (id: number) => {
  const index = todos.findIndex((todo) => todo.id === +id);
  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
};

export { getTodos, getTodoById, addTodo, editTodo, deleteTodoById };
