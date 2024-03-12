import { Pressable, Text, AppState, FlatList, View } from 'react-native';
import { useLinkTo } from '../../charon';
import { useEffect, useState } from 'react';
import { DishBean } from '../beans/DishBean';
import { supabase } from '../supabase/supabase';

export default function MainPage() {
    const linkTo = useLinkTo();

    const [dishes, setDishes] = useState<DishBean[] | undefined>(undefined);

    const fetchDishes = async () => {
        try {
            const { data, error } = await supabase.from('Dish').select('*');
            console.log(data);
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
            <FlatList
                renderItem={({ item }) => <Text>{item.title}</Text>}
                keyExtractor={(item) => item.id.toString()}
                data={dishes}
            />
            <Pressable
                onPress={() => {
                    linkTo('/register');
                }}
            >
                <Text>main</Text>
            </Pressable>
        </View>
    );
}
