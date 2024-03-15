import { FlatList, View, ActivityIndicator } from "react-native";
import { Button, Dialog, DialogProps, Portal, Text } from "react-native-paper";
import { useMainContext } from "../MainContext";
import { useMemo } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type PaymentModalProps = {} & Omit<DialogProps, "children">;

type CheckType = {
  title: string;
  quantity: number;
  totalPrice: number;
};

export const PaymentModal = ({ ...other }: PaymentModalProps) => {
  const { cart } = useMainContext();

  const data = useMemo(() => {
    const d: CheckType[] = [];

    cart.forEach((item) => {
      d.push({
        title: item.dish.title,
        quantity: item.quantity,
        totalPrice: item.dish.price * item.quantity,
      });
    });
    return d;
  }, [cart]);

  return (
    <Portal>
      <Dialog {...other}>
        <Dialog.Title>Payment</Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 128 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <RenderItem data={item} />}
          />
          <Animated.View
            style={{
              backgroundColor: "#00000010",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              height: "100%",
              width: "100%",
            }}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <ActivityIndicator />
          </Animated.View>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button>Apmoketi</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const RenderItem = ({ data }: { data: CheckType }) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 2 }}>
      <Text style={{ flex: 3 }}>{data.title}</Text>
      <Text style={{ flex: 1, textAlign: "right" }}>{data.quantity}X</Text>
      <Text style={{ flex: 1, textAlign: "right" }}>
        {data.totalPrice.toFixed(2)} €
      </Text>
    </View>
  );
};
