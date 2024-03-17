import { createSafeContext, useSafeContext } from "@sirse-dev/safe-context";
import { OrderBean } from "../../../beans/OrderBean";

export type OrderContextType = {
  order: OrderBean[];
  setOrder: React.Dispatch<React.SetStateAction<OrderBean[]>>;
};

export const OrderContext = createSafeContext<OrderContextType>();

export const useOrderContext = () => useSafeContext(OrderContext);
