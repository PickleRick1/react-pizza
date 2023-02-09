import { createSlice } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { RootState } from "../store";

export type SortObj = {
  name: string;
  sortProp: string;
};

interface FilterSliceState {
  activeCategory: number;
  search: string;
  sort: SortObj;
  currentPage: number;
}

const initialState: FilterSliceState = {
  activeCategory: 0,
  search: "",
  sort: {
    name: "популярности (DESC)",
    sortProp: "rating",
  },
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
export const {
  setActiveCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
