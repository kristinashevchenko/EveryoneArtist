import { cloneDeep } from 'lodash';
import axios from 'axios';
import { API_URL } from '../constants';

export const sendMessage = async ({ answer, messages }) => {
  const newMessages = cloneDeep(messages);
  newMessages[messages.length - 1].answer = answer;

  const { data } = await axios.post(
    `${API_URL}/quiz/answer`,
    JSON.stringify(newMessages),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return data;
};

export const forkChat = async ({ answer, messages, questionIndex }) => {
  const newMessages = cloneDeep(messages.slice(0, questionIndex + 1));
  newMessages[questionIndex].answer = answer;

  const { data } = await axios.post(
    `${API_URL}/quiz/answer`,
    JSON.stringify(newMessages),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  newMessages.push(data);
  return newMessages;
};

export const startChat = async () => {
  const { data } = await axios.post(`${API_URL}/quiz/answer`, [], {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data;
};

export default { sendMessage, forkChat, startChat };
