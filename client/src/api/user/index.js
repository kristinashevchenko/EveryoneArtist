import { mockConversation } from "../message/mock";

export const getUser = async (userId) => {
  // use userId to get data from BE

  return Promise.resolve({
    userId,
    conversations: [
      {
        messages: mockConversation[0].None,
      },
    ],
  });
};
