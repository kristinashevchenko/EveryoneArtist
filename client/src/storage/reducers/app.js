import { createSlice } from '@reduxjs/toolkit';
import { MODES } from '../../api/constants/modes';

const initialState = {
  mode: MODES.DESTRUCTIVE_MODE
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload.mode;
    }
  }
});

export const { updateMode } = appSlice.actions;

export default appSlice.reducer;
