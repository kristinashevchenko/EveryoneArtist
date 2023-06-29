import React from 'react';
import PropTypes from 'prop-types';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export const MessageError = ({ onRetry }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: '8px'
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#B4F2A5',
          borderRadius: '15px',
          padding: '10px',
          height: '24px'
        }}>
        Sorry! Error occured
      </Box>
      {onRetry && (
        <IconButton
          sx={{ color: '#7230C7', background: '#F5D8FF', marginLeft: '10px' }}
          title="Retry"
          onClick={onRetry}>
          <ReplayIcon />
        </IconButton>
      )}
    </div>
  );
};

MessageError.propTypes = {
  onRetry: PropTypes.func
};
