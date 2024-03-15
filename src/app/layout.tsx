import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}
        >
          {children}
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
