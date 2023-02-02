import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sort: {
    name: "популярности (DESC)",
    sortProp: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryId(state, action) {
      state.activeCategory = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setActiveCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
