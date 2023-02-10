export type CartItemType = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
  imageUrl: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
