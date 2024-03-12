import { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    return (
        <SafeAreaProvider>
            <View style={StyleSheet.absoluteFill}>{children}</View>
        </SafeAreaProvider>
    );
}
