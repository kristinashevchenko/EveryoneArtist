import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { MessageQuestion } from './MessageQuestion';
import { MessageAnswer } from './MessageAnswer';
import { AnswerChoices } from './AnswerChoices';

const messageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '8px'
};

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
          ...messageStyle,
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
        {isOpen && (
          <AnswerChoices
            answer={message.answer}
            choices={message.choices}
            onSubmit={handleAnswerSubmit}
          />
        )}
        <Box
          sx={{
            width: '310px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexBasis: 'content',
            marginTop: '8px',
            marginBottom: '8px',
            backgroundColor: '#B4F2A5',
            border: '4px solid #B4F2A5',
            borderRadius: '10px'
          }}>
          <img
            src={message.imageUrl}
            srcSet={message.imageUrl}
            loading="lazy"
            style={{
              height: '300px',
              margin: 5
            }}
          />
          <span style={{ marginLeft: 5 }}>{message.generatedPrompt}</span>
        </Box>
      </Box>
    );

  if (isOpen) {
    return (
      <Box
        sx={{
          ...messageStyle,
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
            answer={message.answer}
            onSubmit={handleAnswerSubmit}
          />
        }
      </Box>
    );
  }

  return (
    <Box sx={{ ...messageStyle }}>
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
    choices: PropTypes.arrayOf(PropTypes.string),
    generatedPrompt: PropTypes.string
  }),
  onAnswer: PropTypes.func,
  questionIndex: PropTypes.number
};
