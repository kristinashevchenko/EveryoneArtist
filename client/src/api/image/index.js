import axios from 'axios';
import { API_URL } from '../constants';

export const generateImage = async ({ messages, questionIndex }) => {
  const newMessages = messages.slice(0, questionIndex + 1);
  const { data } = await axios.post(
    `${API_URL}/quiz/generate`,
    JSON.stringify(newMessages),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return data;
};

export default { generateImage };
