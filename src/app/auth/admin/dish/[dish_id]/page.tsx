import { ScrollView, View } from 'react-native';
import { useLinkTo, useParams } from '../../../../../../charon';
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import { supabase } from '../../../../../supabase/supabase';
import { DishBean } from '../../../../../beans/DishBean';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { decode } from 'base64-arraybuffer';

export default function DishCRUDPage() {
    const { dish_id } = useParams();
    const linkTo = useLinkTo();
    const { colors } = useTheme();

    const [dish, setDish] = useState<DishBean>({
        id: 0,
        title: '',
        description:'',
        price:0,
        photoURL:''
    });
    const [fileBlob, setFileBlob] = useState<string |undefined>(undefined)
    const [newData, setNewData] = useState<DishBean>({
        id: 0,
        title: '',
        description:'',
        price:0,
        photoURL:''
    });

    const uploadImage = async(fileName: string) => {
        try {
            if(fileBlob) {
                const {data, error} = await supabase.storage.from('dishes').upload(fileName, decode(fileBlob),{upsert: true, contentType: 'image/jpeg'})
                if(error) throw error
            }
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

    const loadImage = async (filePath: string) => {
        try {
            const data = await RNFetchBlob.fs.readFile(filePath, 'base64');
            setFileBlob(data);
          } catch (error) {
            console.error('Failed to load image:', error);
          }
      };

    const uploadPhoto = async () => {
        try {
            const result = await launchCamera({mediaType: 'photo'}, (response : ImagePickerResponse) => {
                if (response.didCancel || response.errorCode) {
                    throw response.errorMessage
                }
                const uri = response.assets?.at(0)?.uri
                if(uri) loadImage(uri)

                const fileName = response.assets?.at(0)?.fileName
                if(fileName) uploadImage(fileName)
            });
        } catch (error) {
            console.log(error)
        }
    }


    const fetchDish = async () => {
        try {
            const { data, error } = await supabase.from('Dish').select('*').eq('id', dish_id);
            if (error) {
                throw error;
            }
            setDish(data[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const { goBack } = useNavigation();

    useEffect(() => {
        fetchDish();
        setNewData({
            id: dish.id,
            title: dish.title,
            description: dish.description,
            price: dish.price,
            photoURL: dish.photoURL
        })
    }, []);

    const submitUpdate = async () => {
        try {
            const {data,error} = await supabase.from('Dish').update(newData).eq('id', dish_id)
            if(error) throw error
        } catch (error) {
            console.log(error)
        } finally {
            linkTo('/auth/admin')
        }
    }

    const submitDelete = async () => {
        return
        try {
            const {data,error} = await supabase.from('Dish').delete().eq('id', dish_id)
            if(error) throw error
        } catch (error) {
            console.log(error)
        } finally {
            linkTo('/auth/admin')
        }
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title={dish?.title} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 12, paddingBottom: 128 }}>
                <TextInput placeholder='Title' mode="outlined" onChangeText={handleTitleChange} />
                <TextInput placeholder='Description' mode="outlined" onChangeText={handleDescriptionChange} />
                <TextInput placeholder='Price' mode="outlined" onChangeText={handlePriceChange} />
                <TextInput
                    label="Upload File"
                    value={fileBlob ? 'File uploaded' : ''}
                    placeholder="Select a file"
                    editable={false}
                />
                <Button onPress={uploadPhoto} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Įkelti paveikslėlį
                </Button>
                <Button onPress={submitUpdate} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Atnaujinti patiekalą
                </Button>
                <Button onPress={submitDelete} style={{ alignSelf: 'flex-end' }} mode="contained">
                    Pašalinti patiekalą
                </Button>
            </ScrollView>
        </View>
    );
}
