import { View } from "react-native";
import { DishBean } from "../../../beans/DishBean";
import { Text, useTheme, TouchableRipple } from "react-native-paper";
import { useLinkTo } from "../../../../charon";
import Animated, { withSpring, withTiming } from "react-native-reanimated";

export type DishListItemProps = {
  data: DishBean;
  id: string;
};

const CONTAINER_HEIGHT = 100;

export const DishListItem = ({ data, id }: DishListItemProps) => {
  const linkTo = useLinkTo();

  return (
    <TouchableRipple
      testID={id}
      onPress={() => {
        linkTo(`/menu/dish/${data.id}`);
      }}
    >
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
          <Text lineBreakMode="tail" numberOfLines={2}>
            {data.description}
          </Text>
          <Text style={{ alignSelf: "flex-end" }} variant="labelLarge">
            {`${data.price.toFixed(2)} €`}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};
