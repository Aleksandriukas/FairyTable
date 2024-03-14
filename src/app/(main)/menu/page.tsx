import { Pressable, Text, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { DishBean } from "../../../beans/DishBean";
import { supabase } from "../../../supabase/supabase";
import { Appbar, useTheme } from "react-native-paper";
import { useLinkTo } from "../../../../charon";
import { DishListItem } from "./DishListItem";
import { useMainContext } from "../MainContext";

export default function MainPage() {
  const linkTo = useLinkTo();

  const { colors } = useTheme();

  const { dishes, updateDishes, isLoading } = useMainContext();

  useEffect(() => {
    updateDishes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.Content title="Menu" />
        <Appbar.Action
          onPress={() => {
            linkTo("/auth");
          }}
          icon="account"
        />
      </Appbar.Header>
      <FlatList
        refreshing={isLoading}
        onRefresh={updateDishes}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: colors.outlineVariant }}
            />
          );
        }}
        renderItem={({ item, index }) => (
          <DishListItem data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        data={dishes}
      />
    </View>
  );
}
