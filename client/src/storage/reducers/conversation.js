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
    const { answer, messages, activeConversationId } = action;
    const response = await api.sendMessage({ answer, messages });
    return { message: response, activeConversationId };
  }
);

export const forkChat = createAsyncThunk(
  'conversations/forkChat',
  async ({ answer, questionIndex, messages, activeConversationId }) => {
    const newChat = await api.forkChat({
      answer,
      messages,
      questionIndex
    });
    return { messages: newChat, activeConversationId };
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
        const { answer, activeConversationId } = action.meta.arg;
        const activeConversation = state.conversations[activeConversationId];
        activeConversation[activeConversation.length - 1].answer = answer;
        activeConversation[activeConversation.length - 1].state =
          STATES.LOADING;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { message: newMessage, activeConversationId } = action.payload;
        const activeConversation = state.conversations[activeConversationId];
        activeConversation[activeConversation.length - 1].state = STATES.READY;
        activeConversation.push(newMessage);
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const { activeConversationId } = action.meta.arg;
        const activeConversation = state.conversations[activeConversationId];
        activeConversation[activeConversation.length - 1].state = STATES.ERROR;
      })
      .addCase(generateImage.pending, (state, action) => {
        const { questionIndex, conversationId } = action.meta.arg;
        const activeConversation = state.conversations[conversationId];
        activeConversation[questionIndex].state = STATES.LOADING;
      })
      .addCase(generateImage.rejected, (state, action) => {
        const { questionIndex, conversationId } = action.meta.arg;
        const activeConversation = state.conversations[conversationId];
        activeConversation[questionIndex].state = STATES.ERROR;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        const { imageUrl, generatedPrompt, questionIndex, conversationId } =
          action.payload;
        const activeConversation = state.conversations[conversationId];
        activeConversation[questionIndex].imageUrl = imageUrl;
        activeConversation[questionIndex].generatedPrompt = generatedPrompt;
        activeConversation[questionIndex].state = STATES.READY;
        setMessages({ messages: state.conversations, userId: state.userId });
      })
      .addCase(forkChat.pending, (state, action) => {
        const { activeConversationId } = action.meta.arg;
        state.conversations.push([]);
        state.activeConversationId = activeConversationId;
        state.states[activeConversationId] = STATES.LOADING;
      })
      .addCase(forkChat.rejected, (state, action) => {
        const { activeConversationId } = action.meta.arg;
        state.states[activeConversationId] = STATES.ERROR;
      })
      .addCase(forkChat.fulfilled, (state, action) => {
        const { messages: newConversation, activeConversationId } =
          action.payload;
        state.conversations[activeConversationId] =
          state.conversations[activeConversationId].concat(newConversation);
        state.states[activeConversationId] = STATES.READY;
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
