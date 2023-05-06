import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};
const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = requestSlice.actions;
export default requestSlice.reducer;
