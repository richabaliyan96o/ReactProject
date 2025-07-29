import React, { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo } from "../vite-project/src/Utils/api";
import TodoCard from "./TodoCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Todo = ({ userKey }) => {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // -------logic to fetch todos from API-------------
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    fetchData();
  }, []);

  const filteredTodos = todos.filter((todo) => todo.userKey === userKey);

  const addItem = async () => {
    if (inputValue.trim() === "") return;
    if (isEditing) {
      const updatedTodos = todos.map(todo =>
        todo.id === editId ? { ...todo, todo: inputValue } : todo
      );
      setTodos(updatedTodos);
      setInputValue("");
      setEditId(null);
      setIsEditing(false);
    } else {
      try {
        const newTodo = await addTodo(inputValue);
        const todoWithNewsKey = { ...newTodo, userKey };
        setTodos([...todos, todoWithNewsKey]);
        setInputValue("");
      } catch (error) {
        console.error("Failed to add todo", error);
      }
    }
  };

const handleDelete = (id) => {
  setTodos((prev) => prev.filter((item) => item.id !== id));
};



  const handleEdit = (todo) => {
    setInputValue(todo.todo);
    setEditId(todo.id);
    setIsEditing(true);
  };

  const toggleComplete = (id) => {
    const updated = [...todos];

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].id === id) {
        updated[i].completed = !updated[i].completed;
        break;
      }
    }

    setTodos(updated);
  };

  return (
    <div className="todo-app-container">

      <Box
        component="form"
        sx={{ pl: 50, display: "flex", alignItems: "center", gap: 2 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="text"
          value={inputValue}
          label="Add a new todo"
          variant="standard"
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ width: "25ch" }}
        />
        <Button onClick={addItem} variant="contained" size="small">
          {isEditing ? "Update" : "Add"}
        </Button>
      </Box>


      {filteredTodos.length > 0 && (
        <div>
          {filteredTodos.map((todoitem, index) => (
            <TodoCard
              key={todoitem.id}
              todo={todoitem}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={toggleComplete}
            />

          ))}
        </div>
      )}
    </div>
  );
};

export default Todo;
