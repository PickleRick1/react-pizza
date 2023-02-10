export enum SortTypes {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type SortObj = {
  name: string;
  sortProp: SortTypes;
};

export interface FilterSliceState {
  activeCategory: number;
  search: string;
  sort: SortObj;
  currentPage: number;
}
