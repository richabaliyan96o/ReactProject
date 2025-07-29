import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import UserDataGrid from './UserDataGrid'; 
import UserGrid from './UserGrid'; 

const ToggleView = () => {
  const [isGridView, setIsGridView] = useState(true); 

  useEffect(() => {
    const savedView = localStorage.getItem('lastView');
    if (savedView === 'table') {
      setIsGridView(false);
    } else {
      setIsGridView(true);
    }
  }, []);

  
  const toggleView = () => {
    const newView = !isGridView;
    setIsGridView(newView);
    localStorage.setItem('lastView', newView ? 'grid' : 'table');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 4, mb: 2 }}>
        <Tooltip title={isGridView ? 'Switch to Table View' : 'Switch to Card View'}>

          <IconButton onClick={toggleView} color="primary">
            {isGridView ? <ViewListIcon /> : <GridViewIcon />}
          </IconButton>
        </Tooltip>
      </Box>
     
      {isGridView ? <UserGrid /> : <UserDataGrid />}
    </Box>
  );
};

export default ToggleView;
