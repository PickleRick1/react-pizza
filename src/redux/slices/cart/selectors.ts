import { RootState } from "../../store";

export const selectCart = (state: RootState) => state.cart;
export const selectItem =
  (id: string, types: string, sizes: number) => (state: RootState) =>
    state.cart.items.find(
      (item) => item.id === id && item.type === types && item.size === sizes
    );
