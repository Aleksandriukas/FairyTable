import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const green = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryContainer: 'rgb(181, 177, 140)',
    primary: 'rgb(96, 104, 63)',
    surface: 'rgb(248, 241, 223)',
  },
};

const pink = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryContainer: '#ECB1C4',
    primary: '#B51A5E',
    surface: '#FAEEEF',
  },
};

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  const { colors } = useTheme();
  return (
    <PaperProvider theme={pink}>


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
