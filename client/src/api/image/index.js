import axios from 'axios';
import { API_URL } from '../constants';

export const generateImage = async ({ messages }) => {
  const { data } = await axios.post(
    `${API_URL}/quiz/generate`,
    JSON.stringify(messages),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return data;
};

export default { generateImage };
