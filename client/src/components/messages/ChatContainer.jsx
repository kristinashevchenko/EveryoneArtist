import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from './Messages';
import { generateImage } from '../../storage/reducers/image';
import { sendMessage, forkChat } from '../../storage/reducers/conversation';
import { selectMessages } from '../../storage/selectors';

export const ChatContainer = () => {
  const dispatch = useDispatch();
  const activeConversationId = useSelector(
    (state) => state.conversations.activeConversationId
  );
  const appState = useSelector((state) => state.conversations.appState);
  const messages = useSelector(selectMessages);
  const onGenerate = (questionIndex) => {
    dispatch(
      generateImage({
        messages,
        conversationId: activeConversationId,
        questionIndex
      })
    );
  };

  const onAnswer = ({ answer, isNewChat, questionIndex }) => {
    if (isNewChat) {
      // start new chat
      dispatch(forkChat({ answer, questionIndex, messages }));
    } else {
      dispatch(sendMessage({ answer, messages }));
    }
  };

  return (
    <Messages
      appState={appState}
      messages={messages}
      onAnswer={onAnswer}
      onGenerate={onGenerate}
    />
  );
};
