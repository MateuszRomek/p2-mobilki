import { View, Text, Button, Flex, Spacer } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../common/context/userContext";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { RootTabParamList, RootTabScreenProps } from "../types";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const { state } = useUserContext();
  const { signOutUser } = useFirebaseAuth();

  return (
    <SafeAreaView>
      <View p={"4"}>
        <Flex direction="row">
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            RentiCar 🚗
          </Text>
          <Spacer />
        </Flex>

        <Text mt="8" fontSize={"xl"}>
          Name: {state.user?.displayName}
        </Text>
        <Text mt={"4"} fontSize={"xl"}>
          Email: {state.user?.email}
        </Text>
        <Button mt={"4"} onPress={signOutUser}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}
