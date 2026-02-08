import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconCircle } from "@/components/ui/IconCircle";
import { useApp } from "@/context/AppContext";
import { OnboardingData } from "@/constants/types";

type GoalOption = {
  id: OnboardingData["goal"];
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const goals: GoalOption[] = [
  {
    id: "track_cycle",
    title: "Track Cycle",
    subtitle: "Understand your rhythm",
    icon: "local-florist",
  },
  {
    id: "plan_pregnancy",
    title: "Plan Pregnancy",
    subtitle: "Find your fertile window",
    icon: "child-care",
  },
  {
    id: "health_insights",
    title: "Health Insights",
    subtitle: "Deep dive into symptoms",
    icon: "auto-awesome",
  },
];

export default function SelectGoalScreen() {
  const router = useRouter();
  const { setOnboardingData, onboardingData } = useApp();
  const [selected, setSelected] = useState<OnboardingData["goal"]>(
    onboardingData.goal || "track_cycle"
  );

  const handleContinue = () => {
    setOnboardingData({ goal: selected });
    router.push("/onboarding/cycle-length");
  };

  return (
    <View style={styles.container}>
      <Header showBack stepText="Step 3 of 5" />
      <ProgressDots total={5} current={2} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{"What's your goal?"}</Text>
        <Text style={styles.subtitle}>
          {"We'll customize your experience based on your needs."}
        </Text>

        <View style={styles.cards}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              onPress={() => setSelected(goal.id)}
              activeOpacity={0.8}
            >
              <Card selected={selected === goal.id}>
                <View style={styles.cardContent}>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{goal.title}</Text>
                    <Text style={styles.cardSubtitle}>{goal.subtitle}</Text>
                  </View>
                  <IconCircle name={goal.icon} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} />
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    paddingTop: Spacing.xxxl,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: "#896175",
    textAlign: "center",
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xxxl,
  },
  cards: {
    gap: Spacing.lg,
    marginTop: Spacing.xxxl,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.lg,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  cardSubtitle: {
    fontSize: FontSize.md,
    color: "#896175",
  },
  footer: {
    padding: Spacing.xxl,
    paddingBottom: 40,
  },
});
