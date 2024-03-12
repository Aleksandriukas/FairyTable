import { Pressable, Text, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { DishBean } from '../../../beans/DishBean';
import { supabase } from '../../../supabase/supabase';
import { Appbar, MD3Colors, useTheme } from 'react-native-paper';
import { useLinkTo } from '../../../../charon';
import { DishListItem } from './DishListItem';

export default function MainPage() {
    const linkTo = useLinkTo();

    const [dishes, setDishes] = useState<DishBean[] | undefined>(undefined);

    const { colors } = useTheme();

    const fetchDishes = async () => {
        try {
            const { data, error } = await supabase.from('Dish').select('*');
            if (error) {
                throw error;
            }

            setDishes(data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchDishes();
    }, []);

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.Content title="Menu" />
                <Appbar.Action
                    onPress={() => {
                        linkTo('/auth');
                    }}
                    icon="account"
                />
            </Appbar.Header>
            <FlatList
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 1, backgroundColor: colors.outlineVariant }} />;
                }}
                renderItem={({ item, index }) => <DishListItem data={item} key={index} />}
                keyExtractor={(item) => item.id.toString()}
                data={dishes}
            />
        </View>
    );
}
