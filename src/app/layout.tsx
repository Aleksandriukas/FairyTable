import { PropsWithChildren, useEffect, useId } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const pink = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primaryContainer: '#ECB1C4',
        primary: '#B51A5E',
        surface: '#FAEEEF',
        background: '#FAEEEF',
        secondaryContainer: '#ffdde8',
    },
};

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    useEffect(() => {
        const setId = async () => {
            try {
                const id = await AsyncStorage.getItem('uuid');

                console.log(id);

                if (!id) {
                    await AsyncStorage.setItem('uuid', uuid.v4().toString());
                }
            } catch (e) {
                console.log(e);
            }
        };
        setId();
    }, []);

    const { colors } = useTheme();
    return (
        <PaperProvider theme={pink}>
            <SafeAreaProvider>
                <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}>{children}</View>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
