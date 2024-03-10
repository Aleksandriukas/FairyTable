import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainRoute } from './src/MainRoute';
import { PaperProvider } from 'react-native-paper';

function App(): React.JSX.Element {
    return (
        <SafeAreaView style={StyleSheet.absoluteFill}>
            <PaperProvider>
                <NavigationContainer>
                    <MainRoute />
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    );
}

export default App;
