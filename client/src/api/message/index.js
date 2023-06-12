import { mockConversation } from './mock';

export const sendMessage = async ({ userId, conversationId, answer }) => {
  // use userId to get data from BE
  if (conversationId == 1)
    return Promise.resolve({
      userId,
      conversations: [
        { messages: mockConversation[0].Image },
        { messages: mockConversation[1][answer] }
      ]
    });

  return Promise.resolve({
    userId,
    conversations: [{ messages: mockConversation[0][answer] }]
  });
};

export const startNewChat = async ({ userId, answer }) => {
  return Promise.resolve({
    userId,
    conversations: [
      { messages: mockConversation[0].Image },
      { messages: mockConversation[1][answer] }
    ]
  });
};
