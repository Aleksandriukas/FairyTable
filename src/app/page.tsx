import { Pressable, Text } from 'react-native';
import { useLinkTo } from '../../charon';

export default function MainPage() {
    const linkTo = useLinkTo();
    return (
        <Pressable
            onPress={() => {
                linkTo('/register');
            }}
        >
            <Text>main</Text>
        </Pressable>
    );
}
