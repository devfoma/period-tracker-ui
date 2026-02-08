import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { ProgressDots } from "@/components/ui/ProgressDots";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#fff5f8", "#ffe4f0"]}
      style={styles.container}
    >
      {/* Skip Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/last-period")}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Illustration */}
      <View style={styles.heroContainer}>
        <View style={styles.illustrationBox}>
          <LinearGradient
            colors={["#fce4ec", "#f8bbd0", "#f48fb1"]}
            style={styles.illustrationGradient}
          >
            <View style={styles.circleGroup}>
              <View style={[styles.avatarCircle, { backgroundColor: "#d4a574", top: 20, left: 30 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: "#8d5524", top: 10, left: 80 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: "#f5cba7", top: 40, left: 55 }]} />
              <View style={[styles.avatarCircle, { backgroundColor: "#6b3a2a", top: 25, left: 120 }]} />
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Welcome to Her Circle</Text>
        <Text style={styles.subtitle}>
          Your personal guide to understanding your body and cycle with love.
        </Text>
      </View>

      {/* Progress Dots */}
      <ProgressDots total={3} current={0} />

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Get Started"
          onPress={() => router.push("/onboarding/last-period")}
        />
        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginHighlight}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
  },
  skipButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  skipText: {
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.md,
  },
  heroContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxl,
  },
  illustrationBox: {
    width: width - 48,
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  illustrationGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleGroup: {
    width: 200,
    height: 200,
    position: "relative",
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  textSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.xxxl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: 36,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
    color: "rgba(24, 17, 20, 0.7)",
    textAlign: "center",
    marginTop: Spacing.lg,
    lineHeight: 26,
    maxWidth: 300,
  },
  actions: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: 50,
    gap: Spacing.lg,
  },
  loginLink: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  loginText: {
    color: "rgba(24, 17, 20, 0.6)",
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
  loginHighlight: {
    color: Colors.primary,
  },
});
