import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './styles.css';

export const GenerateButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Button
        variant="outlined"
        onClick={onClick}
        className="generate-button"
        sx={{
          backgroundColor: '#FFEB3B',
          border: '3px solid #7230C7',
          borderRadius: '60px',
          fontSize: '14px',
          fontWeight: 500
        }}>
        Generate
      </Button>
    </Box>
  );
};

GenerateButton.propTypes = {
  onClick: PropTypes.func
};
