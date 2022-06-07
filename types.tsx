/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  NotFound: undefined;
  LogIn: undefined;
  Register: undefined;
  Dashboard: undefined;
  Reservation: { reservationId: number } | undefined;
  Cars: undefined;
  Car: { carId: number };
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  LogIn: undefined;
  Register: undefined;
  Dashboard: undefined;
  Reservation: { reservationId: number } | undefined;
  Cars: undefined;
  Car: { carId: number };
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
