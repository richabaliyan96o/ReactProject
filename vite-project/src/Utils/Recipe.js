// Utils/Recipe.js

import axios from 'axios';

const BASE_URL = "https://dummyjson.com/recipes";

export const fetchRecipes = async (userId) => {
  try {
    const response = await axios.get(BASE_URL); // fetch all recipes
    let recipes = response.data.recipes;

    // Filter recipes where userId matches
    if (userId) {
      recipes = recipes.filter(recipe => recipe.userId === userId);
      console.log(`Filtered recipes for userId ${userId}:`, recipes);
    }

    return { recipes };
  } catch (error) {
    console.error("Error fetching Recipes:", error);
    throw error;
  }
};
