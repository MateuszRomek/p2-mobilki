import { StatusBar } from "expo-status-bar";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { queryClient } from "./common/config/queryClient";
import { UserContextProvider } from "./common/context/userContext";
import Navigation from "./navigation";

const extendedTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={extendedTheme}>
        <UserContextProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </UserContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
