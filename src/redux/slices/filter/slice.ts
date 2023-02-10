import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterSliceState, SortObj, SortTypes } from "./types";



const initialState: FilterSliceState = {
  activeCategory: 0,
  search: "",
  sort: {
    name: "популярности (DESC)",
    sortProp: SortTypes.RATING_DESC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategoryId(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSortType(state, action: PayloadAction<SortObj>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});


export const {
  setActiveCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;