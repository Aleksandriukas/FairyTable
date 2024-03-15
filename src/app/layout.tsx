import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#A00000',
    primaryContainer: '#A00000A0',
  },
};

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();
  return (
    <PaperProvider theme={theme}>


      <SafeAreaProvider>
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}
          >
          {children}
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
