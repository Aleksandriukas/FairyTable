import "react-native";

import { supabase } from "../src/supabase/supabase";

describe("Check payment", () => {
  test("test ordering", async () => {
    const products: { productId: number; quantity: number }[] = [];

    products.push({ productId: 2, quantity: 3 });
    products.push({ productId: 3, quantity: 5 });

    const { data, error } = await supabase
      .from("order")
      .insert([
        {
          products: JSON.stringify(products),
          userNumber: 1,
        },
      ])
      .select();

    expect(error).toBeUndefined;
  });
});
