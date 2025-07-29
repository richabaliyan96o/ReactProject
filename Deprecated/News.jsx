import React, { useEffect, useState } from 'react';
import { fetchUser } from '../vite-project/src/Utils/UserApi';
import {
  Card, CardActions, CardContent, CardMedia,
  Button, Typography, LinearProgress, Grid, CircularProgress, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Count, setCount] = useState(6);
  const navigate = useNavigate();

  // --------------fetching news data from API--------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchUser();
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // -----------logic to navigate to specific card --------------
  const handleCardClick = (item, index) => {
    navigate(`/news/${index}`, { state: { article: item } });
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
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mt: 4 }}>
        Latest News

      </Typography>

      <Grid container spacing={2} sx={{ pl: 11 }}>
        {news.slice(0, Count).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card sx={{ maxWidth: 345 }} onClick={() => {
              handleCardClick(item, index);

            }}

            >
              <CardMedia
                component="img"
                alt={item.title}
                height="140"
                image={item.urlToImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={item.url} target="_blank">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* -------Here i am updating count for Read More to 6 ---------------- */}
      {Count < news.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => setCount(prev => prev + 6)}
          >
            Show More
          </Button>
        </Box>
      )}
    </div>
  );
};

export default News;
