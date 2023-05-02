import React, { useState } from "react";
import { updateTodo } from "../services/todoService";

interface Props {
  id: number;
  currentTitle: string;
  currentCompleted: boolean;
  onUpdate: () => void;
}

export const UpdateTodo: React.FC<Props> = ({ id, currentTitle, currentCompleted, onUpdate }) => {
  const [title, setTitle] = useState(currentTitle);
  const [completed, setCompleted] = useState(currentCompleted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTodo(id, title, completed);
    onUpdate();
  };

  return (
    <div>
      <h2>Update Todo</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTodo;