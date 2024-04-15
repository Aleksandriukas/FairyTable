import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
import { useParams } from "../../../../../../../../charon";
import {
  Appbar,
  Icon,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../../../../../supabase/supabase";
import { ChatBean } from "../../../../../../../beans/ChatBean";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeOut } from "react-native-reanimated";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ChatPage({ children }: PropsWithChildren<{}>) {
  const { chat_id } = useParams();

  const { colors } = useTheme();

  const [uuid, setUuid] = useState("");

  const flatListRef = useRef<FlatList>(null);

  const { goBack } = useNavigation();

  const [chat, setChat] = useState<ChatBean[]>([]);

  const [message, setMessage] = useState("");

  const [visible, setVisible] = useState(false);

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: `chat${chat_id}` },
      (payload) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        console.log("test", payload);
        setChat((old) => [payload.new as ChatBean, ...old]);
      }
    )
    .subscribe();

  const sendMessage = async (content: string) => {
    const id = await AsyncStorage.getItem("uuid");
    try {
      console.log(id);
      const { data, error, status } = await supabase
        .from(`chat${chat_id}`)
        .insert([{ custumerId: id, content: content }]);
      if (error) {
        throw error;
      }
      setMessage("");
    } catch (error) {
      setVisible(true);
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const loadChat = async () => {
    try {
      let { data, error } = await supabase
        .from(`chat${chat_id}`)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      setChat(data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setVisible(true);
      console.log(error);
    }
  };

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadUuid = async () => {
      const id = await AsyncStorage.getItem("uuid");
      setUuid(id ?? "");
    };
    loadUuid();
    loadChat();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -insets.bottom : 0}
      style={{ flex: 1 }}
    >
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={`Chat ${chat_id}`} />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        {isLoading && (
          <Animated.View
            exiting={FadeOut}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: colors.surface,
              zIndex: 4,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large"></ActivityIndicator>
          </Animated.View>
        )}
        <FlatList
          keyExtractor={(item: ChatBean) => item.id.toString()}
          inverted
          ref={flatListRef}
          snapToEnd={true}
          contentContainerStyle={{
            gap: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
          data={chat}
          renderItem={({ item, index }) => {
            const renderName =
              index === chat.length - 1 ||
              chat[index + 1].custumerId !== item.custumerId;

            const isSameId = item.custumerId === uuid;

            return (
              <ChatItem
                isSameId={isSameId}
                renderName={renderName}
                custumerId={item.custumerId}
                content={item.content}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.primaryContainer,
          width: "100%",
          paddingBottom: insets.bottom + 8,
          flexDirection: "row",
          paddingLeft: 8,
          paddingTop: 8,
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          mode="outlined"
          // multiline
          contentStyle={{ alignContent: "center" }}
          style={{ flex: 1, lineHeight: 24, maxHeight: 96 }}
        />
        <IconButton
          iconColor={
            !isLoading && message.length > 0 ? colors.primary : undefined
          }
          pointerEvents={!isLoading && message.length > 0 ? "auto" : "none"}
          onPress={() => {
            sendMessage(message);
          }}
          style={{ alignSelf: "center" }}
          size={24}
          icon="send"
        ></IconButton>
      </View>
      <Snackbar
        style={{ marginBottom: insets.bottom + 32 }}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          textColor: colors.primary,
          label: "Retry",
          onPress: () => {
            sendMessage(message);
          },
        }}
      >
        Failed to send message
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const ChatItem = ({
  content,
  custumerId,
  renderName = true,
  isSameId,
}: {
  content: string;
  custumerId: string;
  renderName: boolean;
  isSameId: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: isSameId ? "flex-end" : "flex-start",
      }}
    >
      <View style={{ width: "100%" }}>
        {!isSameId && renderName && (
          <Text variant="bodySmall" style={{ paddingLeft: 4 }}>
            {custumerId.slice(0, 4)}
          </Text>
        )}
        <Text
          style={{
            backgroundColor: isSameId
              ? colors.primary
              : colors.secondaryContainer,
            paddingVertical: 6,
            color: isSameId ? colors.onPrimary : colors.onSecondaryContainer,
            paddingHorizontal: 10,
            maxWidth: "80%",
            alignSelf: isSameId ? "flex-end" : "flex-start",
          }}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};
