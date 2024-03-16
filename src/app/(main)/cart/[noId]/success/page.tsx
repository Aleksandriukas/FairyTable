import { View } from 'react-native';
import { Appbar, DialogProps, Portal, Text, useTheme, Dialog, Button } from 'react-native-paper';
import { useMainContext } from '../../../MainContext';
import { useLinkTo, useParams } from '../../../../../../charon';
import { useState } from 'react';

export default function SuccessPage() {
    const { colors } = useTheme();

    const [visible, setVisible] = useState(false);

    const { noId } = useParams();

    return (
        <View style={{ flex: 1, backgroundColor: colors.surface }}>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.Content title={`No:. ${noId}`} />
                <Appbar.Action
                    onPress={() => {
                        setVisible(true);
                    }}
                    icon="logout"
                />
            </Appbar.Header>
            <Text>Sėkmingai apmokėta!</Text>
            <ConfirmationDialog
                visible={visible}
                onDismiss={() => {
                    setVisible(false);
                }}
            />
        </View>
    );
}

const ConfirmationDialog = (props: Omit<DialogProps, 'children'>) => {
    const { deleteCart } = useMainContext();

    const linkTo = useLinkTo();

    const endSession = () => {
        props.onDismiss?.();
        deleteCart();
        linkTo('/menu');
    };

    return (
        <Portal>
            <Dialog {...props}>
                <Dialog.Content>
                    <Text>Ar tikrai norite baigti seansą?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={() => {
                            props.onDismiss?.();
                        }}
                    >
                        Ne
                    </Button>
                    <Button onPress={endSession}>Taip</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
