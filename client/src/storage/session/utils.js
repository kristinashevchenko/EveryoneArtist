export const setMessages = ({ messages, userId }) => {
  window.sessionStorage.setItem(
    `artist-messages-${userId}`,
    JSON.stringify(messages)
  );
};

export const getMessages = ({ userId }) => {
  const messages = window.sessionStorage.getItem(`artist-messages-${userId}`);
  return JSON.parse(messages);
};
