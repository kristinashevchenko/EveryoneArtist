import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { AddPhotoAlternate } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { saveAs } from 'file-saver';
import { MessageQuestion } from './MessageQuestion';
import { MessageAnswer } from './MessageAnswer';
import { AnswerChoices } from './AnswerChoices';
import { STATES } from '../../api/constants/states';
import { MessageLoading } from './MessageLoading';
import { MessageError } from './MessageError';

const messageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '8px'
};

export const MessageRow = ({
  message,
  onAnswer,
  questionIndex,
  onGenerate
}) => {
  const { answer, state, imageUrl, question, choices } = message;
  const [isOpen, setIsOpen] = useState(!message.answer);

  const handleAnswerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAnswerSubmit = (submittedAnswer) => {
    let isAnswerChanged = false;

    // check array of answers
    if (answer) {
      if (submittedAnswer.length === answer.length)
        isAnswerChanged = !submittedAnswer.every((currentValue) => {
          return answer.includes(currentValue);
        });
      else {
        isAnswerChanged = true;
      }
    }
    onAnswer({ answer: submittedAnswer, isAnswerChanged, questionIndex });
    setIsOpen(!isOpen);
  };

  const handleGenerate = () => {
    onGenerate(questionIndex);
  };

  const handleDownloadClick = () => {
    saveAs(imageUrl, 'filename');
  };

  if (imageUrl)
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
          <MessageQuestion>{question}</MessageQuestion>
          <MessageAnswer disabled={!answer} onClick={handleAnswerClick}>
            {answer ? answer.join(', ') : 'Select answer'}
          </MessageAnswer>
          <IconButton
            disabled={!answer}
            onClick={handleGenerate}
            color="secondary"
            className="submit-choice"
            title="Generate"
            sx={{ marginLeft: '10px' }}>
            <AddPhotoAlternate />
          </IconButton>
        </Box>
        {isOpen && (
          <AnswerChoices
            answer={answer}
            choices={choices}
            onSubmit={handleAnswerSubmit}
          />
        )}
        {state === STATES.LOADING && <MessageLoading />}
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
            borderRadius: '10px',
            position: 'relative'
          }}>
          <img
            src={imageUrl}
            srcSet={imageUrl}
            loading="lazy"
            style={{
              height: '300px',
              margin: 5
            }}
          />
          <IconButton
            sx={{ color: '#7230C7', background: '#F5D8FF' }}
            onClick={handleDownloadClick}
            style={{
              position: 'absolute',
              top: 10,
              right: 10
            }}>
            <DownloadForOfflineIcon />
          </IconButton>

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
          <MessageQuestion>{question}</MessageQuestion>
          <MessageAnswer disabled={!answer} onClick={handleAnswerClick}>
            {answer ? answer.join(', ') : 'Select answer'}
          </MessageAnswer>
          <IconButton
            disabled={!answer}
            onClick={handleGenerate}
            color="secondary"
            className="submit-choice"
            title="Generate"
            sx={{ marginLeft: '10px' }}>
            <AddPhotoAlternate />
          </IconButton>
        </Box>
        <AnswerChoices
          choices={choices}
          answer={answer}
          onSubmit={handleAnswerSubmit}
        />
        {state === STATES.LOADING && <MessageLoading />}
        {state === STATES.ERROR && <MessageError />}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...messageStyle,
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <MessageQuestion>{question}</MessageQuestion>
        {answer && (
          <MessageAnswer onClick={handleAnswerClick}>
            {answer ? answer.join(', ') : 'Select answer'}
          </MessageAnswer>
        )}
        <IconButton
          disabled={!answer}
          onClick={handleGenerate}
          color="secondary"
          className="submit-choice"
          title="Generate"
          sx={{ marginLeft: '10px' }}>
          <AddPhotoAlternate />
        </IconButton>
      </div>
      {state === STATES.LOADING && <MessageLoading />}
      {state === STATES.ERROR && <MessageError />}
    </Box>
  );
};

MessageRow.propTypes = {
  message: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
    generatedPrompt: PropTypes.string,
    state: PropTypes.string
  }),
  onAnswer: PropTypes.func,
  onGenerate: PropTypes.func,
  questionIndex: PropTypes.number
};
