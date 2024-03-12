import { useLinkTo, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function RegisterPage() {
    const { goBack } = useNavigation();
    const linkTo = useLinkTo();
    const [isAdmin, setIsAdmin] = useState(true);
    return (
        <Pressable
            onPress={() => {
                goBack();
            }}
        >
            <Text>auth</Text>
            <Button
                onPress={() => {
                    linkTo(`/auth/${isAdmin ? 'admin' : 'sef'}`);
                }}
            >
                Sign in
            </Button>
        </Pressable>
    );
}
