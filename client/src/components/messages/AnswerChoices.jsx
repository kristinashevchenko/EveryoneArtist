import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Input from '@mui/material/Input';
import { GenerateButton } from './GenerateButton';
import './styles.css';

const DONT_KNOW = "Don't know";
const OTHER = 'Other';

const choiceButton = {
  backgroundColor: 'rgba(190, 198, 255, 0.44)'
};

export const AnswerChoices = ({
  choices,
  onSubmit,
  answer = '',
  onGenerate
}) => {
  const [selected, setSelected] = useState(answer);
  const [text, setText] = useState(
    choices.includes(answer) || answer === DONT_KNOW ? '' : answer
  );

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
    setSelected(OTHER);
  };

  const handleSubmit = () => {
    const result = text || selected;
    onSubmit(result);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px'
      }}>
      <ToggleButtonGroup
        color="primary"
        value={selected}
        exclusive
        onChange={handleChange}
        sx={{ columnGap: '5px' }}
        aria-label="Platform">
        {choices.map((option) => (
          <ToggleButton
            className="choice-button"
            key={option}
            value={option}
            sx={choiceButton}>
            {option}
          </ToggleButton>
        ))}
        <ToggleButton
          className="choice-button"
          value={DONT_KNOW}
          sx={choiceButton}>
          {DONT_KNOW}
        </ToggleButton>
        <ToggleButton className="choice-button" sx={choiceButton} value={OTHER}>
          <Input
            className="choice-input"
            sx={{ marginLeft: '10px' }}
            value={text}
            placeholder="Other"
            onChange={handleInputChange}
          />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="outlined"
        className="submit-choice"
        sx={{ marginLeft: '10px' }}>
        Submit
      </Button>
      {answer && <GenerateButton onClick={onGenerate} />}
    </Box>
  );
};

AnswerChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  answer: PropTypes.string,
  onGenerate: PropTypes.func
};
