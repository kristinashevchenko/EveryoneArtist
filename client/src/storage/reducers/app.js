import { createSlice } from '@reduxjs/toolkit';
import { MODES } from '../../api/constants/modes';
import { STATES } from '../../api/constants/states';
import { forkChat, startChat } from './conversation';

const initialState = {
  state: '',
  mode: MODES.DESTRUCTIVE_MODE
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload.mode;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forkChat.pending, (state) => {
        state.state = STATES.LOADING;
      })
      .addCase(forkChat.rejected, (state) => {
        state.state = STATES.ERROR;
      })
      .addCase(forkChat.fulfilled, (state) => {
        state.state = STATES.READY;
      })
      .addCase(startChat.pending, (state) => {
        state.state = STATES.LOADING;
      })
      .addCase(startChat.rejected, (state) => {
        state.state = STATES.ERROR;
      })
      .addCase(startChat.fulfilled, (state) => {
        state.state = STATES.READY;
      });
  }
});

export const { updateMode } = appSlice.actions;

export default appSlice.reducer;
