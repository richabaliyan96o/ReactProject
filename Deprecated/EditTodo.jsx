import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTodo } from '../vite-project/src/Utils/api'; // ✅ import your API function
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const todo = location.state.todo;

  const [updatedTodo, setUpdatedTodo] = useState(todo.todo);

  const handleSave = async () => {
    try {
      await updateTodo(todo.id, updatedTodo); // ✅ Call API to update
      navigate(-1); // ✅ Go back to previous page (Todo list)
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>Edit Todo</Typography>

      <Stack spacing={2}>
        <TextField
          label="Todo"
          variant="outlined"
          fullWidth
          value={updatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!updatedTodo.trim()}
        >
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default EditTodo;
