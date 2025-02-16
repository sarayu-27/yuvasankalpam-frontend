import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assessment: null,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setAssessment(state, action) {
      state.assessment = action.payload; // Update state
    },
    clearAssessment(state) {
      state.assessment = null;
    },
  },
});

export const { setAssessment, clearAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
