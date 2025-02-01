import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload; // Set the error message
    },
    clearError(state) {
      state.error = ''; // Clear the error
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
