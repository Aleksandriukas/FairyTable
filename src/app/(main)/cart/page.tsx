import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';

export default function CartPage() {
    const { goBack } = useNavigation();
    const { colors } = useTheme();

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Cart" />
            </Appbar.Header>
            <Text>Cart</Text>
        </View>
    );
}
