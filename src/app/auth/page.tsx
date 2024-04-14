import { View, StyleSheet } from 'react-native';
import { useLinkTo } from '../../../charon';
import { useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { HelperText, TextInput, Button, Appbar, useTheme } from 'react-native-paper';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

export default function AuthPage() {
    const { colors } = useTheme();
    const { goBack } = useNavigation();
    const linkTo = useLinkTo();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hasEmailErrors = () => {
        return !email.includes('@');
    };

    const hasPasswordErrors = () => {
        return password.length < 5;
    };

    const onChangeEmail = (email: string) => setEmail(email);

    const onChangePassword = (password: string) => setPassword(password);

    const [checkErrors, setCheckErrors] = useState(false);

    const signIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            const jwtEncoded = data.session?.access_token;
            if (jwtEncoded) {
                const jwt = jwtDecode(jwtEncoded);
                const userRole = jwt.user_role;
                linkTo(`/auth/${userRole}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.surface }}>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Prisijungimas" />
            </Appbar.Header>
            <View
                style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    flex: 1,
                    paddingHorizontal: 12,
                }}
            >
                <TextInput mode="outlined" label="Paštas" value={email} onChangeText={onChangeEmail} />
                <HelperText type="error" visible={hasEmailErrors()}>
                    {checkErrors && hasEmailErrors() ? 'Pašte turi būti @ simbolis!' : ''}
                </HelperText>
                <TextInput
                    mode="outlined"
                    label="Slaptažodis"
                    secureTextEntry
                    value={password}
                    onChangeText={onChangePassword}
                />
                <HelperText type="error" visible={hasPasswordErrors()}>
                    {checkErrors && hasPasswordErrors() ? 'Slaptažodį turi sudaryti bent 5 simboliai!' : ''}
                </HelperText>
                <Button
                    mode="contained"
                    onPress={() => {
                        setCheckErrors(true);
                        signIn();
                    }}
                >
                    Prisijungti
                </Button>
            </View>
        </View>
    );
}
