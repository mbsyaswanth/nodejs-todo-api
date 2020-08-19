const Todo = require("../Models/Todo");

const createTodo = (request, response) => {
  const { description, status } = request.body;
  const todo = new Todo({ description, status });
  todo.save((error, savedTodo) => {
    if (error) {
      return response.status(404).send("Failed to create todo");
    }
    return response.json(savedTodo);
  });
};

const updateTodo = (request, response) => {
  const { _id, description, status } = request.body;
  Todo.findOneAndUpdate(
    { _id },
    { description, status },
    { new: true },
    (error, updatedTodo) => {
      if (error) {
        return response.status(404).send("Failed to update todo");
      }
      return response.json(updatedTodo);
    }
  );
};

const deleteTodo = (request, response) => {
  const { _id } = request.body;
  Todo.findByIdAndDelete(_id, (error, deletedTodo) => {
    if (error) {
      return response.status(404).send("Failed to delete todo");
    }
    return response.send("Successfully deleted todo");
  });
};

const getTodos = (request, response) => {
  Todo.find({}, (error, allTodos) => {
    if (error) {
      return response.status(404).send("Failed to get todos");
    }
    return response.json(allTodos);
  });
};

module.exports = { createTodo, updateTodo, deleteTodo, getTodos };
