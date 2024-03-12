import { createSafeContext, useSafeContext } from '@sirse-dev/safe-context';

export type MainContextType = {
    itemQuantity: number;
    setItemQuantity: (quantity: number) => void;
};

export const MainContext = createSafeContext<MainContextType>();

export const useMainContext = () => useSafeContext(MainContext);
