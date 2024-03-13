import { Pressable, Text, AppState, FlatList, View, StyleSheet } from 'react-native';
import { useLinkTo } from '../../../../../charon';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../supabase/supabase';
import { Image } from 'react-native-elements';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { jwtDecode } from 'jwt-decode';

export default function RegisterChefPage() {
    const linkTo = useLinkTo();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hasEmailErrors = () => {
        return !email.includes('@')
    }

    const hasPasswordErrors = () => {
        return password.length < 6
    }

    const onChangeEmail = (email: string) => setEmail(email)

    const onChangePassword = (password: string) => setPassword(password)

    const register = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if(error) {
                throw error
            }
            console.log(data)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>
                Register a chef
            </Text>
            <TextInput label="Email" value={email} onChangeText={onChangeEmail}

            />
            <HelperText type="error" visible={hasEmailErrors()}>
                {hasEmailErrors() ? 'Email needs a @ symbol!' : 'Email is valid!'}
            </HelperText>
            <TextInput label="Password" value={password} onChangeText={onChangePassword}
                
            />
            <HelperText type="error" visible={hasPasswordErrors()}>
                {hasPasswordErrors() ? 'Password must have at least 6 symbols' : 'Password is valid!'}
            </HelperText>
            <Button
                onPress={() => {
                    register()
                }}
            >
                Register the chef
            </Button>
        </View>
    )
}
