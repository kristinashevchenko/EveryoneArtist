import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { MessageQuestion } from "./MessageQuestion";
import { MessageAnswer } from "./MessageAnswer";
import { AnswerOptions } from "./AnswerOptions";

export const MessageRow = ({ message, onAnswer }) => {
  const [isOpen, setIsOpen] = useState(!message.answer);

  const handleAnswerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAnswerSubmit = (answer) => {
    const isNewChat = message.answer && message.answer != answer;
    onAnswer({ answer, isNewChat });
    setIsOpen(!isOpen);
  };
  if (message.src)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <img
            src={`${message.src}?w=300&h=300&fit=crop&auto=format`}
            srcSet={`${message.src}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
            style={{ height: "300px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MessageQuestion>{message.question}</MessageQuestion>
          <MessageAnswer disabled={!message.answer} onClick={handleAnswerClick}>
            {message.answer || "Select answer"}
          </MessageAnswer>
        </Box>
        {
          <AnswerOptions
            options={message.options}
            onSubmit={handleAnswerSubmit}
          />
        }
      </Box>
    );

  if (isOpen) {
    return (
      <Box
        sx={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MessageQuestion>{message.question}</MessageQuestion>
          <MessageAnswer disabled={!message.answer} onClick={handleAnswerClick}>
            {message.answer || "Select answer"}
          </MessageAnswer>
        </Box>
        {
          <AnswerOptions
            options={message.options}
            onSubmit={handleAnswerSubmit}
          />
        }
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
    src: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }),
  onAnswer: PropTypes.func,
};
