import { ScrollView, View } from "react-native";
import { useLinkTo } from "../../../../../../charon";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { supabase } from "../../../../../supabase/supabase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { decode } from "base64-arraybuffer";
import RNFetchBlob from "rn-fetch-blob";

export type DishCreateBean = {
  title: string;
  description: string;
  price: number;
  photoURL: string;
};

export default function DishCreatePage() {
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileBlob, setFileBlob] = useState<string | undefined>(undefined);
  const [newData, setNewData] = useState<DishCreateBean>({
    title: "",
    description: "",
    price: 0,
    photoURL: "",
  });

  const submitCreate = async () => {
    try {
      if (fileName) {
        uploadImage(fileName);
        const newUrl = await getUrl(fileName);
        const { data, error } = await supabase
          .from("Dish")
          .insert({ ...newData, photoURL: newUrl });
      }
    } catch (error) {
      console.log(error);
    } finally {
      linkTo("/auth/admin");
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setNewData({
      ...newData,
      title: newTitle,
    });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setNewData({
      ...newData,
      description: newDescription,
    });
  };

  const handlePriceChange = (newPrice: string) => {
    setNewData({
      ...newData,
      price: parseFloat(newPrice),
    });
  };

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
        { mediaType: "photo" },
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

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Patiekalo sukūrimas" />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 12,
          paddingBottom: 128,
        }}
      >
        <TextInput
          placeholder="Pavadinimas"
          mode="outlined"
          onChangeText={handleTitleChange}
        />
        <TextInput
          placeholder="Aprašymas"
          mode="outlined"
          onChangeText={handleDescriptionChange}
        />
        <TextInput
          placeholder="Kaina"
          mode="outlined"
          onChangeText={handlePriceChange}
        />
        <TextInput
          label="Įkelti failą"
          value={fileName ? "Failas įkeltas!" : ""}
          placeholder="Įkelkite failą"
          editable={false}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ height: 10 }}></View>
          <Button onPress={uploadPhoto} mode="contained">
            Pridėti patiekalo paveikslėlį
          </Button>
          <View style={{ height: 10 }}></View>
          <Button onPress={submitCreate} mode="contained">
            Sukurti patiekalą
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
