import {
  ScrollView,
  Center,
  Spinner,
  Image,
  Box,
  Text,
  Divider,
  Flex,
  Button,
  Spacer,
  Modal,
  useToast,
} from "native-base";
import { useState } from "react";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { useMutation, useQuery } from "react-query";
import { TechnicalInformation } from "../common/components/TechnicalInformation";
import { apiFetcher } from "../common/config/ApiFetcher";
import { Car as CarType } from "../common/types/Car";
import { RootTabScreenProps } from "../types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { useEffect } from "react";
import { useUserContext } from "../common/context/userContext";
import { queryClient } from "../common/config/queryClient";

const CarPhoto = (item: any) => {
  return (
    <Image
      w={"400px"}
      height={"350px"}
      src={item.item.fileUrl}
      alt="car"
    ></Image>
  );
};

type CreateReservationPayload = {
  carForeignKey: number;
  days: string[];
  userId: string;
  price: number;
};

export default function Car({ navigation, route }: RootTabScreenProps<"Car">) {
  const carID = route.params.carId;
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [reservations, setReservations] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState<number>();
  const toast = useToast();
  const { state } = useUserContext();
  const { data, isLoading } = useQuery(["car", carID], () =>
    apiFetcher.get<CarType>(`car/${carID}`)
  );

  const mutation = useMutation(
    (data: CreateReservationPayload) => apiFetcher.post("reservation", data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("reservations");
        await queryClient.invalidateQueries("car");
        navigation.navigate("Dashboard");
      },
    }
  );

  const reservedDays =
    data?.reservations
      .flatMap((reservation) => reservation.days)
      .map((day) => day.slice(0, 10)) ?? [];

  const handleSelectedDate = (date: Date) => {
    const isReserved =
      reservedDays.includes(date.toISOString().slice(0, 10)) ||
      reservations.includes(date.toISOString());

    if (isReserved) {
      toast.show({
        description: "This day is already reserved",
        placement: "top",
        bgColor: "red.500",
      });
      setDatePickerVisible(false);

      return;
    }

    setReservations([...reservations, date.toISOString()]);
    setDatePickerVisible(false);
  };

  useEffect(() => {
    const p = data?.pricing.prices
      .sort((a, b) => (a.days > b.days ? 1 : -1))
      .reverse()
      .find((p) => reservations.length >= p.days)?.price;

    setPrice(p);
  }, [reservations]);

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
        {data && (
          <Carousel
            layout={"default"}
            ref={isCarousel}
            data={data.photos}
            renderItem={CarPhoto}
            itemWidth={400}
            sliderWidth={400}
            layoutCardOffset={18}
            onSnapToItem={(index) => setIndex(index)}
          />
        )}

        <Flex direction="row" mt={"4"} px={"4"}>
          <Text fontWeight={"bold"} color={"gray.700"} pr={4} fontSize={"3xl"}>
            {data?.manufacturer}
          </Text>
          <Divider bg={"gray.400"} orientation={"vertical"} />
          <Text fontWeight={"bold"} color={"gray.500"} pl={4} fontSize={"3xl"}>
            {data?.model}
          </Text>
        </Flex>
        <Box mt={"4"} px={"4"}>
          <Text fontSize={"3xl"}>Description</Text>
          <Text>{data?.description}</Text>
        </Box>

        <Box mt={"4"} px={"4"}>
          <Text fontSize={"3xl"}>Technical information</Text>
          {data && (
            <Box mt={4}>
              <TechnicalInformation car={data} />
            </Box>
          )}
        </Box>
        <Box mt={"4"} p={"4"}>
          <Button onPress={() => setModalOpen(true)}>Reserve</Button>
        </Box>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setReservations([]);
          }}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Select reservation days</Modal.Header>
            <Modal.Body>
              <Flex direction={"row"}>
                <Text fontSize={"lg"} mr={"2"}>
                  Price per day:
                </Text>

                <Text fontSize="lg">
                  {reservations.length > 0 ? price : "-"}
                </Text>

                <Text fontSize={"lg"} ml={"2"}>
                  PLN
                </Text>
              </Flex>
              {reservations.length > 0 ? (
                <Text fontSize={"lg"}>Selected days:</Text>
              ) : (
                <Text fontSize={"lg"}>You have not selected any days</Text>
              )}
              <Box>
                {reservations.map((day) => (
                  <Text key={day}>{format(new Date(day), "MM/dd/yyyy")}</Text>
                ))}
              </Box>
              <Button
                colorScheme={"gray"}
                variant={"subtle"}
                mt={"4"}
                onPress={() => setDatePickerVisible(true)}
              >
                {reservations.length > 0 ? "Select more" : "Select days"}
              </Button>
              {reservations.length > 0 && (
                <Button
                  colorScheme={"green"}
                  mt={"4"}
                  onPress={() => {
                    mutation.mutate({
                      carForeignKey: +carID,
                      days: reservations,
                      price:
                        Number(
                          data?.pricing.prices
                            .reverse()
                            .find((p) => reservations.length >= p.days)?.price
                        ) || Number(data?.pricing.prices[0].price),
                      userId: state.user?.uid as string,
                    });
                  }}
                >
                  Confirm Reservation
                </Button>
              )}
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={"date"}
          onConfirm={handleSelectedDate}
          onCancel={() => setDatePickerVisible(false)}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
