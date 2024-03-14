import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type QuantityPickerProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export const QuantityPicker = ({
  quantity,
  setQuantity,
}: QuantityPickerProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton
        onPress={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        icon="minus"
      />
      <View
        style={{
          backgroundColor: "#00000010",
          borderRadius: 4,
          height: 32,
          width: 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{quantity}</Text>
      </View>
      <IconButton
        onPress={() => {
          if (quantity >= 99) {
            return;
          }

          setQuantity(quantity + 1);
        }}
        icon="plus"
      />
    </View>
  );
};
