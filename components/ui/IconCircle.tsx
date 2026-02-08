import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/constants/theme";

type IconCircleProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
};

export function IconCircle({
  name,
  size = 28,
  color = Colors.primary,
  backgroundColor = Colors.primaryLight,
}: IconCircleProps) {
  return (
    <View style={[styles.circle, { backgroundColor }]}>
      <MaterialIcons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
