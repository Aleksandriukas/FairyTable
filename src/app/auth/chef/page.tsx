import { Appbar, IconButton, Text, useTheme } from 'react-native-paper';
import { useLinkTo } from '../../../../charon';
import { supabase } from '../../../supabase/supabase';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChefPage() {
    const { goBack } = useNavigation();
    const linkTo = useLinkTo();
    const { colors } = useTheme();

    const signOut = async () => {
        try {
            const {error} = await supabase.auth.signOut()
            linkTo('/menu')
            if(error) throw error
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Chef page" />
                <IconButton
                    iconColor={colors.onPrimary}
                    containerColor={colors.primary}
                    mode="contained"
                    onPress={signOut}
                    icon="exit-to-app"
                />
            </Appbar.Header>
            
        </View>
    )

}
