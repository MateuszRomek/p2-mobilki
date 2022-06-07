import { Button, FormControl, Input, VStack, Text, Flex } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { RootTabScreenProps } from "../types";

interface IFormData {
  email: string;
  password: string;
}

export default function LogIn({ navigation }: RootTabScreenProps<"LogIn">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const { signInLocal } = useFirebaseAuth();

  const onSubmit = async (values: IFormData) => {
    try {
      await signInLocal(values.email, values.password);
      navigation.navigate("Dashboard");
    } catch (error) {}
  };

  const handleRegisterNavigation = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView>
      <VStack p={"12"} space={4}>
        <Text fontSize={"4xl"}>RentiCar</Text>
        <Text fontSize={"2xl"}>Log in</Text>
        <FormControl isRequired isInvalid={"firstName" in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Your email"
                onChangeText={(val) => onChange(val)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: "Field is required", minLength: 3 }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={"password" in errors}>
          <FormControl.Label>Password</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                type={"password"}
                onBlur={onBlur}
                placeholder="Your password"
                onChangeText={(val) => onChange(val)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: "Field is required", minLength: 3 }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)}>Submit</Button>

        <Text onPress={handleRegisterNavigation}>
          Don't have an account? Create one here
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
