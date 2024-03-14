import { ScrollView, View } from 'react-native';
import { useLinkTo } from '../../../../../../charon';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { supabase } from '../../../../../supabase/supabase';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

export type DishCreateBean = {
    title:string,
    description:string,
    price:number,
    photoURL:string
}

export default function DishCreatePage() {
    const linkTo = useLinkTo();
    const { colors } = useTheme();
    const { goBack } = useNavigation();
    const [fileUri, setFileUri] = useState<string |undefined>(undefined)
    const [newData, setNewData] = useState<DishCreateBean>({
        title: '',
        description:'',
        price:0,
        photoURL:''
    });

    const submitCreate = async () => {
        uploadFileFromUri()
        try {
            const {data,error} = await supabase.from('Dish').insert(newData)
            if(error) throw error
        } catch (error) {
            console.log(error)
        } finally {
            linkTo('/auth/admin')
        }
    }

    const uploadFileFromUri = async() => {
        try {
            const {data, error} = await supabase.storage.from('dishes').upload('file_path', fileUri)
            if(error) throw error
        } catch(error) {
            console.log(error)
        }
    }

    const handleTitleChange = (newTitle: string) => {
        setNewData({
            ...newData,
            title: newTitle
        })
    }

    const handleDescriptionChange = (newDescription: string) => {
        setNewData({
            ...newData,
            description: newDescription
        })
    }

    const handlePriceChange = (newPrice:string) => {
        setNewData({
            ...newData,
            price: parseFloat(newPrice)
        })
    }

    const uploadPhoto = async () => {
        try {
            const result = await launchCamera({mediaType: 'photo'}, (response : ImagePickerResponse) => {
                if (response.didCancel || response.errorCode) {
                    throw response.errorMessage
                }
                const uri = response.assets?.at(0)?.uri
                setFileUri(uri)
                const fileNameAndType = response.assets?.at(0)?.fileName + '.' + response.assets?.at(0)?.type
                setNewData({
                    ...newData,
                    photoURL: fileNameAndType
                });
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title='Patiekalo sukūrimo puslapis' />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 12, paddingBottom: 128 }}>
                <TextInput placeholder='Title' mode="outlined" onChangeText={handleTitleChange} />
                <TextInput placeholder='Description' mode="outlined" onChangeText={handleDescriptionChange} />
                <TextInput placeholder='Price' mode="outlined" onChangeText={handlePriceChange} />
                <TextInput
                    label="Upload File"
                    value={fileUri ? fileUri : ''}
                    placeholder="Select a file"
                    editable={false}
                />
                <Button onPress={uploadPhoto} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Pridėti patiekalo paveikslėlį
                </Button>
                <Button onPress={submitCreate} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Sukurti patiekalą
                </Button>
            </ScrollView>
        </View>
    );
}