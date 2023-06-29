import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from './Messages';
import { generateImage } from '../../storage/reducers/image';
import {
  sendMessage,
  forkChat,
  updateChat,
  startChat
} from '../../storage/reducers/conversation';
import {
  selectConversationsLength,
  selectMessages
} from '../../storage/selectors';
import { MODES } from '../../api/constants/modes';

export const ChatContainer = () => {
  const dispatch = useDispatch();
  const activeConversationId = useSelector(
    (state) => state.conversations.activeConversationId
  );
  const userId = useSelector((state) => state.conversations.userId);
  const conversationsLength = useSelector(selectConversationsLength);
  const appStates = useSelector((state) => state.conversations.states);
  const appState = appStates[activeConversationId];
  const mode = useSelector((state) => state.app.mode);
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

  const onRetry = () => {
    dispatch(startChat({ userId }));
  };

  const onAnswer = ({ answer, isAnswerChanged, questionIndex }) => {
    if (isAnswerChanged) {
      switch (mode) {
        case MODES.DESTRUCTIVE_MODE:
          // start new chat
          dispatch(
            forkChat({
              answer,
              questionIndex,
              messages,
              activeConversationId: conversationsLength
            })
          );
          break;
        case MODES.CHANGE_MODE:
          // update chat, don't retrigger BE, don't remove image
          dispatch(updateChat({ answer, questionIndex }));
          break;
        default:
          break;
      }
    } else {
      dispatch(sendMessage({ answer, messages, activeConversationId }));
    }
  };

  return (
    <Messages
      appState={appState}
      messages={messages}
      onAnswer={onAnswer}
      onGenerate={onGenerate}
      onRetry={conversationsLength ? null : onRetry}
    />
  );
};
