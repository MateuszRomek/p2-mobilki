import { Car } from "../types/Car";
import { VStack, Box, Text, Flex, Spacer } from "native-base";
import { extractTechnicalCarInfo } from "../helpers/extractTechnicalCarInfo";
type Props = {
  car: Car;
};

export const TechnicalInformation = ({ car }: Props) => {
  return (
    <VStack alignItems={"flex-start"}>
      {Object.entries(extractTechnicalCarInfo(car)).map(
        ([key, value], index) => (
          <Flex
            key={key}
            maxW={"md"}
            w={"full"}
            bgColor={index % 2 === 0 ? "gray.100" : "blue.200"}
            px={4}
            py={2}
            borderRadius={"8"}
            direction={"row"}
          >
            <Text fontWeight={"bold"}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <Spacer />
            <Text>{value}</Text>
          </Flex>
        )
      )}
    </VStack>
  );
};
