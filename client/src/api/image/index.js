import { mockImages } from './mock';

export const generateImage = async ({ conversationId }) => {
  return Promise.resolve(mockImages[conversationId]);
};

export default { generateImage };
