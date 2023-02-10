export type Pizza = {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  imageUrl: string;
  rating: number;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
