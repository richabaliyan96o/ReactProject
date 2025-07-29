import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state.recipes;

  return (
    <>
      {/* Back Button */}
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 5 }}>
        <ArrowBackIcon />
      </IconButton>

      {/* Recipe Card */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          paddingTop: 2,
        }}
      >
        <Card key={recipes.id} sx={{ width: 580 , ml: 45 ,mb: 4 }}>
          <CardMedia
            component="img"
            height="160"
            image={recipes.image}
            alt={recipes.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {recipes.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {recipes.cuisine} | {recipes.difficulty} | {recipes.caloriesPerServing} cal
            </Typography>
             <Typography variant="h6" gutterBottom>
          Instructions:
        </Typography>
        <ul>
          {recipes.instructions && recipes.instructions.map((step, index) => (
            <li key={index}>
              <Typography variant="body2">{step}</Typography>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>
      </Box>

      
    </>
  );
};

export default DetailRecipe;
