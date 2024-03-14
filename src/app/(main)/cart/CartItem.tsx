import { View } from "react-native";
import { Image } from "react-native-elements";
import { DishBean } from "../../../beans/DishBean";
import { IconButton, Text, useTheme } from "react-native-paper";
import { QuantityPicker } from "../../../components";
import { useMainContext } from "../MainContext";

type CartItemProps = {
  data: DishBean;
  cartItemId: number;
  quantity: number;
  onDelete: () => void;
};

export const CartItem = ({
  data,
  onDelete,
  cartItemId,
  quantity,
}: CartItemProps) => {
  const { updateCart } = useMainContext();

  return (
    <View
      style={{
        height: 96,
        width: "100%",
        flexDirection: "row",
        padding: 12,
        gap: 8,
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{ height: 64, width: 64, borderRadius: 12 }}
        source={{ uri: data.photoURL }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            height: "100%",
          }}
        >
          <Text variant="titleMedium">{data.title}</Text>
          <Text style={{ textAlign: "right" }}>{data.price} €</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 0, alignItems: "center" }}>
          <QuantityPicker
            quantity={quantity}
            setQuantity={(q) => updateCart(cartItemId, q)}
          />
          <IconButton onPress={onDelete} icon="delete" />
        </View>
      </View>
    </View>
  );
};
