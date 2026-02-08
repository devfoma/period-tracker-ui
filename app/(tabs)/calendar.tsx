import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import {
  getMonthDays,
  getCycleDay,
  getCyclePhase,
  getPhaseLabel,
  getPhaseInsight,
  isPeriodDay,
  isFertileDay,
  isOvulationDay,
  isPredictedPeriod,
} from "@/utils/cycle";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarScreen() {
  const { onboardingData } = useApp();
  const lastPeriod = onboardingData.lastPeriodDate || new Date().toISOString().split("T")[0];
  const cycleLength = onboardingData.cycleLength || 28;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const cycleDay = getCycleDay(lastPeriod, cycleLength);
  const phase = getCyclePhase(cycleDay, cycleLength);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const renderDay = (day: number) => {
    const period = isPeriodDay(day, currentMonth, currentYear, lastPeriod, cycleLength);
    const fertile = isFertileDay(day, currentMonth, currentYear, lastPeriod, cycleLength);
    const ovulation = isOvulationDay(day, currentMonth, currentYear, lastPeriod, cycleLength);
    const predicted = isPredictedPeriod(day, currentMonth, currentYear, lastPeriod, cycleLength);
    const todayMark = isToday(day);
    const selected = selectedDay === day;

    let cellStyle: any[] = [styles.dayCell];
    let textStyle: any[] = [styles.dayText];
    let innerContent = null;

    if (period) {
      cellStyle.push(styles.periodBg);
      return (
        <TouchableOpacity
          key={day}
          style={cellStyle}
          onPress={() => setSelectedDay(day)}
        >
          <View style={styles.periodCircle}>
            <Text style={styles.periodText}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (predicted) {
      return (
        <TouchableOpacity
          key={day}
          style={cellStyle}
          onPress={() => setSelectedDay(day)}
        >
          <View style={styles.predictedCircle}>
            <Text style={styles.predictedText}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (fertile) {
      cellStyle.push(styles.fertileBg);
      return (
        <TouchableOpacity
          key={day}
          style={cellStyle}
          onPress={() => setSelectedDay(day)}
        >
          <Text style={styles.fertileText}>{day}</Text>
          {ovulation && (
            <MaterialIcons
              name="favorite"
              size={8}
              color={Colors.primary}
              style={styles.ovulationIcon}
            />
          )}
        </TouchableOpacity>
      );
    }

    if (todayMark) {
      return (
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, styles.todayBorder]}
          onPress={() => setSelectedDay(day)}
        >
          <View style={styles.todayCircle}>
            <Text style={styles.todayText}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={day}
        style={styles.dayCell}
        onPress={() => setSelectedDay(day)}
      >
        <Text style={[styles.dayText, selected && styles.selectedText]}>{day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
          <MaterialIcons name="chevron-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.monthTitle}>{monthNames[currentMonth]} {currentYear}</Text>
          <Text style={styles.phaseTag}>{getPhaseLabel(phase).toUpperCase()}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.daysHeader}>
            {DAYS.map((d, i) => (
              <Text key={i} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <View key={`e-${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => renderDay(i + 1))}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>PERIOD</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.fertile }]} />
              <Text style={styles.legendText}>FERTILE</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDotOutline]} />
              <Text style={styles.legendText}>PREDICTED</Text>
            </View>
          </View>
        </View>

        {/* Today Detail */}
        <View style={styles.detailSection}>
          <View style={styles.detailHeader}>
            <Text style={styles.detailTitle}>
              Today, {monthNames[currentMonth].slice(0, 3)} {selectedDay}
            </Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit Log</Text>
            </TouchableOpacity>
          </View>

          {/* Phase Insight Card */}
          <View style={styles.insightCard}>
            <View style={styles.insightRow}>
              <View style={styles.insightIconBox}>
                <MaterialIcons name="lightbulb" size={22} color={Colors.primary} />
              </View>
              <View style={styles.insightText}>
                <Text style={styles.insightTitle}>{getPhaseLabel(phase)}</Text>
                <Text style={styles.insightBody}>{getPhaseInsight(phase)}</Text>
              </View>
            </View>
          </View>

          {/* Symptom Chips */}
          <Text style={styles.chipLabel}>LOGGED SYMPTOMS</Text>
          <View style={styles.chips}>
            <View style={styles.chip}>
              <View style={[styles.chipIcon, { backgroundColor: Colors.border }]}>
                <MaterialIcons name="bolt" size={14} color={Colors.primary} />
              </View>
              <Text style={styles.chipText}>Cramps: Mild</Text>
            </View>
            <View style={styles.chip}>
              <View style={[styles.chipIcon, { backgroundColor: "#fef3c7" }]}>
                <MaterialIcons name="sentiment-satisfied" size={14} color="#d97706" />
              </View>
              <Text style={styles.chipText}>Mood: Happy</Text>
            </View>
            <View style={styles.chip}>
              <View style={[styles.chipIcon, { backgroundColor: "#dbeafe" }]}>
                <MaterialIcons name="opacity" size={14} color="#2563eb" />
              </View>
              <Text style={styles.chipText}>Flow: None</Text>
            </View>
          </View>

          {/* Water & Sleep */}
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <View style={styles.trackingLabel}>
                <MaterialIcons name="water-drop" size={20} color={Colors.blue} />
                <Text style={styles.trackingTitle}>Water Intake</Text>
              </View>
              <Text style={styles.trackingValue}>8/10 glasses</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.trackFill, { width: "80%", backgroundColor: Colors.primary }]} />
            </View>
          </View>

          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <View style={styles.trackingLabel}>
                <MaterialIcons name="bedtime" size={20} color={Colors.indigo} />
                <Text style={styles.trackingTitle}>Sleep</Text>
              </View>
              <Text style={styles.trackingValue}>7.5/8 hrs</Text>
            </View>
            <View style={styles.trackBar}>
              <View style={[styles.trackFill, { width: "93%", backgroundColor: Colors.indigo }]} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  monthTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  phaseTag: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: 3,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: FontWeight.bold,
    color: "rgba(0,0,0,0.3)",
    textTransform: "uppercase",
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
  dayText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  selectedText: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  periodBg: {
    backgroundColor: Colors.primaryLight,
  },
  periodCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  periodText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  predictedCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(249, 6, 128, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  predictedText: {
    color: Colors.primaryMuted,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  fertileBg: {
    backgroundColor: Colors.fertile,
  },
  fertileText: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  ovulationIcon: {
    position: "absolute",
    bottom: 4,
  },
  todayBorder: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
  },
  todayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  todayText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  legend: {
    flexDirection: "row",
    gap: Spacing.lg,
    paddingTop: Spacing.lg,
    marginTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendDotOutline: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(249, 6, 128, 0.4)",
  },
  legendText: {
    fontSize: 10,
    fontWeight: FontWeight.medium,
    color: "rgba(0,0,0,0.4)",
    letterSpacing: 2,
  },
  detailSection: {
    marginTop: Spacing.lg,
    gap: Spacing.lg,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  editBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  editBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  insightCard: {
    backgroundColor: Colors.softPink,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  insightRow: {
    flexDirection: "row",
    gap: Spacing.lg,
    alignItems: "flex-start",
  },
  insightIconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  insightBody: {
    fontSize: FontSize.xs,
    color: "rgba(0,0,0,0.5)",
    lineHeight: 18,
  },
  chipLabel: {
    fontSize: 11,
    fontWeight: FontWeight.bold,
    color: "rgba(0,0,0,0.3)",
    letterSpacing: 3,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingLeft: 4,
    paddingRight: Spacing.lg,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  chipIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  trackingCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  trackingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  trackingLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  trackingTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  trackingValue: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  trackBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  trackFill: {
    height: "100%",
    borderRadius: 5,
  },
});
