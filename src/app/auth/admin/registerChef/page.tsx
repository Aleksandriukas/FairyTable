import {
  Pressable,
  Text,
  AppState,
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { useLinkTo } from "../../../../../charon";
import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/supabase";
import { Image } from "react-native-elements";
import {
  HelperText,
  TextInput,
  Button,
  Appbar,
  useTheme,
} from "react-native-paper";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export default function RegisterChefPage() {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const hasEmailErrors = () => {
    return !email.includes("@");
  };

  const hasPasswordErrors = () => {
    return password.length < 6;
  };

  const onChangeEmail = (email: string) => setEmail(email);

  const onChangePassword = (password: string) => setPassword(password);

  const register = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Šefų registravimas" />
      </Appbar.Header>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          label="El. paštas"
          value={email}
          mode="outlined"
          onChangeText={onChangeEmail}
          onBlur={() => {
            setEmailError(hasEmailErrors());
          }}
        />
        <HelperText type="error" visible={emailError}>
          {"El. paštui reikalingas simbolis @!"}
        </HelperText>
        <TextInput
          label="Slaptažodis"
          value={password}
          secureTextEntry
          mode="outlined"
          onChangeText={onChangePassword}
          onBlur={() => {
            setPasswordError(hasPasswordErrors());
          }}
        />
        <HelperText type="error" visible={passwordError}>
          {"Slaptažodis turi turėti mažiausiai 5 simbolius"}
        </HelperText>

        <Button
          onPress={() => {
            register();
          }}
          mode="contained"
        >
          Užregistruoti šefą
        </Button>
      </View>
    </View>
  );
}
