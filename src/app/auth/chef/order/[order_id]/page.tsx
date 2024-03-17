import {
  Appbar,
  Button,
  IconButton,
  List,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import { useLinkTo } from "../../../../../../charon";
import { supabase } from "../../../../../supabase/supabase";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useParams } from "../../../../../../charon/src/utils/useParams";
import OrderItem, { OrderDish } from "./OrderItem";
import { OrderBean } from "../../../../../beans/OrderBean";
import { useOrderContext } from "../../OrderContext";

type OrderProduct = {
  productId: number;
  quantity: number;
};

const isOrderDish = (value: any): value is OrderDish =>
  typeof value === "object" && "data" in value && "quantity" in value;

export default function OrderPage() {
  const { order, setOrder } = useOrderContext();
  const { order_id } = useParams();

  const currentOrder = order.find((item) => item.id.toString() === order_id);

  const [selectedValue, setSelectedValue] = useState<string>(
    currentOrder?.status.toLowerCase() ?? ""
  );
  const [orderProducts, setOrderProducts] = useState<OrderDish[] | undefined>(
    undefined
  );
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const { colors } = useTheme();

  const handleOptionPress = (value: string) => {
    setSelectedValue(value);
    changeStatus(value);
  };

  console.log("Order :: ", order);
  const changeStatus = async (value: string) => {
    try {
      const { error } = await supabase
        .from("order")
        .update({ status: value.toLowerCase() })
        .eq("id", order_id);
      if (error) {
        throw error;
      }
      setOrder((old) => {
        const tempOrder = [...old];
        const index = tempOrder.findIndex(
          ({ id }) => id.toString() === order_id
        );
        tempOrder[index].status = value;
        return tempOrder;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDishes = async (orderItems: OrderProduct[]) => {
    let orderDishes: OrderDish[] = [];
    orderItems.forEach(async (element: OrderProduct) => {
      const dish = await fetchDishById(element);
      if (isOrderDish(dish)) orderDishes.push(dish);
      setOrderProducts(orderDishes);
    });
  };

  const fetchDishById = async (element: OrderProduct) => {
    try {
      const { data, error } = await supabase
        .from("Dish")
        .select("*")
        .eq("id", element.productId);
      if (error) {
        throw error;
      }
      return { data: data.at(0), quantity: element.quantity };
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrderProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("order")
        .select("products")
        .eq("id", order_id);
      if (error) {
        throw error;
      }

      const orderItems = JSON.parse(data.at(0)?.products);
      fetchDishes(orderItems);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      linkTo("/menu");
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={"Užsakymas " + order_id} />
        <Appbar.Action onPress={signOut} icon="exit-to-app" />
      </Appbar.Header>
      <List.Item title="Pasirinkite užsakymo stastusą" />
      <SegmentedButtons
        style={{ padding: 12 }}
        value={selectedValue}
        onValueChange={handleOptionPress}
        buttons={[
          {
            value: "paid",
            label: "Paid",
          },
          {
            value: "cooking",
            label: "Cooking",
          },
          {
            value: "ready",
            label: "Ready",
          },
        ]}
      />
      <List.Item
        title="Pasirinktas statusas"
        description={selectedValue?.toUpperCase() || "Nė vienas"}
      />
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.outlineVariant }}
            />
          );
        }}
        data={orderProducts}
        renderItem={({ item, index }) => (
          <OrderItem data={item.data} quantity={item.quantity} key={index} />
        )}
        keyExtractor={(item) => item.data.id.toString()}
      />
    </View>
  );
}
