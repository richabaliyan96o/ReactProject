import axios from 'axios';

const BASE_URL = "https://dummyjson.com/users";


export const fetchUser = async (limit , skip ) => {
  const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

  try {
    const response = await axios.get(url);
     return {
      articles: response.data.users,
      totalResults: response.data.total, 
    }; 
  } catch (error) {
    console.error("Error fetching News:", error);
    throw error;
  }
};
