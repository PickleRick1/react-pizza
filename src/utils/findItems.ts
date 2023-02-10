import { CartItemType } from "./../redux/slices/cart/types";
export const findItems = (items: CartItemType[], id:string) => {
  const data = items.find((item) => item.id === id);
  return data;
};
