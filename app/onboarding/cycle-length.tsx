import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import Slider from "@react-native-community/slider";

export default function CycleLengthScreen() {
  const router = useRouter();
  const { setOnboardingData, onboardingData } = useApp();
  const [cycleLength, setCycleLength] = useState(onboardingData.cycleLength || 28);

  const handleContinue = () => {
    setOnboardingData({ cycleLength });
    router.push("/onboarding/notifications");
  };

  return (
    <View style={styles.container}>
      <Header showBack />
      <View style={styles.headerCenter}>
        <Text style={styles.headerLabel}>Personalization</Text>
      </View>
      <ProgressDots total={5} current={3} />

      <View style={styles.content}>
        <Text style={styles.title}>How long is your cycle usually?</Text>
        <Text style={styles.subtitle}>
          Knowing your cycle length helps us predict your fertile window and next period accurately.
        </Text>

        {/* Value Display */}
        <View style={styles.valueContainer}>
          <View style={styles.valueBox}>
            <Text style={styles.valueNumber}>{cycleLength}</Text>
            <Text style={styles.valueLabel}>Days</Text>
          </View>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${((cycleLength - 21) / (45 - 21)) * 100}%` },
              ]}
            />
            <View
              style={[
                styles.sliderThumb,
                { left: `${((cycleLength - 21) / (45 - 21)) * 100}%` },
              ]}
            />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>21 Days</Text>
            <Text style={styles.sliderLabel}>30 Days</Text>
            <Text style={styles.sliderLabel}>45 Days</Text>
          </View>

          {/* Invisible slider on top for touch handling */}
          {Platform.OS === "web" ? (
            <input
              type="range"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e: any) => setCycleLength(Number(e.target.value))}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 40,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          ) : null}
        </View>

        <Text style={styles.helperText}>
          {"Don't worry, you can always change this later in settings."}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          icon={
            <MaterialIcons name="arrow-forward" size={20} color={Colors.white} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  headerCenter: {
    alignItems: "center",
    marginTop: -40,
    marginBottom: 8,
  },
  headerLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: "rgba(249, 6, 128, 0.6)",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    paddingTop: Spacing.xxl,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: "rgba(24, 17, 20, 0.7)",
    textAlign: "center",
    marginTop: Spacing.sm,
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.massive,
  },
  valueBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 40,
    paddingVertical: Spacing.xxl,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  valueNumber: {
    fontSize: 48,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: -1,
  },
  valueLabel: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.primaryMuted,
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  sliderContainer: {
    paddingHorizontal: Spacing.lg,
    position: "relative",
  },
  sliderTrack: {
    height: 8,
    backgroundColor: "#e6dbe0",
    borderRadius: 4,
    position: "relative",
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  sliderThumb: {
    position: "absolute",
    top: -12,
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
  sliderLabel: {
    fontSize: FontSize.xs,
    color: "rgba(24, 17, 20, 0.4)",
    fontWeight: FontWeight.medium,
  },
  helperText: {
    fontSize: FontSize.sm,
    color: "rgba(24, 17, 20, 0.5)",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: Spacing.xxxl,
  },
  footer: {
    padding: Spacing.xxl,
    paddingBottom: 40,
  },
});
