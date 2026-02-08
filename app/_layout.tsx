import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fdf8fa" },
          animation: "slide_from_right",
        }}
      />
    </AppProvider>
  );
}
