import axios from "axios";

const API_URL = "https://dummyjson.com/todos?limit=5"; 

// Function to fetch Todo
export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.todos; 
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};  


// Function to add a new Todo
export const addTodo = async (todoText) => {
  try {
    const response = await axios.post('https://dummyjson.com/todos/add', {
      todo: todoText,
      completed: false,
      userId: 31,
    });

    return response.data; 
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};



export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
    todo: updatedTodo,
  });

  return response.data;
};

  
// Function to delete a Todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};


