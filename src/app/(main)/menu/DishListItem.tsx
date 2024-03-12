import { View } from 'react-native';
import { DishBean } from '../../../beans/DishBean';
import { Text, useTheme, TouchableRipple } from 'react-native-paper';
import { link } from 'fs';
import { useLinkTo } from '../../../../charon';
import { supabase } from '../../../supabase/supabase';
import { useEffect, useState } from 'react';
import { Image } from 'react-native-elements';

export type DishListItemProps = {
    data: DishBean;
};

const CONTAINER_HEIGHT = 100;

export const DishListItem = ({ data }: DishListItemProps) => {
    const { colors } = useTheme();

    const linkTo = useLinkTo();

    const [imagePlace, setImagePlace] = useState<string | null>(null);

    const fetchImage = async () => {
        try {
            const { data: image } = await supabase.storage.from('dishes').getPublicUrl(data.photoURL ?? null);

            console.log(image);
            setImagePlace(image.publicUrl);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <TouchableRipple
            onPress={() => {
                linkTo(`/menu/dish/${data.id}`);
            }}
        >
            <View
                style={{
                    height: CONTAINER_HEIGHT,
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    gap: 6,
                }}
            >
                <View
                    style={{
                        height: 64,
                        width: 64,
                        backgroundColor: colors.primaryContainer,
                        alignSelf: 'center',
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {imagePlace && (
                        <Image style={{ height: 64, width: 64, borderRadius: 16 }} source={{ uri: imagePlace }}></Image>
                    )}
                </View>
                <View style={{ flexShrink: 1, alignSelf: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                    <Text variant="labelLarge">{data.title}</Text>
                    <Text lineBreakMode="tail" numberOfLines={2}>
                        {data.description}
                    </Text>
                    <Text style={{ alignSelf: 'flex-end' }} variant="labelLarge">
                        {`${data.price} €`}
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    );
};
