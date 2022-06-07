import { RootTabScreenProps } from "../types";
import { Button, FormControl, Input, VStack, Text, Flex } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import {
  UserContextActions,
  useUserContext,
} from "../common/context/userContext";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Register({
  navigation,
}: RootTabScreenProps<"Register">) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>();
  const { createLocalUser } = useFirebaseAuth();
  const { dispatch } = useUserContext();

  const onSubmit = async (values: IFormData) => {
    try {
      const displayName = `${values.firstName} ${values.lastName}`;

      await createLocalUser(values);
      dispatch({
        type: UserContextActions.SetUserDisplayName,
        payload: displayName,
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <VStack p={"12"} space={4}>
        <Text fontSize={"4xl"}>RentiCar</Text>
        <Text fontSize={"2xl"}>Register</Text>
        <FormControl isRequired isInvalid={"firstName" in errors}>
          <FormControl.Label>First Name</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="First name"
                onChangeText={(val) => onChange(val)}
                value={value}
              />
            )}
            name="firstName"
            rules={{ required: "Field is required", minLength: 3 }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.firstName?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"lastName" in errors}>
          <FormControl.Label>Last name</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Last name"
                onChangeText={(val) => onChange(val)}
                value={value}
              />
            )}
            name="lastName"
            rules={{ required: "Field is required", minLength: 3 }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.lastName?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={"email" in errors}>
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

        <Button isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Submit
        </Button>

        <Text onPress={() => navigation.navigate("LogIn")}>
          Already have an account? Sign in here
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
