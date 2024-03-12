import { ScrollView, View } from 'react-native';
import { useParams } from '../../../../../../charon';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import { supabase } from '../../../../../supabase/supabase';
import { DishBean } from '../../../../../beans/DishBean';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../MainContext';

export default function DishPage() {
    const { dish_id } = useParams();

    const { colors } = useTheme();

    const [dish, setDish] = useState<DishBean | undefined>(undefined);

    const fetchDish = async () => {
        try {
            const { data, error } = await supabase.from('Dish').select('*').eq('id', dish_id);
            if (error) {
                throw error;
            }
            setDish(data[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const { goBack } = useNavigation();

    const { setItemQuantity } = useMainContext();

    const addToCart = () => {
        setItemQuantity((old) => old + 1);
    };

    useEffect(() => {
        fetchDish();
    }, []);

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title={dish?.title} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 12, paddingBottom: 128 }}>
                <Button onPress={addToCart} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Padeti i krepseli
                </Button>
            </ScrollView>
        </View>
    );
}
