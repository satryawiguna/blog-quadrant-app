import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchBlogs = createAsyncThunk("blog/getBlogs", async () => {
  const response = await axios.get("/common/blogs");

  return response.data.payload;
});

export const fetchAdminBlogs = createAsyncThunk(
  "blog/getAdminBlogs",
  async () => {
    const response = await AxiosJwt.get("/blogs");

    return response.data.payload;
  }
);

const blogEntity = createEntityAdapter({
  selectId: (blog) => blog.id,
});

const blogSlice = createSlice({
  name: "blog",
  initialState: blogEntity.getInitialState(),
  extraReducers: {
    [fetchBlogs.fulfilled]: (state, action) => {
      blogEntity.setAll(state, action.payload);
    },
    [fetchAdminBlogs.fulfilled]: (state, action) => {
      blogEntity.setAll(state, action.payload);
    },
  },
});

export const blogSelectors = blogEntity.getSelectors((state) => state.blog);

export default blogSlice.reducer;
