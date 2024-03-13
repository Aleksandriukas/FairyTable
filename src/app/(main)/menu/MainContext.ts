import { createSafeContext, useSafeContext } from '@sirse-dev/safe-context';
import { DishBean } from '../../../beans/DishBean';

export type MainContextType = {
    itemQuantity: number;
    setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
    dishes: DishBean[];
    setDishes: React.Dispatch<React.SetStateAction<DishBean[]>>;
    updateDishes: () => void;
    isLoading: boolean;
};

export const MainContext = createSafeContext<MainContextType>();

export const useMainContext = () => useSafeContext(MainContext);
