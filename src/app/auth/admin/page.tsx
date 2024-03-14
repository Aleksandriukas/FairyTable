import { FlatList, View } from 'react-native';
import { useLinkTo } from '../../../../charon';
import { supabase } from '../../../supabase/supabase';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { DishBean } from '../../../beans/DishBean';
import { DishCRUDListItem } from './DishCRUDListItem';

export default function AdminPage() {
    const { goBack } = useNavigation();
    const linkTo = useLinkTo();
    const { colors } = useTheme();
    const [dishes, setDishes] = useState<DishBean[] | undefined>(undefined);
  
    const fetchDishes = async () => {
      try {
        const { data, error } = await supabase.from("Dish").select("*");
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

    const signOut = async () => {
        try {
            const {error} = await supabase.auth.signOut()
            linkTo('/menu')
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }

    const createDish = () => {
        linkTo('/auth/admin/dish/create')
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Admin page" />
                <IconButton
                    iconColor={colors.onPrimary}
                    containerColor={colors.primary}
                    mode="contained"
                    onPress={createDish}
                    icon="upload"
                />
                <IconButton
                    iconColor={colors.onPrimary}
                    containerColor={colors.primary}
                    mode="contained"
                    onPress={() => {linkTo('/auth/admin/registerChef')}}
                    icon="script-text-key"
                />
                <IconButton
                    iconColor={colors.onPrimary}
                    containerColor={colors.primary}
                    mode="contained"
                    onPress={signOut}
                    icon="exit-to-app"
                />
                
            </Appbar.Header>
            <FlatList
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 1, backgroundColor: colors.outlineVariant }} />;
                }}
                renderItem={({ item, index }) => <DishCRUDListItem data={item} key={index} />}
                keyExtractor={(item) => item.id.toString()}
                data={dishes}
            />
        </View>
    )

}
