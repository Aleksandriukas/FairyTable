import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}
      >
        {children}
      </View>
    </SafeAreaProvider>
  );
}
