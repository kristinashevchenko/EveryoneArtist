import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Input from '@mui/material/Input';

export const AnswerChoices = ({ choices, onSubmit }) => {
  const [selected, setSelected] = useState(choices[0]);
  const [text, setText] = useState('');

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
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
        aria-label="Platform">
        {choices.map((option) => (
          <ToggleButton key={option} value={option}>
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Input
        sx={{ marginLeft: '10px' }}
        value={text}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        sx={{ marginLeft: '10px' }}>
        Submit
      </Button>
    </Box>
  );
};

AnswerChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func
};
