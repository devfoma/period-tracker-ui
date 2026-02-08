import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import {
  getCycleDay,
  getCyclePhase,
  getPhaseLabel,
  getDaysUntilPeriod,
  getCycleProgress,
  getPhaseInsight,
} from "@/utils/cycle";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { userName, onboardingData } = useApp();

  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;

  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);
  const phaseLabel = getPhaseLabel(phase);
  const daysUntil = getDaysUntilPeriod(cycleDay, cycleLength);
  const progress = getCycleProgress(cycleDay, cycleLength);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.greeting}>Good morning, {userName}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications-none" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cycle Ring */}
        <View style={styles.cycleSection}>
          <View style={styles.cycleRingOuter}>
            {/* Progress arc visual */}
            <View style={[styles.progressArc, { opacity: 0.2 }]} />
            <View style={styles.cycleRingInner}>
              <Text style={styles.phaseLabel}>{phaseLabel.toUpperCase()}</Text>
              <Text style={styles.dayNumber}>Day {cycleDay}</Text>
              <Text style={styles.periodIn}>
                Period in {daysUntil} days
              </Text>
            </View>
          </View>
        </View>

        {/* Cycle Progress Bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Cycle Progress</Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => router.push("/(tabs)/log")}
          >
            <MaterialIcons name="edit-note" size={22} color={Colors.white} />
            <Text style={styles.primaryActionText}>Log symptoms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <MaterialIcons name="mood" size={22} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Daily mood</Text>
          </TouchableOpacity>
        </View>

        {/* Insight Cards */}
        <Text style={styles.insightTitle}>Insights for you</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.insightsRow}
        >
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <MaterialIcons name="favorite" size={18} color={Colors.primary} />
              <Text style={styles.insightLabel}>HEALTH</Text>
            </View>
            <Text style={styles.insightHeading}>High Energy</Text>
            <Text style={styles.insightBody}>
              Great day for a workout or starting new projects!
            </Text>
          </View>
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <MaterialIcons name="child-care" size={18} color={Colors.primary} />
              <Text style={styles.insightLabel}>FERTILITY</Text>
            </View>
            <Text style={styles.insightHeading}>
              {phase === "ovulation" ? "Peak" : phase === "follicular" ? "High Chance" : "Low"}
            </Text>
            <Text style={styles.insightBody}>
              {getPhaseInsight(phase)}
            </Text>
          </View>
        </ScrollView>

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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  cycleSection: {
    alignItems: "center",
    paddingVertical: Spacing.xxxl,
  },
  cycleRingOuter: {
    width: 288,
    height: 288,
    borderRadius: 144,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressArc: {
    position: "absolute",
    width: 288,
    height: 288,
    borderRadius: 144,
    borderWidth: 14,
    borderColor: Colors.primary,
  },
  cycleRingInner: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  phaseLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: 3,
    marginBottom: Spacing.xs,
  },
  dayNumber: {
    fontSize: 56,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  periodIn: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginTop: Spacing.sm,
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: Spacing.xxl,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  progressPercent: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textTransform: "uppercase",
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.progressTrack,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.lg,
    letterSpacing: -0.3,
  },
  quickActions: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  primaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    height: 56,
  },
  primaryActionText: {
    color: Colors.white,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
    height: 56,
  },
  secondaryActionText: {
    color: Colors.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  insightTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  insightsRow: {
    gap: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  insightCard: {
    width: 180,
    backgroundColor: "#f5f0f2",
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  insightIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  insightLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: 2,
  },
  insightHeading: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  insightBody: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
