import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { GenerateButton } from "./GenerateButton";
import { Messages } from "./Messages";

export const ChatContainer = ({ conversation, onAnswer, onGenerate }) => {
  const { messages = [] } = conversation;

  return (
    <Box sx={{ height: "inherit" }}>
      <Messages messages={messages} onAnswer={onAnswer} />
      <GenerateButton onClick={onGenerate} />
    </Box>
  );
};

ChatContainer.propTypes = {
  conversation: PropTypes.shape({
    messages: PropTypes.arrayOf(PropTypes.object),
  }),
  onGenerate: PropTypes.func,
  onAnswer: PropTypes.func,
};
