import { FlatList, View } from "react-native";
import { useLinkTo } from "../../../../charon";
import { supabase } from "../../../supabase/supabase";
import { Appbar, HelperText, IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { DishBean } from "../../../beans/DishBean";
import { DishCRUDListItem } from "./DishCRUDListItem";
import { PostgrestError } from "@supabase/supabase-js";

export default function AdminPage() {
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  const [dishes, setDishes] = useState<DishBean[] | undefined>(undefined);
  const [errorFetching, setErrorFetching] = useState("");

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase.from("Dish").select("*");
      if (error) {
        throw error;
      }
      setDishes(data);
    } catch (e) {
      setErrorFetching("Nėra duomenų");
    }
  };
  useEffect(() => {
    fetchDishes();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      linkTo("/menu");
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const createDish = () => {
    linkTo("/auth/admin/dish/create");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Admin" />
        <Appbar.Action onPress={fetchDishes} icon="reload" />
        <Appbar.Action onPress={createDish} icon="upload" />
        <Appbar.Action
          onPress={() => {
            linkTo("/auth/admin/registerChef");
          }}
          icon="script-text-key"
        />
        <Appbar.Action onPress={signOut} icon="exit-to-app" />
      </Appbar.Header>
      <FlatList
        contentContainerStyle={{ height: "100%" }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.outlineVariant }}
            />
          );
        }}
        renderItem={({ item, index }) => (
          <DishCRUDListItem data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        data={dishes}
      />
      <HelperText
        type="error"
        visible={errorFetching.length === 0 ? true : false}
      >
        {errorFetching}
      </HelperText>
    </View>
  );
}
