import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
import { Appbar, Button, Text, useTheme } from "react-native-paper";
import { useMainContext } from "../MainContext";
import { CartItem } from "./CartItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function CartPage() {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  const { cart, deleteSelectedDish } = useMainContext();

  const total = useMemo(() => {
    let t = 0;
    cart.forEach(({ dish, quantity }) => {
      t += dish.price * quantity;
    });

    return t;
  }, [cart]);

  const onDelete = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    deleteSelectedDish(id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Cart" />
      </Appbar.Header>
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.outlineVariant }}
            />
          );
        }}
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            onDelete={() => onDelete(item.id)}
            cartItemId={item.id}
            data={item.dish}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <SafeAreaView
        style={{
          flexDirection: "row",
          paddingHorizontal: 12,
          marginBottom: 12,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text variant="bodyLarge">{`Total: ${total.toFixed(2)} €`}</Text>
        <Button disabled={cart.length === 0} mode="contained">
          Apmoketi
        </Button>
      </SafeAreaView>
    </View>
  );
}
