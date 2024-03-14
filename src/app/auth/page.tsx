import { View, StyleSheet } from "react-native";
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

  const hasEmailErrors = () => {
    return !email.includes("@");
  };

  const hasPasswordErrors = () => {
    return password.length < 5;
  };

  const onChangeEmail = (email: string) => setEmail(email);

  const onChangePassword = (password: string) => setPassword(password);

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      const jwtEncoded = data.session?.access_token;
      if (jwtEncoded) {
        const jwt = jwtDecode(jwtEncoded);
        const userRole = jwt.user_role;
        linkTo(`/auth/${userRole}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Authentication" />
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
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={onChangeEmail}
        />
        <HelperText type="error" visible={hasEmailErrors()}>
          {hasEmailErrors() ? "Email needs a @ symbol!" : ""}
        </HelperText>
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={onChangePassword}
        />
        <HelperText type="error" visible={hasPasswordErrors()}>
          {hasPasswordErrors() ? "Password must have at least 5 symbols" : ""}
        </HelperText>
        <Button
          onPress={() => {
            signIn();
          }}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
}
