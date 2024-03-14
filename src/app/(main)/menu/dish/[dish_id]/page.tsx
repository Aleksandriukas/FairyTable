import { ScrollView, View } from 'react-native';
import { useParams } from '../../../../../../charon';
import { Appbar, Button, IconButton, Text, useTheme } from 'react-native-paper';
import { supabase } from '../../../../../supabase/supabase';
import { DishBean } from '../../../../../beans/DishBean';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../../MainContext';
import { Image } from 'react-native-elements';
import { QuantityPicker } from '../../../../../components';
import Animated, { withSpring, withTiming } from 'react-native-reanimated';

import { SharedTransition } from 'react-native-reanimated';

const transition = SharedTransition.custom((values) => {
    'worklet';
    return {
        height: withTiming(values.targetHeight),
        width: withTiming(values.targetWidth),
        originX: withTiming(values.targetGlobalOriginX),
        originY: withTiming(values.targetGlobalOriginY),
        borderRadius: withTiming(values.targetBorderRadius),
    };
});

export default function DishPage() {
    const { dish_id } = useParams();

    const { colors } = useTheme();

    const { dishes, setCart } = useMainContext();

    const dish = dishes.find((d) => d.id.toString() === dish_id);

    const [quantity, setQuantity] = useState(1);

    const { goBack } = useNavigation();

    const addToCart = () => {
        setQuantity(1);
        if (dish === undefined) {
            return;
        }

        setCart(dish, quantity);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.surface }}>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title={dish?.title} />
            </Appbar.Header>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 12,
                    paddingHorizontal: 12,
                    paddingBottom: 128,
                    flex: 1,
                }}
            >
                <View style={{ flexShrink: 1, gap: 4 }}>
                    <Animated.Image
                        style={{ height: '50%', width: '100%', borderRadius: 24 }}
                        source={{ uri: dish?.photoURL }}
                    />
                    <View style={{ flexShrink: 1, gap: 8 }}>
                        <Text style={{ flexShrink: 1 }}>{dish?.description}</Text>
                        <Text style={{ alignSelf: 'flex-end' }} variant="labelLarge">
                            {dish?.price} €
                        </Text>
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                flexDirection: 'row',
                                gap: 12,
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
                                <Button onPress={addToCart} mode="contained">
                                    Ideti i krepseli
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
