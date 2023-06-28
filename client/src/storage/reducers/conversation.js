import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateImage } from './image';
import api from '../../api/message';
import { setMessages } from '../session/utils';
import { STATES } from '../../api/constants/states';

const initialState = {
  userId: '',
  activeConversationId: 0,
  conversations: [],
  states: {}
};

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async (action) => {
    const { answer, messages } = action;
    const response = await api.sendMessage({ answer, messages });
    return response;
  }
);

export const forkChat = createAsyncThunk(
  'conversations/forkChat',
  async ({ answer, questionIndex, messages }) => {
    const newChat = await api.forkChat({
      answer,
      messages,
      questionIndex
    });
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
    },
    updateChat: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.conversations[state.activeConversationId][questionIndex].answer =
        answer;
      setMessages({ messages: state.conversations, userId: state.userId });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const { answer } = action.meta.arg;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[activeConversation.length - 1].answer = answer;
        activeConversation[activeConversation.length - 1].state =
          STATES.LOADING;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[activeConversation.length - 1].state = STATES.READY;
        activeConversation.push(newMessage);
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(sendMessage.rejected, (state) => {
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[activeConversation.length - 1].state = STATES.ERROR;
      })
      .addCase(generateImage.pending, (state, action) => {
        const { questionIndex, conversationId } = action.meta.arg;
        const activeConversation = state.conversations[conversationId];
        activeConversation[questionIndex].state = STATES.LOADING;
      })
      .addCase(generateImage.rejected, (state, action) => {
        const { questionIndex } = action.meta.arg;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[questionIndex].state = STATES.ERROR;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        const { imageUrl, generatedPrompt, questionIndex } = action.payload;
        const activeConversation =
          state.conversations[state.activeConversationId];
        activeConversation[questionIndex].imageUrl = imageUrl;
        activeConversation[questionIndex].generatedPrompt = generatedPrompt;
        activeConversation[questionIndex].state = STATES.READY;
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(forkChat.pending, (state) => {
        state.conversations.push([]);
        state.activeConversationId = state.conversations.length - 1;
        state.states[state.activeConversationId] = STATES.LOADING;
      })
      .addCase(forkChat.rejected, (state) => {
        state.states[state.activeConversationId] = STATES.ERROR;
      })
      .addCase(forkChat.fulfilled, (state, action) => {
        const newConversation = action.payload;
        state.conversations[state.activeConversationId] =
          state.conversations[state.activeConversationId].concat(
            newConversation
          );
        state.states[state.activeConversationId] = STATES.READY;
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(startChat.pending, (state, action) => {
        const { userId } = action.meta.arg;
        state.userId = userId;
        state.states[0] = STATES.LOADING;
      })
      .addCase(startChat.rejected, (state) => {
        state.states[0] = STATES.ERROR;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        const newMessage = action.payload;
        const newConversation = [newMessage];
        state.conversations.push(newConversation);
        state.activeConversationId = state.conversations.length - 1;
        state.states[0] = STATES.READY;
        setMessages({ messages: state.conversations, userId: state.userId });
      });
  }
});

export const {
  updateActiveConversation,
  updateUser,
  updateConversations,
  updateChat
} = conversationSlice.actions;

export default conversationSlice.reducer;
