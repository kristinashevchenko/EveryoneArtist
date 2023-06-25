import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { STATES } from '../../api/constants/states';
import { MessageLoading } from './MessageLoading';
import { MessageError } from './MessageError';
import { MessageRow } from './MessageRow';
import './styles.css';

export const Messages = ({ appState, messages = [], onAnswer, onGenerate }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflowY: 'auto',
      }}
      id="scrollbar">
      {messages.map((message, index) => (
        <MessageRow
          message={message}
          key={message.question}
          onAnswer={onAnswer}
          questionIndex={index}
          onGenerate={onGenerate}
        />
      ))}
      {appState === STATES.LOADING && <MessageLoading />}
      {appState === STATES.ERROR && <MessageError />}
    </Box>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  onAnswer: PropTypes.func,
  onGenerate: PropTypes.func,
  appState: PropTypes.string
};
