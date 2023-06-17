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
        borderRadius: '15px',
        padding: '10px',
        height: '44px',
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        overflowWrap: 'break-word'
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
