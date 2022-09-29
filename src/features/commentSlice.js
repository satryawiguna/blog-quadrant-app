import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchCommentsByBlogId = createAsyncThunk(
  "comment/getCommentsByBlogId",
  async (id) => {
    const response = await AxiosJwt.get(`/blog/${id}/comments`);

    return response.data.payload;
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ id, data }) => {
    const response = await AxiosJwt.post(`/blog/${id}/comment`, data);

    return response.data.payload;
  }
);

const commentEntity = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const commentSlice = createSlice({
  name: "comment",
  initialState: commentEntity.getInitialState(),
  extraReducers: {
    [fetchCommentsByBlogId.fulfilled]: (state, action) => {
      commentEntity.setAll(state, action.payload);
    },
    [createComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      commentEntity.addOne(state, action.payload);
    },
  },
});

export const commentSelectors = commentEntity.getSelectors(
  (state) => state.comment
);

export default commentSlice.reducer;
