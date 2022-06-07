import {
  ScrollView,
  Flex,
  Text,
  Spacer,
  Spinner,
  Center,
  Link,
  Pressable,
  Button,
  Modal,
  Select,
  Input,
} from "native-base";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { CarPreview } from "../common/components/CarPreview";
import { apiFetcher } from "../common/config/ApiFetcher";
import { carBrands } from "../common/constants/car-brands";
import { Car } from "../common/types/Car";
import { RootTabScreenProps } from "../types";

export default function CarsList({ navigation }: RootTabScreenProps<"Cars">) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    manufacturer: "",
    carPower: "",
    gearbox: "",
    drive: "",
  });

  const { data, isLoading, isFetching } = useQuery("cars", () =>
    apiFetcher.get<Car[]>("car")
  );

  if (isLoading || isFetching) {
    <SafeAreaView>
      <Center>
        <Spinner />
      </Center>
    </SafeAreaView>;
  }

  //  XD
  const cars = data
    ?.filter((car) => car.photos.length > 0 && car.isActive)
    .filter((car) => {
      let isSameManufacturer = true;
      let isSameGearbox = true;
      let isEnoughPpower = true;
      let isCorrectDrive = true;

      if (filters.manufacturer) {
        isSameManufacturer =
          filters.manufacturer.toLowerCase() === car.manufacturer.toLowerCase();
      }

      if (filters.gearbox) {
        isSameGearbox =
          filters.gearbox.toLowerCase() === car.gearBox.toLowerCase();
      }

      if (filters.carPower) {
        isEnoughPpower = +car.power >= +filters.carPower;
      }

      if (filters.drive) {
        isCorrectDrive =
          car.drive.toLowerCase() === filters.drive.toLowerCase();
      }

      return (
        isSameManufacturer && isSameGearbox && isEnoughPpower && isCorrectDrive
      );
    });

  return (
    <ScrollView>
      <SafeAreaView>
        <Flex py={"2"} px={"4"} direction="row">
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            RentiCar 🚗
          </Text>
          <Spacer />
          <Button variant={"outline"} onPress={() => setModalOpen(true)}>
            Filters
          </Button>
        </Flex>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Filters</Modal.Header>
            <Modal.Body>
              <Text mt="2">Car manufacturer</Text>
              <Select
                selectedValue={filters.manufacturer}
                onValueChange={(value) =>
                  setFilters({ ...filters, manufacturer: value })
                }
              >
                {carBrands.map((carBrand) => (
                  <Select.Item
                    key={carBrand.name}
                    label={carBrand.name}
                    value={carBrand.name}
                  />
                ))}
              </Select>

              <Text mt="2">Car power</Text>
              <Input
                value={filters.carPower}
                onChangeText={(val) =>
                  setFilters({ ...filters, carPower: val })
                }
              />

              <Text mt="2">Gearbox</Text>
              <Select
                selectedValue={filters.gearbox}
                onValueChange={(value) =>
                  setFilters({ ...filters, gearbox: value })
                }
              >
                {["automatic", "manual"].map((gearbox) => (
                  <Select.Item key={gearbox} label={gearbox} value={gearbox} />
                ))}
              </Select>

              <Text mt="2">Drive</Text>
              <Select
                selectedValue={filters.drive}
                onValueChange={(value) =>
                  setFilters({ ...filters, drive: value })
                }
              >
                {["RWD", "AWD"].map((drive) => (
                  <Select.Item key={drive} label={drive} value={drive} />
                ))}
              </Select>

              <Button mt="4" onPress={() => setModalOpen(false)}>
                Show results
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <Pressable
              key={car.carId}
              onPress={() => navigation.navigate("Car", { carId: car.carId })}
            >
              <CarPreview car={car} />
            </Pressable>
          ))
        ) : (
          <Center mt="2">
            <Text fontSize={"xl"}>No matches found</Text>
          </Center>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
