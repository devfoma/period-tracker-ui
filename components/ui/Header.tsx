import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";

type HeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  stepText?: string;
};

export function Header({
  title,
  subtitle,
  showBack = false,
  rightAction,
  stepText,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={22} color={Colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
        <View style={styles.center}>
          {stepText ? (
            <Text style={styles.stepText}>{stepText}</Text>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightAction || <View style={styles.spacer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: 44,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: 2,
  },
  stepText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
