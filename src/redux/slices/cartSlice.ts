import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
  imageUrl: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
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
    minusItems(state, action: PayloadAction<CartItemType>) {
      const items = findItems(state, action);

      if (items) {
        items.count -= 1;
      }
      countTotalPrice(state);
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      countTotalPrice(state);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
const countTotalPrice = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};
const findItems = (
  state: CartSliceState,
  action: PayloadAction<CartItemType>
) => {
  const data = state.items.find((item) => item.id === action.payload.id);
  return data;
};

export const selectCart = (state: RootState) => state.cart;
export const selectItem = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);
export const { addItems, removeItems, clearItems, minusItems } =
  cartSlice.actions;

export default cartSlice.reducer;
