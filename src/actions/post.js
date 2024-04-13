import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (movieId) => {
    let url;
    if (!movieId) {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=6b91d8c19dca706221674a5eb447a877&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=6b91d8c19dca706221674a5eb447a877&language=en-US`;
    }

    const response = await axios.get(url);

    return movieId ? response.data : response.data.results;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { getPosts } = postsSlice.actions;

export default postsSlice.reducer;
