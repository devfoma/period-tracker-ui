import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { Header } from "@/components/ui/Header";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Button } from "@/components/ui/Button";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useApp } from "@/context/AppContext";
import { getMonthDays } from "@/utils/cycle";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function LastPeriodScreen() {
  const router = useRouter();
  const { setOnboardingData } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(5);
  const [dontRemember, setDontRemember] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleNext = () => {
    if (selectedDay && !dontRemember) {
      const date = new Date(currentYear, currentMonth, selectedDay);
      setOnboardingData({ lastPeriodDate: date.toISOString().split("T")[0] });
    }
    router.push("/onboarding/select-goal");
  };

  return (
    <View style={styles.container}>
      <Header showBack stepText="Step 2 of 5" />
      <ProgressDots total={5} current={1} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>When did your last period start?</Text>
        <Text style={styles.subtitle}>
          Select the first day of your most recent cycle to help us track your health.
        </Text>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
              <MaterialIcons name="chevron-left" size={28} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
              <MaterialIcons name="chevron-right" size={28} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.daysHeader}>
            {DAYS.map((day, i) => (
              <Text key={i} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day && !dontRemember;
              return (
                <TouchableOpacity
                  key={day}
                  style={styles.dayCell}
                  onPress={() => {
                    setSelectedDay(day);
                    setDontRemember(false);
                  }}
                >
                  <View
                    style={[
                      styles.dayCircle,
                      isSelected && styles.dayCircleSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Don't remember toggle */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <MaterialIcons
              name="help-outline"
              size={22}
              color={Colors.primaryMuted}
            />
            <Text style={styles.toggleText}>I don't remember</Text>
          </View>
          <ToggleSwitch
            value={dontRemember}
            onToggle={(val) => setDontRemember(val)}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={handleNext}
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xxl,
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
    color: "rgba(24, 17, 20, 0.6)",
    textAlign: "center",
    marginTop: Spacing.md,
    lineHeight: 22,
  },
  calendarContainer: {
    backgroundColor: "rgba(249, 6, 128, 0.05)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  navButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  monthText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: FontWeight.bold,
    color: "rgba(24, 17, 20, 0.4)",
    letterSpacing: 1,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleSelected: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  dayText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  dayTextSelected: {
    color: Colors.white,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(249, 6, 128, 0.05)",
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.xxxl,
    borderWidth: 1,
    borderColor: "rgba(249, 6, 128, 0.05)",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  toggleText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  footer: {
    padding: Spacing.xxl,
    paddingBottom: 40,
  },
});
