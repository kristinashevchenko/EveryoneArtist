import { configureStore } from '@reduxjs/toolkit';
import conversationSlice from './reducers/conversation';
import imageSlice from './reducers/image';

export const store = configureStore({
  reducer: {
    images: imageSlice,
    conversations: conversationSlice
  },
  devTools: true
});
