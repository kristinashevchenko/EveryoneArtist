import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { MessageQuestion } from './MessageQuestion';
import { MessageAnswer } from './MessageAnswer';
import { AnswerChoices } from './AnswerChoices';

export const MessageRow = ({ message, onAnswer, questionIndex }) => {
  const [isOpen, setIsOpen] = useState(!message.answer);

  const handleAnswerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAnswerSubmit = (answer) => {
    const isNewChat = message.answer && message.answer != answer;
    onAnswer({ answer, isNewChat, questionIndex });
    setIsOpen(!isOpen);
  };
  if (message.imageUrl)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <MessageQuestion>{message.question}</MessageQuestion>
          <MessageAnswer disabled={!message.answer} onClick={handleAnswerClick}>
            {message.answer || 'Select answer'}
          </MessageAnswer>
        </Box>
        {
          <AnswerChoices
            choices={message.choices}
            onSubmit={handleAnswerSubmit}
          />
        }
        <Box
          sx={{
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '8px'
          }}>
          <img
            src={`${message.imageUrl}?w=300&h=300&fit=crop&auto=format`}
            srcSet={`${message.imageUrl}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
            style={{ height: '300px' }}
          />
        </Box>
      </Box>
    );

  if (isOpen) {
    return (
      <Box
        sx={{
          height: '20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <MessageQuestion>{message.question}</MessageQuestion>
          <MessageAnswer disabled={!message.answer} onClick={handleAnswerClick}>
            {message.answer || 'Select answer'}
          </MessageAnswer>
        </Box>
        {
          <AnswerChoices
            choices={message.choices}
            onSubmit={handleAnswerSubmit}
          />
        }
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <MessageQuestion>{message.question}</MessageQuestion>
      {message.answer && (
        <MessageAnswer onClick={handleAnswerClick}>
          {message.answer}
        </MessageAnswer>
      )}
    </Box>
  );
};

MessageRow.propTypes = {
  message: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
    imageUrl: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string)
  }),
  onAnswer: PropTypes.func,
  questionIndex: PropTypes.number
};
