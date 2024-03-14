import { ScrollView, View } from "react-native";
import { useLinkTo, useParams } from "../../../../../../charon";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import { supabase } from "../../../../../supabase/supabase";
import { DishBean } from "../../../../../beans/DishBean";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerResponse, launchCamera } from "react-native-image-picker";
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

  const loadImage = async (filePath: string) => {
    try {
      const data = await RNFetchBlob.fs.readFile(filePath, "base64");
      setFileBlob(data);
    } catch (error) {
      console.error("Failed to load image:", error);
    }
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
    <View>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={dish?.title} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 12,
          paddingBottom: 128,
        }}
      >
        <TextInput
          placeholder="Title"
          mode="outlined"
          onChangeText={handleTitleChange}
          value={dish.title}
        />
        <TextInput
          placeholder="Description"
          mode="outlined"
          value={dish.description}
          onChangeText={handleDescriptionChange}
        />
        <TextInput
          placeholder="Price"
          mode="outlined"
          value={dish.price.toString()}
          onChangeText={handlePriceChange}
        />
        <TextInput
          label="Upload File"
          value={fileBlob ? "File uploaded" : ""}
          placeholder="Select a file"
          editable={false}
        />
        <Button
          onPress={uploadPhoto}
          style={{ alignSelf: "flex-end" }}
          mode="contained"
        >
          Įkelti paveikslėlį
        </Button>
        <Button
          onPress={submitUpdate}
          style={{ alignSelf: "flex-end" }}
          mode="contained"
        >
          Atnaujinti patiekalą
        </Button>
        <Button
          onPress={submitDelete}
          style={{ alignSelf: "flex-end" }}
          mode="contained"
        >
          Pašalinti patiekalą
        </Button>
      </ScrollView>
    </View>
  );
}
