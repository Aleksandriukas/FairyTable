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
import { AuthError } from "@supabase/supabase-js";

export default function RegisterChefPage() {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const linkTo = useLinkTo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailEmpty, setErrorEmailEmpty] = useState<boolean>(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState<boolean>(false);
  const [errorEmailFormat, setErrorEmailFormat] = useState<boolean>(false);
  const [errorPasswordFormat, setErrorPasswordFormat] =
    useState<boolean>(false);
  const [errorSigningUp, setErrorSigningUp] = useState<string>("");
  const [succesSignUp, setSuccessSignUp] = useState<boolean>(false);

  const hasErrorEmailFormat = (email: string) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !email.match(re);
  };

  const hasErrorPasswordFormat = (password: string) => {
    return password.length < 6;
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    if (email.length === 0) {
      setErrorEmailEmpty(true);
    } else {
      setErrorEmailEmpty(false);
    }
    if (hasErrorEmailFormat(email)) {
      setErrorEmailFormat(true);
    } else {
      setErrorEmailFormat(false);
    }
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    if (password.length === 0) {
      setErrorPasswordEmpty(true);
    } else {
      setErrorPasswordEmpty(false);
    }
    if (hasErrorPasswordFormat(password)) {
      setErrorPasswordFormat(true);
    } else {
      setErrorPasswordFormat(false);
    }
  };

  const register = async () => {
    if (
      errorEmailEmpty ||
      errorEmailFormat ||
      errorPasswordEmpty ||
      errorPasswordFormat
    ) {
      return;
    }
    setErrorSigningUp("");
    setSuccessSignUp(false);
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw error;
      }
      setSuccessSignUp(true);
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.message === "User already registered") {
          setErrorSigningUp("Naudotojas su šitu el. paštu jau egzistuoja");
        } else {
          setErrorSigningUp(error.message);
        }
      }
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
        />
        <HelperText type="error" visible={errorEmailFormat || errorEmailEmpty}>
          {errorEmailEmpty
            ? "El. paštas yra reikalingas"
            : errorEmailFormat
            ? "El. paštas turi būti x@x.xx formato"
            : ""}
        </HelperText>
        <TextInput
          label="Slaptažodis"
          value={password}
          secureTextEntry
          mode="outlined"
          onChangeText={onChangePassword}
        />
        <HelperText
          type="error"
          visible={errorPasswordFormat || errorPasswordEmpty}
        >
          {errorPasswordEmpty
            ? "Slaptažodis yra reikalingas"
            : errorPasswordFormat
            ? "Slaptažodis turi turėti daugiau negu 6 simbolių"
            : ""}
        </HelperText>

        <Button
          onPress={() => {
            register();
          }}
          mode="contained"
        >
          Užregistruoti šefą
        </Button>
        <HelperText
          type={succesSignUp ? "info" : "error"}
          visible={errorSigningUp.length !== 0 || succesSignUp ? true : false}
        >
          {succesSignUp ? "Sėkmingai užregistruotas" : errorSigningUp}
        </HelperText>
      </View>
    </View>
  );
}
