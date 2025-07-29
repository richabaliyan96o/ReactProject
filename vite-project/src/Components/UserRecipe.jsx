import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Recipes from './Recipes';
import { Box } from '@mui/material';

const UserRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state.article;

  return (
    <Box sx={{ padding: 2 }}>
      {/* Back Button */}
      <IconButton onClick={() => navigate('/')} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      {/* User Info Card */}
      <Card sx={{ maxWidth: 300, mb: 4,ml:55 }}>
        <CardMedia
          component="img"
          height="150"
          image={article.image}
          alt={article.title}
        />
        <CardContent>
          <Typography variant="body1">
            <strong>First Name:</strong> {article.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Last Name:</strong> {article.lastName}
          </Typography>
        </CardContent>
      </Card>

      {/* Recipes Section */}
      <Recipes />
    </Box>
  );
};

export default UserRecipe;
