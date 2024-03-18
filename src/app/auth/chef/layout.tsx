import { PropsWithChildren, useEffect, useState } from "react";
import { OrderContext } from "./OrderContext";
import { OrderBean } from "../../../beans/OrderBean";
import { supabase } from "../../../supabase/supabase";

export default function ChefLayout({ children }: PropsWithChildren<{}>) {
  const [order, setOrder] = useState<OrderBean[]>([]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("order").select("*");
      if (error) {
        throw error;
      }
      setOrder(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
