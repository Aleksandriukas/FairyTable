import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MainLayout({ children }: PropsWithChildren<{}>) {
    return <View style={StyleSheet.absoluteFill}>{children}</View>;
}
