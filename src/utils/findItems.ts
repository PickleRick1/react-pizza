import { CartItemType } from "./../redux/slices/cart/types";
export const findItems = (items: CartItemType[], obj: CartItemType) => {
 return items.find((item) => {
    return (
      item.id === obj.id && item.size === obj.size && item.type === obj.type
    );
  });
};
