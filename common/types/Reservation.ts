export interface Reservation {
  reservationId: number;
  userId: string;
  days: string[];
  price: number;
  carForeignKey: number;
  id: number;
}

export interface CreateResveration {
  rentalId: string;
  carId: string;
  days: Date[];
  price: number;
  userId: string;
}
