import { getCartFromLS } from "./../../../utils/getCartFromLS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { countTotalPrice } from "../../../utils/countTotalPrice";
import { findItems } from "../../../utils/findItems";
import { CartItemType, CartSliceState } from "./types";

const cartData = getCartFromLS();
const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
      const items = findItems(state.items, action.payload);
      if (items) {
        items.count += 1;
        debugger;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = countTotalPrice(state.items);
    },
    minusItems(state, action: PayloadAction<CartItemType>) {
      const items = findItems(state.items, action.payload);

      items && items.count--;
      state.totalPrice = countTotalPrice(state.items);
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = countTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, minusItems } =
  cartSlice.actions;

export default cartSlice.reducer;
