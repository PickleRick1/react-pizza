import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: number;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  imageUrl: string;
};

interface PizzaSliceState {
  items: Pizza[];
  status: string;
}
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params) => {
    const { currentPage, category, sortBy, order, searchValue } = params;
    const res = await axios.get(
      `https://63d3bb81a93a149755b16e08.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    );
    return res.data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});
export const selectPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
