import { PropsWithChildren, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Badge, IconButton, MD3Colors, useTheme } from 'react-native-paper';
import { MainContext } from './MainContext';

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    const { colors } = useTheme();

    const [itemQuantity, setItemQuantity] = useState(0);

    return (
        <MainContext.Provider value={{ itemQuantity, setItemQuantity }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primaryContainer} />
            <View style={StyleSheet.absoluteFill}>
                <View style={{ position: 'absolute', zIndex: 100, margin: 24, bottom: 0, right: 0 }}>
                    {itemQuantity !== 0 && <Badge style={{ position: 'absolute', zIndex: 10 }}>{itemQuantity}</Badge>}
                    <IconButton
                        iconColor={colors.onPrimary}
                        containerColor={colors.primary}
                        mode="contained"
                        onPress={() => {}}
                        icon="cart"
                    />
                </View>
                {children}
            </View>
        </MainContext.Provider>
    );
}
