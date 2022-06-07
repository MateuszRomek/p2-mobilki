import {
  Center,
  ScrollView,
  Spinner,
  Text,
  Box,
  Flex,
  Divider,
  HStack,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { apiFetcher } from "../common/config/ApiFetcher";
import { RootTabScreenProps } from "../types";
import { Reservation as ResertvationType } from "../common/types/Reservation";
import { Car } from "../common/types/Car";
import { TechnicalInformation } from "../common/components/TechnicalInformation";
import { format } from "date-fns";
import { queryClient } from "../common/config/queryClient";

export default function Reservation({
  navigation,
  route,
}: RootTabScreenProps<"Reservation">) {
  const { data, isLoading, isError } = useQuery(
    `${route.params?.reservationId}-reservation`,
    () =>
      apiFetcher.get<ResertvationType>(
        `reservation/${route.params?.reservationId}`
      ),

    { enabled: !!route.params?.reservationId }
  );
  const {
    data: carData,
    isLoading: isCarLoading,
    isError: isCarError,
  } = useQuery(
    `${data?.carForeignKey}-car`,
    () => apiFetcher.get<Car>(`car/${data?.carForeignKey}`),

    { enabled: !!data?.carForeignKey }
  );

  const mutation = useMutation(
    (reservationId: string) => {
      return apiFetcher.delete(`reservation/${reservationId}`);
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("reservations");
        navigation.navigate("Dashboard");
      },
    }
  );

  if (isLoading || isCarLoading) {
    return (
      <SafeAreaView>
        <Center>
          <Spinner />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text px={"4"} fontSize="3xl">
          Reservation {data?.reservationId}
        </Text>

        <Box mt={"4"} px={"4"}>
          <Flex direction={"row"}>
            <Text fontSize={"xl"} mr={"2"}>
              Price per day:
            </Text>
            <Text fontWeight={"bold"} fontSize={"xl"} color={"blue.500"}>
              {data?.price} PLN
            </Text>
          </Flex>
          <Flex direction="row">
            <Text fontSize={"xl"} mr={"2"}>
              Total amount:
            </Text>
            {data && (
              <Text fontWeight={"bold"} fontSize={"xl"} color={"blue.500"}>
                {Math.round(data.price * data.days.length)} PLN
              </Text>
            )}
          </Flex>

          <Flex mt={"8"} alignItems={"center"} direction="row">
            <Text fontWeight={"bold"} fontSize={"xl"} mr={"4"}>
              Reserved car:
            </Text>
            <Text mr={"2"} fontSize={"xl"}>
              {carData?.manufacturer}
            </Text>
            <Divider bg={"gray.400"} mr={"2"} orientation={"vertical"} />
            <Text fontSize={"xl"}>{carData?.model}</Text>
          </Flex>

          <Box>
            <Text mt={"4"} fontSize={"xl"}>
              Car details
            </Text>
            <Box mt={"2"}>
              {carData && <TechnicalInformation car={carData} />}
            </Box>
          </Box>

          <Text mt="4" fontSize={"xl"} mr={"2"} mb={"2"}>
            Selected days
          </Text>
          <Box>
            {data?.days.map((day) => (
              <Text key={day}>{format(new Date(day), "MM/dd/yyyy")}</Text>
            ))}
          </Box>

          <Button
            mt={"4"}
            colorScheme={"secondary"}
            onPress={() => mutation.mutate(`${route.params?.reservationId}`)}
          >
            Cancel
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
