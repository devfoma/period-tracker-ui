import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? Colors.white : Colors.primary} />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  secondary: {
    backgroundColor: Colors.primaryLight,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  size_sm: {
    height: 40,
    paddingHorizontal: Spacing.lg,
  },
  size_md: {
    height: 48,
    paddingHorizontal: Spacing.xl,
  },
  size_lg: {
    height: 56,
    paddingHorizontal: Spacing.xxl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: FontWeight.bold,
  },
  text_primary: {
    color: Colors.white,
    fontSize: FontSize.lg,
  },
  text_secondary: {
    color: Colors.primary,
    fontSize: FontSize.base,
  },
  text_ghost: {
    color: Colors.textSecondary,
    fontSize: FontSize.base,
  },
  text_outline: {
    color: Colors.primary,
    fontSize: FontSize.base,
  },
  textSize_sm: {
    fontSize: FontSize.md,
  },
  textSize_md: {
    fontSize: FontSize.base,
  },
  textSize_lg: {
    fontSize: FontSize.lg,
  },
  textDisabled: {
    opacity: 0.5,
  },
});
