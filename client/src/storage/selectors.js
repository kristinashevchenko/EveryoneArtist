import { createSelector } from 'reselect';

const selectConversations = (state) => state.conversations.conversations;
const selectActiveConversationId = (state) =>
  state.conversations.activeConversationId;

export const selectMessages = createSelector(
  selectConversations,
  selectActiveConversationId,
  (items = [], id) => (items.length ? items[id] : [])
);
