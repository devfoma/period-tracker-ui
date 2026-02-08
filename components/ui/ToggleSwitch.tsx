import React from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import { Colors } from "@/constants/theme";

type ToggleSwitchProps = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export function ToggleSwitch({ value, onToggle }: ToggleSwitchProps) {
  return (
    <TouchableOpacity
      style={[styles.track, value && styles.trackActive]}
      onPress={() => onToggle(!value)}
      activeOpacity={0.8}
    >
      <View
        style={[styles.thumb, value && styles.thumbActive]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#e2d5da",
    padding: 2,
    justifyContent: "center",
  },
  trackActive: {
    backgroundColor: Colors.primary,
  },
  thumb: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbActive: {
    transform: [{ translateX: 20 }],
  },
});
