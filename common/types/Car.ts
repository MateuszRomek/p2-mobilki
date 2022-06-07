import { PromoPrice } from "./PromoPrice";
import { Reservation } from "./Reservation";

export enum CarGearBox {
  Manual = "manual",
  Automatic = "automatic",
}

export enum CarStatus {
  Hidden,
  Published,
}

export interface Car {
  carId: number;
  id: number;
  manufacturer: string;
  model: string;
  power: string;
  drive: string;
  maxSpeed: string;
  acceleration: string;
  engine: string;
  description: string;
  gearBox: CarGearBox;
  isActive: boolean;
  images?: string[];
  rentalId: number;
  price?: PromoPrice[]; //TODO delete
  pricing: { pricingId: number; carForeignKey: number; prices: PromoPrice[] };
  reservations: Reservation[];
  rental?: null;
  photos: {
    photoId: number;
    name: string;
    fileUrl: string;
  }[];
}

export type CarId = string | number;
