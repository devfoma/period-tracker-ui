import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  selected?: boolean;
};

export function Card({ children, style, selected = false }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        selected && styles.selected,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(249, 6, 128, 0.03)",
    shadowOpacity: 0.15,
  },
});
