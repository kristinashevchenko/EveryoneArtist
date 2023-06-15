import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateImage } from './image';
import api from '../../api/message';
import { setMessages } from '../session/utils';

const initialState = {
  userId: '',
  activeConversationId: 0,
  conversations: []
};

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async (action) => {
    const { answer, messages } = action;
    // send answer only for mocking
    const response = await api.sendMessage({ answer, messages });
    return response;
  }
);

export const forkChat = createAsyncThunk(
  'conversations/forkChat',
  async ({ answer, questionIndex, messages }) => {
    const newChat = await api.forkChat({ answer, messages, questionIndex });
    return newChat;
  }
);

export const startChat = createAsyncThunk(
  'conversations/startChat',
  async () => {
    const response = await api.startChat();
    return response;
  }
);

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    updateActiveConversation: (state, action) => {
      state.activeConversationId = action.payload.newConversationId;
    },
    updateUser: (state, action) => {
      state.userId = action.payload;
    },
    updateConversations: (state, action) => {
      state.conversations = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const { answer } = action.meta.arg;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[activeConversation.length - 1].answer = answer;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation.push(newMessage);
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        const { imageUrl, generatedPrompt } = action.payload;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[activeConversation.length - 2].imageUrl = imageUrl;
        activeConversation[activeConversation.length - 2].generatedPrompt =
          generatedPrompt;
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(forkChat.fulfilled, (state, action) => {
        const newConversation = action.payload;
        state.conversations.push(newConversation);
        state.activeConversationId = state.conversations.length - 1;
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(startChat.pending, (state, action) => {
        const { userId } = action.meta.arg;
        state.userId = userId;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        const newMessage = action.payload;
        const newConversation = [newMessage];
        state.conversations.push(newConversation);
        state.activeConversationId = state.conversations.length - 1;
        setMessages({ messages: state.conversations, userId: state.userId });
      });
  }
});

export const { updateActiveConversation, updateUser, updateConversations } =
  conversationSlice.actions;

export default conversationSlice.reducer;
