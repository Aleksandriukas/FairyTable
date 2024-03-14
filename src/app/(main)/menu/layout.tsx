import { PropsWithChildren, useMemo } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Badge, FAB, useTheme } from "react-native-paper";
import { useMainContext } from "../MainContext";
import { useLinkTo } from "../../../../charon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();

  const { cart } = useMainContext();

  const quantity = useMemo(() => {
    let q = 0;
    cart.forEach(({ quantity }) => {
      q += quantity;
    });
    return q;
  }, [cart]);

  const insets = useSafeAreaInsets();
  const linkTo = useLinkTo();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.primaryContainer}
      />
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            marginHorizontal: 16,
            marginBottom: insets.bottom + 16,

            bottom: 0,
            right: 0,
          }}
        >
          {quantity !== 0 && (
            <Badge
              style={{
                position: "absolute",
                zIndex: 10,
                top: -8,
                right: -8,
              }}
            >
              {quantity}
            </Badge>
          )}
          <FAB
            onPress={() => {
              linkTo("/cart");
            }}
            icon="cart"
          />
        </View>
        {children}
      </View>
    </>
  );
}
