import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const items = findItems(state, action);
      if (items) {
        items.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      countTotalPrice(state);
    },
    minusItems(state, action) {
      const items = findItems(state, action);

      if (items) {
        items.count -= 1;
      }
      countTotalPrice(state);
    },
    removeItems(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      countTotalPrice(state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
const countTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};
const findItems = (state, action) => {
  const data = state.items.find((item) => item.id === action.payload.id);
  return data;
};

export const selectCart = (state) => state.cart;
export const selectItem = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);
export const { addItems, removeItems, clearItems, minusItems } =
  cartSlice.actions;

export default cartSlice.reducer;
