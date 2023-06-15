import { mockConversation } from './mock';
import { cloneDeep } from 'lodash';

export const sendMessage = async ({ answer, messages }) => {
  const newMessages = cloneDeep(messages);
  newMessages[messages.length - 1].answer = answer;

  return Promise.resolve(mockConversation[answer]);
};

export const forkChat = async ({ answer, messages, questionIndex }) => {
  const newConversation = cloneDeep(messages.slice(0, questionIndex + 1));
  newConversation[questionIndex].answer = answer;

  const message = await Promise.resolve(mockConversation[answer]);
  newConversation.push(message);
  return newConversation;
};

export const startChat = async () => {
  return Promise.resolve(mockConversation.None);
};

export default { sendMessage, forkChat, startChat };
