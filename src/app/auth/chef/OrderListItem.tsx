import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { OrderBean } from "../../../beans/OrderBean";
import { useLinkTo } from "../../../../charon";

export type OrderListItem = {
  data: OrderBean;
  testID: string;
};

export default function OrderListItem({ data, testID }: OrderListItem) {
  const linkTo = useLinkTo();

  return (
    <TouchableRipple
      aria-label={`No:. ${data.id}`}
      testID={testID}
      onPress={() => {
        linkTo(`/auth/chef/order/${data.id}`);
      }}
    >
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
            <Text variant="titleMedium">Užsakymo ID: {data.id}</Text>
            <Text variant="titleMedium">Užsakė: {data.userNumber}</Text>
            <Text variant="titleMedium">Statusas: {data.status}</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}
