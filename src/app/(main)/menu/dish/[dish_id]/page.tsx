import { ScrollView, View } from 'react-native';
import { useParams } from '../../../../../../charon';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import { supabase } from '../../../../../supabase/supabase';
import { DishBean } from '../../../../../beans/DishBean';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../MainContext';
import { Image } from 'react-native-elements';

export default function DishPage() {
    const { dish_id } = useParams();

    const { colors } = useTheme();

    const { dishes } = useMainContext();

    const dish = dishes.find((d) => d.id.toString() === dish_id);

    const { goBack } = useNavigation();

    const { setItemQuantity } = useMainContext();

    const addToCart = () => {
        setItemQuantity((old) => old + 1);
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title={dish?.title} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 12, paddingBottom: 128, flex: 1 }}>
                <View style={{ flexShrink: 1, gap: 4 }}>
                    <View
                        style={{
                            height: '50%',
                            width: '100%',
                            borderRadius: 24,
                            backgroundColor: colors.primaryContainer,
                        }}
                    >
                        {dish?.photoURL && (
                            <Image
                                style={{ height: '100%', width: '100%', borderRadius: 24 }}
                                source={{ uri: dish?.photoURL }}
                            />
                        )}
                    </View>
                    <View style={{ flexShrink: 1, gap: 16 }}>
                        <Text style={{ flexShrink: 1 }}>{dish?.description}</Text>
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                flexDirection: 'row',
                                gap: 12,
                                alignItems: 'center',
                            }}
                        >
                            <Text variant="labelLarge">{dish?.price} €</Text>
                            <Button onPress={addToCart} mode="contained">
                                Ideti i krepseli
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
