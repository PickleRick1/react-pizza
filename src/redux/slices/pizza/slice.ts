import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { Pizza, PizzaSliceState, Status } from "./types";


export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params: Record<string, string>) => {
    const { currentPage, category, sortBy, order, searchValue } = params;
    const res = await axios.get(
      `https://63d3bb81a93a149755b16e08.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    );
    return res.data as Pizza[];
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;