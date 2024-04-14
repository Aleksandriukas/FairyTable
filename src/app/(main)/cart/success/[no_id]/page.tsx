import { FlatList, TouchableOpacity, View } from 'react-native';
import { Appbar, DialogProps, Portal, Text, useTheme, Dialog, Button, Card } from 'react-native-paper';
import { useMainContext } from '../../../MainContext';
import { useLinkTo, useParams } from '../../../../../../charon';
import { useState } from 'react';
import { TopAppBar } from './TopAppBar';

const CHAT_COUNT = 4;

export default function SuccessPage() {
    const { colors } = useTheme();

    return (
        <View style={{ backgroundColor: colors.surface, height: '100%' }}>
            <TopAppBar />
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    backgroundColor: colors.surface,
                }}
            >
                {Array.from({ length: CHAT_COUNT }).map((_, index) => (
                    <ChatCard key={index} index={index + 1} />
                ))}
            </View>
        </View>
    );
}

type ChatCardProps = {
    index: number;
};
const ChatCard = ({ index }: ChatCardProps) => {
    const linkTo = useLinkTo();

    const { colors } = useTheme();

    const onPress = () => {
        console.log('pressed');
        linkTo(`./chat/${index}`);
    };

    return (
        <TouchableOpacity
            style={{
                height: 156,
                width: 156,
                margin: 8,
                borderRadius: 16,
                backgroundColor: colors.surface,
                padding: 12,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text variant="bodyLarge">Chat</Text>
            <Text>{`No:.${index}`}</Text>
        </TouchableOpacity>
    );
};
