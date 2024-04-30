import { PropsWithChildren, useState } from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  Dialog,
  DialogProps,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { useLinkTo, useParams } from "../../../../../../charon";
import { useMainContext } from "../../../MainContext";
import { useNavigation } from "@react-navigation/native";

export const TopAppBar = ({ hasGoBack = false }: { hasGoBack?: boolean }) => {
  const [visible, setVisible] = useState(false);

  const { colors } = useTheme();

  const { no_id } = useParams();

  const { goBack } = useNavigation();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
        {hasGoBack && <Appbar.BackAction onPress={goBack} />}
        <Appbar.Content id="" title={`No:. ${no_id}`} />
        <Appbar.Action
          onPress={() => {
            setVisible(true);
          }}
          icon="logout"
        />
      </Appbar.Header>
      <ConfirmationDialog
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};

const ConfirmationDialog = (props: Omit<DialogProps, "children">) => {
  const { deleteCart } = useMainContext();

  const linkTo = useLinkTo();

  const endSession = () => {
    props.onDismiss?.();
    deleteCart();
    linkTo("/menu");
  };

  return (
    <Portal>
      <Dialog {...props}>
        <Dialog.Content>
          <Text>Ar tikrai norite baigti seansą?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              props.onDismiss?.();
            }}
          >
            Ne
          </Button>
          <Button onPress={endSession}>Taip</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
