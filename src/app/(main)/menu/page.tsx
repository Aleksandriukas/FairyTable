import { FlatList, View } from "react-native";
import { useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { Appbar, useTheme } from "react-native-paper";
import { useLinkTo } from "../../../../charon";
import { DishListItem } from "./DishListItem";
import { useMainContext } from "../MainContext";
import { jwtDecode } from "jwt-decode";
export default function MainPage() {
  const linkTo = useLinkTo();

  const { colors } = useTheme();

  const { dishes, updateDishes, isLoading } = useMainContext();

  useEffect(() => {
    updateDishes();
  }, []);

  const checkSession = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const jwtEncoded = session.access_token;
        if (jwtEncoded) {
          const jwt = jwtDecode(jwtEncoded);
          const userRole = jwt.user_role;
          linkTo(`/auth/${userRole}`);
        } else {
          linkTo("/auth");
        }
      } else {
        linkTo("/auth");
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.Content title="Meniu" />
        <Appbar.Action onPress={checkSession} icon="account" />
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
          <DishListItem id={index.toString()} data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        data={dishes}
      />
    </View>
  );
}
