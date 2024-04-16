import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { useLinkTo } from "../../../charon";
import { useState } from "react";
import { supabase } from "../../supabase/supabase";
import {
  HelperText,
  TextInput,
  Button,
  Appbar,
  useTheme,
} from "react-native-paper";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export default function AuthPage() {
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
  const [errorSigningIn, setErrorSigningIn] = useState<boolean>(false);

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

  const signIn = async () => {
    if (
      errorEmailEmpty ||
      errorEmailFormat ||
      errorPasswordEmpty ||
      errorPasswordFormat
    ) {
      return;
    }
    setErrorSigningIn(false);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      const jwtEncoded = data.session?.access_token;
      if (jwtEncoded) {
        const jwt = jwtDecode(jwtEncoded);
        const userRole = jwt.user_role;
        linkTo(`/auth/${userRole}`);
      }
    } catch (error) {
      setErrorSigningIn(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Prisijungimas" />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          mode="outlined"
          label="Paštas"
          value={email}
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
          mode="outlined"
          label="Slaptažodis"
          secureTextEntry
          value={password}
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
          mode="contained"
          onPress={() => {
            signIn();
          }}
        >
          Prisijungti
        </Button>
        <HelperText type="error" visible={errorSigningIn}>
          {errorSigningIn ? "Įvesti neteisingi duomenys" : ""}
        </HelperText>
      </KeyboardAvoidingView>
    </View>
  );
}
