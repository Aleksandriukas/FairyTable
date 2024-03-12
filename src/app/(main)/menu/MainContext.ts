import { createSafeContext, useSafeContext } from '@sirse-dev/safe-context';

export type MainContextType = {
    itemQuantity: number;
    setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const MainContext = createSafeContext<MainContextType>();

export const useMainContext = () => useSafeContext(MainContext);
