import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Outlet />
    </Box>
  );
}

export default MainLayout;
