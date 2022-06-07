import { Car } from "../types/Car";

export function extractTechnicalCarInfo(
  car: Car
): Omit<
  Car,
  | "id"
  | "description"
  | "isActive"
  | "rentalId"
  | "images"
  | "carId"
  | "reservations"
  | "rental"
  | "pricing"
  | "photos"
> {
  const {
    manufacturer,
    model,
    power,
    drive,
    maxSpeed,
    acceleration,
    engine,
    gearBox,
  } = car;

  return {
    manufacturer,
    model,
    power,
    drive,
    maxSpeed,
    acceleration,
    engine,
    gearBox,
  };
}
