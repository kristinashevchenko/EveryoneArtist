import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Input from '@mui/material/Input';
import './styles.css';
import {AddAPhoto, AddPhotoAlternate, PhotoFilter, Send} from "@mui/icons-material";
import {IconButton} from "@mui/material";

const DONT_KNOW = "Don't know";
const OTHER = 'Other';

const choiceButton = {
  backgroundColor: 'rgba(190, 198, 255, 0.44)'
};

export const AnswerChoices = ({ choices, onSubmit, answer, onGenerate = [] }) => {
  const initialOther = answer ? answer.filter(x => !choices.includes(x)).filter(x => x !== DONT_KNOW).join(" ") : "";
  const [selected, setSelected] = useState(
       initialOther ? answer.filter(x => choices.includes(x)).concat(OTHER) : answer
  );
  const [text, setText] = useState(initialOther);

  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    let result = [];
    if (selected.includes(OTHER) && text) result.push(text);
    if (selected) result.push(...selected);
    result = result.filter(x => x !== OTHER).filter(x => x !== undefined);
    if (result.length > 0) onSubmit(result);
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
        exclusive={false}
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
        <ToggleButton
        className="choice-button"
        sx={choiceButton}
        value={OTHER}>
            <Input
                className="choice-input"
                sx={{ marginLeft: '10px' }}
                value={text}
                placeholder="Other"
                onChange={handleInputChange}
            />
        </ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ marginLeft: '10px' }}>
          <IconButton
              onClick={handleSubmit}
              color='secondary'
              className="submit-choice"
              sx={{ marginLeft: '10px' }}>
              <Send/>
          </IconButton>
          <IconButton
              onClick={onGenerate}
              color='secondary'
              className="submit-choice"
              sx={{ marginLeft: '10px' }}>
              <AddPhotoAlternate/>
          </IconButton>
      </Box>
    </Box>
  );
};

AnswerChoices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  answer: PropTypes.arrayOf(PropTypes.string),
  onGenerate: PropTypes.func
};
