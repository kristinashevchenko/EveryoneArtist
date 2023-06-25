import React from 'react';
import Box from '@mui/material/Box';
import './message.css';

export const MessageLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: '#B4F2A5',
        borderRadius: '15px',
        padding: '10px',
        height: '24px',
        marginTop: '8px'
      }}>
      <div className="dot-flashing"></div>
    </Box>
  );
};
