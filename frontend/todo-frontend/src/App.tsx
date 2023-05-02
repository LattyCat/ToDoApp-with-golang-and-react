import React from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [updateTrigger, setUpdateTrigger] = React.useState(false);

  const toggleUpdateTrigger = () => {
    setUpdateTrigger(!updateTrigger);
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo onAdd={toggleUpdateTrigger} />
      <TodoList updateTrigger={updateTrigger} onUpdate={toggleUpdateTrigger} />
    </div>
  );
}

export default App;