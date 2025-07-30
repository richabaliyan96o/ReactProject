import { useEffect, useState } from "react";
import { fetchRecipes } from '../Utils/Recipe';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Recipes = ({ userId }) => {
  const [recipe, setRecipe] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await fetchRecipes(userId);
        setRecipe(data.recipes);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [userId]);

  const handleDetails = (item,index) => {
     navigate(`/recipes/${index}`, {
    state: {
      recipes: item,
     
    },
  });

  }

  return (
   
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        paddingTop: 2,
      }}
    >
       
      {recipe.length === 0 ? (
        <Typography>Loading recipes...</Typography>
      ) : (
        recipe.map((item) => (
          <Card key={item.id} sx={{ width: 280 }}>
            <CardMedia
              component="img"
              height="160"
              image={item.image}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.cuisine} | {item.difficulty} | {item.caloriesPerServing} cal
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>handleDetails(item,item.id)}>View Instructions</Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Recipes;
