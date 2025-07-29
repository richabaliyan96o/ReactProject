import React, { useState } from 'react';
import './Todo.css';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    if (isEditing) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = inputValue;
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTodos((prev) => [...prev, inputValue]);
    }
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      {todos.map((todo, index) => (
        <div key={index} className="todo-item">
          <p>{todo}</p>
          <button onClick={() => {
            setInputValue(todo);
            setIsEditing(true);
            setEditIndex(index);
          }}>Edit</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
      ))}

      <input
        type="text"
        value={inputValue}
        placeholder="Add a new task"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="add-update-btn" onClick={addTodo}>
        {isEditing ? "Update" : "Add"}
      </button>
    </div>
  );
};