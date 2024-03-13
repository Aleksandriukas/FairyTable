import { PropsWithChildren, useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Badge, IconButton, useTheme } from 'react-native-paper';
import { MainContext } from './MainContext';
import { DishBean } from '../../../beans/DishBean';
import { supabase } from '../../../supabase/supabase';
import { useLinkTo } from '../../../../charon';

export default function MenuLayout({ children }: PropsWithChildren<{}>) {
    const { colors } = useTheme();

    const [itemQuantity, setItemQuantity] = useState(0);
    const [dishes, setDishes] = useState<DishBean[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const linkTo = useLinkTo();

    const updateDishes = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('Dish').select('*');
            if (error) {
                throw error;
            }

            setDishes(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <MainContext.Provider value={{ itemQuantity, setItemQuantity, dishes, setDishes, isLoading, updateDishes }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primaryContainer} />
            <View style={StyleSheet.absoluteFill}>
                <View style={{ position: 'absolute', zIndex: 100, margin: 12, bottom: 0, right: 0 }}>
                    {itemQuantity !== 0 && <Badge style={{ position: 'absolute', zIndex: 10 }}>{itemQuantity}</Badge>}
                    <IconButton
                        iconColor={colors.onPrimary}
                        containerColor={colors.primary}
                        mode="contained"
                        onPress={() => {
                            linkTo('/cart');
                        }}
                        icon="cart"
                    />
                </View>
                {children}
            </View>
        </MainContext.Provider>
    );
}
