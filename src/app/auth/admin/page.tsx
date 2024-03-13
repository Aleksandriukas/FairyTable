import { View } from 'react-native';
import { useLinkTo } from '../../../../charon';
import { supabase } from '../../../supabase/supabase';
import { IconButton, useTheme } from 'react-native-paper';

export default function AdminPage() {
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
        </View>
    )

}
