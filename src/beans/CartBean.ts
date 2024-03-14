import { DishBean } from "./DishBean";

export type CartBean = {
  dish: DishBean;
  id: number;
  quantity: number;
}[];
