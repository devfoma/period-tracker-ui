import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function NotificationsScreen() {
  const router = useRouter();
  const { setOnboardingData, completeOnboarding } = useApp();

  const handleEnable = () => {
    setOnboardingData({ notificationsEnabled: true });
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    setOnboardingData({ notificationsEnabled: false });
    completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <ProgressDots total={5} current={4} />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.outerCircle}>
          {/* Dashed ring */}
          <View style={styles.dashedRing} />
          {/* Inner card */}
          <View style={styles.iconCard}>
            <MaterialIcons name="notifications-active" size={80} color={Colors.primary} />
            {/* Gift badge */}
            <View style={styles.badge}>
              <MaterialIcons name="card-giftcard" size={22} color={Colors.white} />
            </View>
          </View>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textSection}>
        <Text style={styles.title}>Never be surprised again.</Text>
        <Text style={styles.subtitle}>
          Enable notifications for period predictions and health tips tailored for you.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button title="Enable Notifications" onPress={handleEnable} />
        <TouchableOpacity style={styles.laterButton} onPress={handleSkip}>
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 60,
  },
  heroSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(249, 6, 128, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  dashedRing: {
    position: "absolute",
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(249, 6, 128, 0.1)",
  },
  iconCard: {
    width: 192,
    height: 192,
    borderRadius: BorderRadius.xxl,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  badge: {
    position: "absolute",
    top: -12,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ rotate: "12deg" }],
  },
  textSection: {
    paddingHorizontal: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: "rgba(24, 17, 20, 0.6)",
    textAlign: "center",
    marginTop: Spacing.lg,
    lineHeight: 26,
  },
  actions: {
    paddingHorizontal: Spacing.xxxl,
    paddingBottom: 50,
    gap: Spacing.md,
  },
  laterButton: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  laterText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: "rgba(24, 17, 20, 0.4)",
  },
});
