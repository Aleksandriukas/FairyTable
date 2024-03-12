import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from 'react-native';

export default function RegisterPage() {
    const { goBack } = useNavigation();
    return (
        <Pressable
            onPress={() => {
                goBack();
            }}
        >
            <Text>registration</Text>
        </Pressable>
    );
}
