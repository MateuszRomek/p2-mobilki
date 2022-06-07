/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Center, Spinner } from "native-base";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { useUserContext } from "../common/context/userContext";
import { useOnAuthChange } from "../hooks/useOnAuthChange";

import Dashboard from "../screens/Dashboard";
import LogIn from "../screens/LogIn";
import Register from "../screens/Register";
import Car from "../screens/Car";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootTabScreenProps } from "../types";
import Reservation from "../screens/Reservation";
import CarsList from "../screens/Cars";
import Profile from "../screens/Profile";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  useOnAuthChange();
  const { state } = useUserContext();

  if (state.isLoading === "pending") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        {!state.user && (
          <>
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
        {state.user && (
          <>
            <Stack.Screen
              name="Dashboard"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Reservation" component={Reservation} />
            <Stack.Screen name="Car" component={Car} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<{
  home: undefined;
  cars: undefined;
  profile: undefined;
}>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#0891b2",
      }}
    >
      <BottomTab.Screen
        name="home"
        component={Dashboard}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        })}
      />

      <BottomTab.Screen
        name="cars"
        component={CarsList}
        options={() => ({
          title: "Cars",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={() => ({
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        })}
      />

      {/* <BottomTab.Screen
         name="TabTwo"
         component={TabTwoScreen}
         options={{
           title: "Tab Two",
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       /> */}
    </BottomTab.Navigator>
  );
}

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
