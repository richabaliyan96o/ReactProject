import React, { useEffect, useState } from 'react';
import { fetchUser } from '../Utils/UserApi';
import {
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const UserDataGrid = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); 
  const pageSize = 12 ;
  const [totalResult, setTotalResult] = useState(0);
  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const skip = page * pageSize;
        const { articles, totalResults } = await fetchUser(pageSize, skip);
        setNews(articles);
        setTotalResult(totalResults);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150, renderCell: (params) => (
    <span
      style={{ 
        cursor: 'pointer',        
        textDecoration: 'underline', 
      }}
    >
      {params.value}
    </span>
  ), },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    {field:'gender',headerName: 'Gender',width:100},
    {field:'email',headerName: 'Email',width:200}

    
  ];

  // const handleRowClick = (params) => {
  //   navigate(`/news/${params.id}`, { state: { article: params.row } });
  // };
const handleRowClick = (params) => {
    localStorage.setItem('lastView', 'table');
  navigate(`/user/${params.id}`, {
    state: {
      article: params.row,
     
    },
  });
};

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    
 <Box sx={{ height: 450, width: '80vw',ml:15}}>


      <DataGrid
      sx={{
    '& .MuiDataGrid-row': {
      backgroundColor: '#e3f2fd', 
    },
    '& .MuiDataGrid-cell': {
      color: '#0d47a1', 
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#bbdefb', 
    },
  }}
        rows={news}
        columns={columns}
        rowCount={totalResult}
        loading={loading}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={({ page}) => {
          setPage(page);
        }}
        disableRowSelectionOnClick
        
         onRowClick={handleRowClick}
      />
    </Box>
 
  );
};

export default UserDataGrid;
