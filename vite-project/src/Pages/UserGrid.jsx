import React, { useEffect, useState } from 'react';
import { fetchUser } from '../Utils/UserApi';
import {
  Card, CardActions, CardContent, CardMedia,
  Button, Typography, LinearProgress, Grid, CircularProgress, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserGrid = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 12;
  const navigate = useNavigate();
  const[totalResult , setTotalResult] =  useState();
  const totalPages = Math.ceil(totalResult / limit);
  const [viewedCards, setViewedCards] = useState(new Set());
  const[progress,setProgress] = useState(0);
 

  // --------------fetching news data from API--------------
  useEffect(() => {
    const fetchData = async () => {
      try {

        const skip = (page - 1) * limit;
        const { articles, totalResults } = await fetchUser(limit , skip);
        setNews(articles);
        setTotalResult(totalResults);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      
      setLoading(false);
    };
    fetchData();
  }, [page]);

useEffect(() => {
  if (totalResult) {
    const progressValue = (viewedCards.size / totalResult) * 100;
    setProgress(progressValue);
  }
}, [viewedCards]);


const handleCardClick = (item, index) => {
  setViewedCards(prev => new Set([...prev, item.id]));
  localStorage.setItem('lastView', 'grid');
  navigate(`/user/${index}`, {
    state: {
      article: item,
     
    },
  });
};

  // -------------Loading icon logic------------------------
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, pl: 71 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h5" component="h4" sx={{ textAlign: 'center', mt: 2 }}>
       User Data
      </Typography>
   <LinearProgress
  variant="determinate"
  value={progress}
  sx={{
    height: 8,
    borderRadius: 5,
    mx: 2,
    mt: 2,
    backgroundColor: '#e0e0e0',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#1976d2',
    },
  }}
/>

  <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 ,ml:4}}>
  {news.map((item, index) => (
    <Grid item xs={6} sm={3} md={3} xl={2} key={index}>
      <Card
        sx={{   
          mx: 'auto',
          cursor: 'pointer'
        }}
        onClick={() => handleCardClick(item, index)}
      >
        <CardMedia
          component="img"
          alt={item.title}
          height="180"        
          image={item.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
           Id : {item.id}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
            First Name : {item.firstName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px'}}>
           Last Name :  {item.lastName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px'}}>
           Age :  {item.age}
          </Typography> 
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
         onClick={() => setPage((prev)=>prev -1)}
          disabled={page === 1}
          sx={{ mr: 2 }}
        >
          Prev
        </Button>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page == totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
     
    </div>
  );
};

export default UserGrid;
