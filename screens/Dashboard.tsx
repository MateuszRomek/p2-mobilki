import {
  Box,
  Center,
  Flex,
  Pressable,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  View,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { apiFetcher } from "../common/config/ApiFetcher";
import { useUserContext } from "../common/context/userContext";
import { Reservation } from "../common/types/Reservation";
import { RootTabScreenProps } from "../types";

export default function Dashboard({
  navigation,
}: RootTabScreenProps<"Dashboard">) {
  const { state } = useUserContext();
  const { data, isLoading } = useQuery("reservations", () =>
    apiFetcher.get<Reservation[]>(`reservation/${state.user?.uid}`)
  );
  const handleReservationNavigation = (reservationId: number) => {
    navigation.navigate("Reservation", {
      reservationId,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <Center>
          <Spinner />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <Flex py={"2"} px={"4"} direction="row">
          <Text fontSize={"2xl"}>RentiCar 🚗</Text>
          <Spacer />
          <Text fontSize={"2xl"}>👋 {state.user?.displayName}</Text>
        </Flex>
        <Text fontSize="2xl" marginTop={"4"} px={"4"}>
          Reservations
        </Text>
        {data?.map((reservation) => (
          <Pressable
            key={reservation.reservationId}
            px={"4"}
            onPress={() =>
              handleReservationNavigation(reservation.reservationId)
            }
          >
            <Flex
              direction={"row"}
              borderWidth="1"
              borderColor="coolGray.200"
              shadow="1"
              bg="coolGray.100"
              p="5"
              rounded="8"
              my={"2"}
            >
              <Text>Reservation: {reservation.id}</Text> <Spacer />
              <Text color={"blue.500"}>
                Total Price: {reservation.price} PLN
              </Text>
            </Flex>
          </Pressable>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}
