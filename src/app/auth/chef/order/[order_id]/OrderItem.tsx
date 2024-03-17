import { Animated, View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "react-native-paper";
import { DishBean } from "../../../../../beans/DishBean";
import { useEffect } from "react";

export type OrderDish = {
  data: DishBean;
  quantity: number;
};

const CONTAINER_HEIGHT = 100;

export default function OrderItem({ data, quantity }: OrderDish) {
  return (
    <View
      style={{
        height: CONTAINER_HEIGHT,
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 16,
        gap: 6,
      }}
    >
      <Animated.Image
        style={{
          height: 64,
          width: 64,
          alignSelf: "center",
          borderRadius: 16,
        }}
        source={{ uri: data.photoURL }}
      ></Animated.Image>

      <View
        style={{
          flexShrink: 1,
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Text variant="labelLarge">{data.title}</Text>
        <Text
          style={{ alignSelf: "flex-end" }}
          lineBreakMode="tail"
          numberOfLines={2}
        >
          Kiekis: {quantity}
        </Text>
        <Text style={{ alignSelf: "flex-end" }} variant="labelLarge">
          {`${data.price.toFixed(2)} €`}
        </Text>
      </View>
    </View>
  );
}
