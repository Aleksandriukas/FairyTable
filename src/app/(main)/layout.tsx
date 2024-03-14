import { PropsWithChildren, useCallback, useRef, useState } from "react";
import { MainContext } from "./MainContext";
import { DishBean } from "../../beans/DishBean";
import { supabase } from "../../supabase/supabase";
import { CartBean } from "../../beans/CartBean";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const [dishes, setDishes] = useState<DishBean[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const dishId = useRef(-1);

  const [cart, setCart] = useState<CartBean>([]);

  const updateDishes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("Dish").select("*");
      if (error) {
        throw error;
      }

      setDishes(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSelectedDish = useCallback((id: number) => {
    setCart((old) => old.filter((d) => d.id !== id));
  }, []);

  const _setCart = useCallback(
    (data: DishBean, quantity: number) => {
      const cartCopy = [...cart];

      const index = cartCopy.findIndex((d) => d.dish.id === data.id);

      if (index !== -1) {
        cartCopy[index].quantity += quantity;
        setCart(cartCopy);
        return;
      }

      setCart((old) => [
        ...old,
        { dish: data, id: ++dishId.current, quantity: quantity },
      ]);
    },
    [cart]
  );

  const updateCart = useCallback(
    (cartItemId: number, quantity: number) => {
      const cartCopy = [...cart];

      const index = cartCopy.findIndex((d) => d.id === cartItemId);
      cartCopy[index].quantity = quantity;
      setCart(cartCopy);
    },
    [cart]
  );

  return (
    <MainContext.Provider
      value={{
        dishes,
        setDishes,
        isLoading,
        updateDishes,
        cart,
        setCart: _setCart,
        deleteSelectedDish,
        updateCart,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
