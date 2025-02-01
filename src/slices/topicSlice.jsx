import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topic: null, // Initial state; redux-persist will handle persistence
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopic(state, action) {
      state.topic = action.payload; // Update the topic in the state
    },
    clearTopic(state) {
      state.topic = null; // Clear the topic state
    },
  },
});

// Export the action and reducer
export const { setTopic, clearTopic } = topicSlice.actions;
export default topicSlice.reducer;
