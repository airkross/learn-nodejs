const todos = [];

const getTodos = () => {
  return todos;
};

const getTodoById = (id) => {
  return todos.find((todo) => todo.id === +id);
};

const addTodo = (todo) => {
  todos.push({ id: Date.now(),  ...todo });

  return true;
};

const deleteTodoById = (id) => {
  const index = todos.findIndex((todo) => todo.id === +id);

  if (index !== -1) {
    todos.splice(index, 1)

    return true;
  }
  
  return false
};

export {
    getTodos,
    getTodoById,
    addTodo,
    deleteTodoById,
}