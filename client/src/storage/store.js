import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reducers/app';
import conversationSlice from './reducers/conversation';
import imageSlice from './reducers/image';

export const store = configureStore({
  reducer: {
    images: imageSlice,
    conversations: conversationSlice,
    app: appSlice
  },
  devTools: true
});
