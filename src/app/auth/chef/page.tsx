import { Appbar, useTheme } from "react-native-paper";
import { useLinkTo } from "../../../../charon";
import { supabase } from "../../../supabase/supabase";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OrderBean } from "../../../beans/OrderBean";
import OrderListItem from "./OrderListItem";
import { useOrderContext } from "./OrderContext";

export default function ChefPage() {
  const { order } = useOrderContext();
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const { colors } = useTheme();

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
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Šefo puslapis" />
        <Appbar.Action onPress={signOut} icon="exit-to-app" />
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
          <OrderListItem testID={index.toString()} data={item} key={index} />
        )}
        keyExtractor={(item: OrderBean) => item.id.toString()}
        data={order}
      />
    </View>
  );
}
