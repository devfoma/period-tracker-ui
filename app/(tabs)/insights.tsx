import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import {
  getCycleDay,
  getCyclePhase,
  getPhaseLabel,
  getPhaseInsight,
  getCycleProgress,
} from "@/utils/cycle";

export default function InsightsScreen() {
  const { onboardingData, dailyLogs } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;
  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);
  const progress = getCycleProgress(cycleDay, cycleLength);

  const insights = [
    {
      icon: "favorite" as const,
      label: "CYCLE HEALTH",
      title: getPhaseLabel(phase),
      body: getPhaseInsight(phase),
      color: Colors.primary,
    },
    {
      icon: "water-drop" as const,
      label: "HYDRATION",
      title: "Stay Hydrated",
      body: "Aim for 8-10 glasses of water today. Proper hydration helps reduce bloating and headaches.",
      color: Colors.blue,
    },
    {
      icon: "bedtime" as const,
      label: "SLEEP",
      title: "Rest Well",
      body: "During this phase, you may need 7-9 hours of quality sleep. Try winding down an hour before bed.",
      color: Colors.indigo,
    },
    {
      icon: "fitness-center" as const,
      label: "EXERCISE",
      title: phase === "menstrual" ? "Gentle Movement" : "Active Day",
      body: phase === "menstrual"
        ? "Light yoga or walking is ideal during your period. Listen to your body."
        : "Your energy levels support moderate to high intensity workouts today!",
      color: Colors.green,
    },
    {
      icon: "restaurant" as const,
      label: "NUTRITION",
      title: "Fuel Your Body",
      body: "Focus on iron-rich foods and leafy greens. Magnesium-rich snacks like dark chocolate can help with cramps.",
      color: Colors.yellow,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <Text style={styles.headerSubtitle}>
          Personalized tips for Day {cycleDay}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cycle Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryPhase}>{getPhaseLabel(phase)}</Text>
              <Text style={styles.summaryDay}>Day {cycleDay} of {cycleLength}</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          </View>
          <View style={styles.summaryTrack}>
            <View style={[styles.summaryFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Insight Cards */}
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightIconBox, { backgroundColor: `${insight.color}15` }]}>
                <MaterialIcons name={insight.icon} size={22} color={insight.color} />
              </View>
              <Text style={[styles.insightLabel, { color: insight.color }]}>
                {insight.label}
              </Text>
            </View>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightBody}>{insight.body}</Text>
          </View>
        ))}

        {/* Log Summary */}
        <View style={styles.logSummary}>
          <Text style={styles.logSummaryTitle}>Your Logging Streak</Text>
          <View style={styles.streakRow}>
            <View style={styles.streakItem}>
              <Text style={styles.streakNumber}>{dailyLogs.length}</Text>
              <Text style={styles.streakLabel}>Days Logged</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakItem}>
              <Text style={styles.streakNumber}>{cycleLength}</Text>
              <Text style={styles.streakLabel}>Cycle Length</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakItem}>
              <Text style={styles.streakNumber}>5</Text>
              <Text style={styles.streakLabel}>Period Days</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  summaryPhase: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  summaryDay: {
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  summaryTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  summaryFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  insightCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: 4,
  },
  insightIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  insightLabel: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    letterSpacing: 2,
  },
  insightTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  insightBody: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  logSummary: {
    backgroundColor: Colors.softPink,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  logSummaryTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  streakItem: {
    alignItems: "center",
    gap: 4,
  },
  streakNumber: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.primary,
  },
  streakLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
});
