import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  course: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse(state, action) {
      state.course = action.payload; // Update state
    },
    clearCourse(state) {
      state.course = null;
    },
  },
});

export const { setCourse, clearCourse } = courseSlice.actions;
export default courseSlice.reducer;
