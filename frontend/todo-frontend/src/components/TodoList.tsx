import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../services/todoService";
import { UpdateTodo } from "./UpdateTodo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  updateTrigger: boolean;
  onUpdate: () => void;
}

export const TodoList: React.FC<Props> = ({ updateTrigger, onUpdate }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    fetchTodos();
  }, [updateTrigger]);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleSelect = (event: React.MouseEvent, todo: Todo) => {
    event.stopPropagation();
    setSelectedTodo(todo);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completed" : "Not Completed"}
            <button onClick={(event) => handleSelect(event, todo)}>Update</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedTodo && (
        <UpdateTodo
          id={selectedTodo.id}
          currentTitle={selectedTodo.title}
          currentCompleted={selectedTodo.completed}
          onUpdate={fetchTodos}
        />
      )}
    </div>
  );
};

export default TodoList;
