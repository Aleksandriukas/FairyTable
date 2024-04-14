import "react-native";
import React from "react";

import renderer from "react-test-renderer";
import OrderItem from "../src/app/auth/chef/order/[order_id]/OrderItem";
import OrderListItem from "../src/app/auth/chef/OrderListItem";
import { supabase } from "../src/supabase/supabase";

describe("Order item component", () => {
  test("Order item renders correctly", () => {
    renderer.create(
      <OrderItem
        data={{
          id: 1,
          title: "Test order item",
          description: "Very tasty",
          price: 10.99,
          photoURL: "none",
        }}
        quantity={0}
      />
    );
  });

  test("fetch orders", () => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("order").select("*");
      expect(error).toBeUndefined();
    };
  });
});
