import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

export const MessageAnswer = ({ children, disabled = false, onClick }) => {
  return (
    <Button
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5D8FF',
        borderRadius: '20px',
        padding: '10px'
      }}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </Button>
  );
};

MessageAnswer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};
