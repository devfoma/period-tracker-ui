import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing } from "@/constants/theme";

type ProgressDotsProps = {
  total: number;
  current: number;
};

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 32,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: Colors.primaryLight,
  },
});
