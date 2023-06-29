import React from 'react';
import Box from '@mui/material/Box';

export const MessageError = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B4F2A5',
        borderRadius: '15px',
        padding: '10px',
        height: '24px',
        marginTop: '8px'
      }}>
      Sorry! Error occured
    </Box>
  );
};
