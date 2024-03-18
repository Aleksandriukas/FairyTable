import { FlatList, View, ActivityIndicator } from 'react-native';
import { Button, Dialog, DialogProps, Portal, Text, useTheme } from 'react-native-paper';
import { useMainContext } from '../MainContext';
import { useMemo, useRef, useState } from 'react';
import Animated from 'react-native-reanimated';
import { supabase } from '../../../supabase/supabase';
import { useLinkTo } from '../../../../charon';

type PaymentModalProps = { total: number } & Omit<DialogProps, 'children'>;

type CheckType = {
    title: string;
    quantity: number;
    totalPrice: number;
};

export const PaymentModal = ({ total, onDismiss, ...other }: PaymentModalProps) => {
    const { cart } = useMainContext();

    const { colors } = useTheme();

    const linkTo = useLinkTo();

    const [isLoading, setIsLoading] = useState(false);

    const no = useRef(null);

    const pay = async () => {
        setIsLoading(true);

        try {
            const products: { productId: number; quantity: number }[] = [];

            cart.forEach((item) => {
                products.push({ productId: item.dish.id, quantity: item.quantity });
            });

            const { data, error } = await supabase
                .from('order')
                .insert([
                    {
                        products: JSON.stringify(products),
                        userNumber: 1,
                    },
                ])
                .select();
            console.log(data, error);
            if (error) {
                throw new Error('Error');
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            onDismiss?.();
            no.current = data[0].id;
            linkTo(`/cart/${no.current}/success`);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };

    const data = useMemo(() => {
        const d: CheckType[] = [];

        cart.forEach((item) => {
            d.push({
                title: item.dish.title,
                quantity: item.quantity,
                totalPrice: item.dish.price * item.quantity,
            });
        });
        return d;
    }, [cart]);

    return (
        <Portal>
            <Dialog onDismiss={onDismiss} {...other}>
                <Dialog.Title>Mokėjimas</Dialog.Title>
                <Dialog.ScrollArea style={{ maxHeight: 128 }}>
                    <FlatList data={data} renderItem={({ item }) => <RenderItem data={item} />} />
                </Dialog.ScrollArea>
                <Dialog.Content>
                    <Text style={{ textAlign: 'right' }}>{`Suma: ${total.toFixed(2)} €`}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    {isLoading ? (
                        <Animated.View style={{ height: 40 }}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </Animated.View>
                    ) : (
                        <Animated.View style={{ height: 40 }}>
                            <Button onPress={pay}>Apmoketi</Button>
                        </Animated.View>
                    )}
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const RenderItem = ({ data }: { data: CheckType }) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
            <Text style={{ flex: 3 }}>{data.title}</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>{data.quantity}X</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>{data.totalPrice.toFixed(2)} €</Text>
        </View>
    );
};
