import { Appbar, IconButton, Text, useTheme } from "react-native-paper";
import { useLinkTo } from "../../../../charon";
import { supabase } from "../../../supabase/supabase";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { OrderBean } from "../../../beans/OrderBean";
import OrderListItem from "./OrderListItem";

export default function ChefPage() {
  const [orders, setOrders] = useState<OrderBean[] | undefined>(undefined);
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const { colors } = useTheme();

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("order").select("*");
      if (error) {
        throw error;
      }
      setOrders(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrders();
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
        <Appbar.Content title="Šefo puslapis" />
        <IconButton
          iconColor={colors.onPrimary}
          containerColor={colors.primary}
          mode="contained"
          onPress={signOut}
          icon="exit-to-app"
        />
      </Appbar.Header>
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.outlineVariant }}
            />
          );
        }}
        renderItem={({ item, index }) => (
          <OrderListItem data={item} key={index} />
        )}
        keyExtractor={(item: OrderBean) => item.id.toString()}
        data={orders}
      />
    </View>
  );
}
