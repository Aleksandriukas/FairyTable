import { ScrollView, View } from "react-native";
import { useLinkTo, useParams } from "../../../../../../charon";
import {
  Appbar,
  Button,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import { supabase } from "../../../../../supabase/supabase";
import { DishBean } from "../../../../../beans/DishBean";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import { decode } from "base64-arraybuffer";

export default function DishCRUDPage() {
  const { dish_id } = useParams();
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [dish, setDish] = useState<DishBean>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    photoURL: "",
  });
  const [fileBlob, setFileBlob] = useState<string | undefined>(undefined);

  const handleTitleChange = (newTitle: string) => {
    setDish({
      ...dish,
      title: newTitle,
    });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDish({
      ...dish,
      description: newDescription,
    });
  };

  const handlePriceChange = (newPrice: string) => {
    setDish({
      ...dish,
      price: parseFloat(newPrice),
    });
  };

  const fetchDish = async () => {
    try {
      const { data, error } = await supabase
        .from("Dish")
        .select("*")
        .eq("id", dish_id);
      if (error) {
        throw error;
      }
      setDish(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDish();
  }, []);

  const loadImage = async (filePath: string) => {
    try {
      const data = await RNFetchBlob.fs.readFile(filePath, "base64");
      setFileBlob(data);
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  };

  const uploadPhoto = async () => {
    try {
      await launchCamera(
        { mediaType: "photo", quality: 0.6 },
        (response: ImagePickerResponse) => {
          if (response.didCancel || response.errorCode) {
            throw new Error("closed camera!");
          }
          const uri = response.assets?.at(0)?.uri;
          if (uri) loadImage(uri);

          const fileName = response.assets?.at(0)?.fileName;
          setFileName(fileName);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoFromGallery = async () => {
    try {
      await launchImageLibrary(
        { mediaType: "photo", quality: 0.6 },
        (response: ImagePickerResponse) => {
          const uri = response.assets?.at(0)?.uri;
          if (uri) loadImage(uri);

          const fileName = response.assets?.at(0)?.fileName;
          setFileName(fileName);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (fileName: string) => {
    try {
      if (fileBlob) {
        const { data, error } = await supabase.storage
          .from("dishes")
          .upload(fileName, decode(fileBlob), {
            upsert: true,
            contentType: "image/jpeg",
          });
        if (error) throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUrl = async (fileName: string) => {
    try {
      const { data } = await supabase.storage
        .from("dishes")
        .getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdate = async () => {
    try {
      if (fileName) {
        uploadImage(fileName);
        const newUrl = await getUrl(fileName);
        const { data, error } = await supabase
          .from("Dish")
          .update({ ...dish, photoURL: newUrl })
          .eq("id", dish_id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("Dish")
          .update(dish)
          .eq("id", dish_id);
        if (error) throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      linkTo("/auth/admin");
    }
  };

  const submitDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("Dish")
        .delete()
        .eq("id", dish_id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      linkTo("/auth/admin");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Patiekalų redagavimas" />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 12,
          paddingBottom: 128,
          gap: 8,
        }}
      >
        <TextInput
          label="Pavadinimas"
          mode="outlined"
          onChangeText={handleTitleChange}
          value={dish.title}
        />
        <TextInput
          placeholder="Aprašymas"
          mode="outlined"
          multiline
          style={{ minHeight: 128 }}
          value={dish.description}
          onChangeText={handleDescriptionChange}
        />
        <TextInput
          label="Kaina"
          mode="outlined"
          value={dish.price.toString()}
          onChangeText={handlePriceChange}
        />
        <TextInput
          label="Įkelti failą"
          value={fileBlob ? "Failas įkeltas" : ""}
          placeholder="Select a file"
          editable={false}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ height: 10 }}></View>
          <Button onPress={uploadPhoto} mode="contained">
            Įkelti paveikslėlį
          </Button>
          <View style={{ height: 10 }}></View>
          <Button onPress={uploadPhotoFromGallery} mode="contained">
            Įkelti paveikslėlį per galeriją
          </Button>
          <View style={{ height: 10 }}></View>
          <Button onPress={submitUpdate} mode="contained">
            Atnaujinti patiekalą
          </Button>
          <View style={{ height: 10 }}></View>
          <Button onPress={submitDelete} mode="contained">
            Pašalinti patiekalą
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
