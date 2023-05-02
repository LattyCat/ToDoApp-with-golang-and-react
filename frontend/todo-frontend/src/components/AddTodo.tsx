import React, { useState } from "react";
import { addTodo } from "../services/todoService";

interface Props {
  onAdd: () => void;
}

export const AddTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo(title, completed);
    setTitle("");
    setCompleted(false);
    onAdd();
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
