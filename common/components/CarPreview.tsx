import { Car } from "../types/Car";
import { Flex, Box, Text, Image, Button } from "native-base";

type Props = {
  car: Car;
};

export const CarPreview = ({ car }: Props) => {
  return (
    <Box margin={"4"} bgColor={"blue.200"} p={4} borderRadius={8}>
      <Flex w={"full"} alignItems={"center"} justify={"center"}>
        <Image
          size={"xl"}
          height={"40"}
          width={"100%"}
          src={car.photos?.[0]?.fileUrl}
          borderRadius={8}
          overflow={"hidden"}
        />
      </Flex>
      <Box pt={4}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {car.model}
        </Text>
        <Text color={"gray.600"} fontSize={"md"}>
          {car.manufacturer}
        </Text>
        <Flex w={"full"} pt={2}>
          <Button w={"full"} colorScheme={"blue"} aria-label={"arrow button"}>
            Rent now
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
