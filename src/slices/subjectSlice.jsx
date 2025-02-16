// slices/subjectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubject: null, // Store the selected subject
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload; // Update the selected subject
    },
  },
});

export const { setSelectedSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
