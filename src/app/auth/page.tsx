import { Pressable, Text, AppState, FlatList, View, StyleSheet } from 'react-native';
import { useLinkTo } from '../../../charon';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { Image } from 'react-native-elements';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { jwtDecode } from 'jwt-decode';
import { Session } from '@supabase/supabase-js';

export default function MainPage() {

    const [session, setSession] = useState<Session | null>(null)
    const linkTo = useLinkTo();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hasEmailErrors = () => {
        return !email.includes('@')
    }

    const hasPasswordErrors = () => {
        return password.length < 5
    }

    const onChangeEmail = (email: string) => setEmail(email)

    const onChangePassword = (password: string) => setPassword(password)

    const signIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            const jwtEncoded = data.session?.access_token
            if(jwtEncoded) {
                const jwt = jwtDecode(jwtEncoded)
                const userRole = jwt.user_role
                linkTo(`/auth/${userRole}`);
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        
        <View>
            <TextInput label="Email" value={email} onChangeText={onChangeEmail}

            />
            <HelperText type="error" visible={hasEmailErrors()}>
                {hasEmailErrors() ? 'Email needs a @ symbol!' : 'Email is valid!'}
            </HelperText>
            <TextInput label="Password" value={password} onChangeText={onChangePassword}
                
            />
            <HelperText type="error" visible={hasPasswordErrors()}>
                {hasPasswordErrors() ? 'Password must have at least 5 symbols' : 'Password is valid!'}
            </HelperText>
            <Button
                onPress={() => {
                    signIn()
                }}
            >
                Sign in
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    
});