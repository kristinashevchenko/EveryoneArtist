import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

export const Layout = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Outlet />
    </Box>
  );
};
