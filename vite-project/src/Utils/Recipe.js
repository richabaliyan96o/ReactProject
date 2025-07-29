import axios from 'axios';

const BASE_URL = "https://dummyjson.com/recipes";



export const fetchRecipes = async ( ) => {
  const url = `${BASE_URL}`;

  try {
    const response = await axios.get(url);
     return {
      recipes: response.data.recipes,
    }; 
  } catch (error) {
    console.error("Error fetching Recipes:", error);
    throw error;
  }
};
