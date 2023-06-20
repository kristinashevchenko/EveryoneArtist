import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { MessageRow } from './MessageRow';
import './styles.css';

export const Messages = ({ messages = [], onAnswer }) => {
  return (
    <Box
      sx={{
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflowY: 'auto',
          marginTop: 2
      }}
      id="scrollbar">
      {messages.map((message, index) => (
        <MessageRow
          message={message}
          key={message.question}
          onAnswer={onAnswer}
          questionIndex={index}
        />
      ))}
    </Box>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  onAnswer: PropTypes.func
};
