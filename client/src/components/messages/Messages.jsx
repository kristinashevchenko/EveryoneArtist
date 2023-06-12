import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { MessageRow } from './MessageRow';

export const Messages = ({ messages, onAnswer }) => {
  return (
    <Box
      sx={{
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      {messages.map((message) => (
        <MessageRow message={message} key={message.question} onAnswer={onAnswer} />
      ))}
    </Box>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  onAnswer: PropTypes.func
};
