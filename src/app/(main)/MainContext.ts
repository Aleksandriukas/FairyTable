import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import { DishBean } from "../../beans/DishBean";
import { CartBean } from "../../beans/CartBean";

export type MainContextType = {
  dishes: DishBean[];
  setDishes: React.Dispatch<React.SetStateAction<DishBean[]>>;
  updateDishes: () => void;
  isLoading: boolean;
  cart: CartBean;
  setCart: (dish: DishBean, quantity: number) => void;
  deleteSelectedDish: (id: number) => void;
  updateCart: (index: number, quantity: number) => void;
};

export const MainContext = createSafeContext<MainContextType>();

export const useMainContext = () => useSafeContext(MainContext);
