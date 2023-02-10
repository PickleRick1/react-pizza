import { CartItemType } from "./../redux/slices/cart/types";
export const countTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};
