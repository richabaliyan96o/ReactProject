import React from "react";
import {
  Paper,
  Stack,
  IconButton,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TodoCard.css";

const TodoCard = ({ todo, onDelete, onEdit, onToggle }) => {
  return (
    <div className="todo-card">
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#ccf2ff",
          padding: 2,
          marginY: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Typography variant="body1">{todo.todo}</Typography>
        </span>

        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            sx={{ color: "#3333ff" }}
            size="small"
            onClick={() => onEdit(todo)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: "#b30000" }}
            size="small"
            onClick={() => onDelete(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    </div>
  );
};

export default TodoCard;
