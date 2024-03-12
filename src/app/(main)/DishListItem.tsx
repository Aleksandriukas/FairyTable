import { View } from 'react-native';
import { DishBean } from '../../beans/DishBean';
import { Text, useTheme, TouchableRipple } from 'react-native-paper';

export type DishListItemProps = {
    data: DishBean;
};

const CONTAINER_HEIGHT = 86;

export const DishListItem = ({ data }: DishListItemProps) => {
    const { colors } = useTheme();

    return (
        <TouchableRipple onPress={() => {}}>
            <View style={{ height: CONTAINER_HEIGHT, width: '100%', flexDirection: 'row', padding: 8, gap: 6 }}>
                <View
                    style={{
                        height: 64,
                        width: 64,
                        backgroundColor: colors.primaryContainer,
                        alignSelf: 'center',
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text>some photo</Text>
                </View>
                <View style={{ flexShrink: 1, alignSelf: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                    <Text variant="labelLarge">{data.title}</Text>
                    <Text lineBreakMode="tail" numberOfLines={2}>
                        {data.description}
                    </Text>
                    <Text style={{ alignSelf: 'flex-end' }} variant="labelLarge">
                        {`${data.price} €`}
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    );
};
