import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const response = await axios.get("/common/categories");

    return response.data.payload;
  }
);

export const fetchAdminCategories = createAsyncThunk(
  "category/getAdminCategories",
  async () => {
    const response = await AxiosJwt.get("/categories");

    return response.data.payload;
  }
);

const categoryEntity = createEntityAdapter({
  selectId: (category) => category.id,
});

const categorySlice = createSlice({
  name: "category",
  initialState: categoryEntity.getInitialState(),
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      categoryEntity.setAll(state, action.payload);
    },
    [fetchAdminCategories.fulfilled]: (state, action) => {
      categoryEntity.setAll(state, action.payload);
    },
  },
});

export const categorySelectors = categoryEntity.getSelectors(
  (state) => state.category
);

export default categorySlice.reducer;
