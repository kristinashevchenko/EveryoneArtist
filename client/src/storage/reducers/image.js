import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forkChat, updateConversations } from './conversation';
import imageApi from '../../api/image';

const initialState = [];

export const generateImage = createAsyncThunk(
  'images/generateImage',
  async ({ conversationId, messages }) => {
    const response = await imageApi.generateImage({ conversationId, messages });

    return {
      imageUrl: response.imageUrl,
      generatedPrompt: response.generatedPrompt,
      conversationId
    };
  }
);

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forkChat.fulfilled, (state) => {
        state.push({
          imageUrl:
            'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png',
          generatedPrompt: 'empty prompt'
        });
      })
      .addCase(updateConversations, (state, action) => {
        state.length = 0;
        const conversations = action.payload;
        conversations.forEach((conversation) => {
          const item = {
            imageUrl:
              'https://caracallacosmetici.com/wp-content/uploads/2019/03/no-img-placeholder.png',
            generatedPrompt: 'empty prompt'
          };
          for (let i = conversation.length - 1; i >= 0; i--) {
            const message = conversation[i];
            if (message.imageUrl) {
              item.imageUrl = message.imageUrl;
              item.generatedPrompt = message.generatedPrompt;
              break;
            }
          }
          state.push(item);
        });
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        const { conversationId, imageUrl, generatedPrompt } = action.payload;
        state[conversationId].imageUrl = imageUrl;
        state[conversationId].generatedPrompt = generatedPrompt;
      });
  }
});

export default imageSlice.reducer;
