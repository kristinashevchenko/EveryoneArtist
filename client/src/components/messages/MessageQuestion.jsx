import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export const MessageQuestion = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B4F2A5',
        borderRadius: '15px',
        padding: '10px',
        marginRight: '15px',
        maxWidth: '500px',
        textOverflow: 'ellipsis',
        overflowWrap: 'break-word'
      }}>
      {children}
    </Box>
  );
};

MessageQuestion.propTypes = {
  children: PropTypes.node
};
