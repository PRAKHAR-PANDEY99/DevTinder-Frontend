import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // start with empty array instead of null
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // replace state with payload
    },
    removeFeed: () => {
      return []; // reset to empty array
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
