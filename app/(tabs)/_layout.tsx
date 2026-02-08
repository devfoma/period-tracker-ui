import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, BorderRadius } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: Platform.OS === "ios" ? 88 : 70,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#8c5f75",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "home" : "home"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-month" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.fabButton}>
              <MaterialIcons name="add" size={30} color={Colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="insights" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 4,
    borderColor: Colors.background,
  },
});
