import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "../actions/post";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});
