import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const MainRoute = () => {
    console.log('MainRoute');
    return (
        <View style={{ justifyContent: 'center', flex: 1, padding: 32 }}>
            <Button
                onPress={() => {
                    console.log('Button pressed');
                }}
                icon="camera"
            >
                HELLo Nadia
            </Button>
        </View>
    );
};
