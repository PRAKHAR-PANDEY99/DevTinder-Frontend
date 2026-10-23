import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // start with empty array instead of null
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // replace state with payload
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
