import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { useApp } from "@/context/AppContext";
import { MoodType, SymptomType, FlowIntensity } from "@/constants/types";

type MoodOption = {
  id: MoodType;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const moods: MoodOption[] = [
  { id: "happy", label: "Happy", icon: "sentiment-very-satisfied" },
  { id: "sensitive", label: "Sensitive", icon: "auto-awesome" },
  { id: "tired", label: "Tired", icon: "bedtime" },
  { id: "anxious", label: "Anxious", icon: "cloud" },
  { id: "calm", label: "Calm", icon: "eco" },
  { id: "other", label: "Other", icon: "add" },
];

type SymptomOption = {
  id: SymptomType;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const symptoms: SymptomOption[] = [
  { id: "bloating", label: "Bloating", icon: "air" },
  { id: "headache", label: "Headache", icon: "psychology" },
  { id: "acne", label: "Acne", icon: "flare" },
  { id: "cramps", label: "Cramps", icon: "waves" },
  { id: "backache", label: "Backache", icon: "accessibility-new" },
  { id: "spotting", label: "Spotting", icon: "water-drop" },
];

export default function DailyLogScreen() {
  const router = useRouter();
  const { saveDailyLog } = useApp();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>("happy");
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>(["headache", "cramps"]);
  const [flowLevel, setFlowLevel] = useState<number>(50);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (id: SymptomType) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getFlowLabel = (): FlowIntensity => {
    if (flowLevel <= 15) return "none";
    if (flowLevel <= 45) return "light";
    if (flowLevel <= 75) return "medium";
    return "heavy";
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];
    saveDailyLog({
      date: today,
      mood: selectedMood,
      flow: getFlowLabel(),
      symptoms: selectedSymptoms,
      notes,
      waterIntake: 8,
      sleepHours: 7.5,
    });
    Alert.alert("Saved!", "Your daily entry has been saved.");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={20} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Daily Logger</Text>
          <Text style={styles.headerDate}>
            Today, {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <MaterialIcons name="calendar-today" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{"How's your mood?"}</Text>
          <Text style={styles.sectionHint}>Select one</Text>
        </View>
        <View style={styles.moodGrid}>
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <TouchableOpacity
                key={mood.id}
                style={[styles.moodItem, isSelected && styles.moodItemSelected]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <MaterialIcons
                  name={mood.icon}
                  size={28}
                  color={isSelected ? Colors.primary : Colors.primaryMuted}
                />
                <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Flow Intensity */}
        <Text style={styles.sectionTitleSingle}>Flow Intensity</Text>
        <View style={styles.flowCard}>
          <View style={styles.flowTrack}>
            <View style={[styles.flowFill, { width: `${flowLevel}%` }]} />
            <View style={[styles.flowThumb, { left: `${flowLevel}%` }]} />
          </View>
          <View style={styles.flowLabels}>
            <Text style={[styles.flowLabel, flowLevel <= 15 && styles.flowLabelActive]}>
              NONE
            </Text>
            <Text style={[styles.flowLabel, flowLevel > 35 && flowLevel <= 65 && styles.flowLabelActive]}>
              MEDIUM
            </Text>
            <Text style={[styles.flowLabel, flowLevel > 75 && styles.flowLabelActive]}>
              HEAVY
            </Text>
          </View>
        </View>

        {/* Symptoms */}
        <Text style={styles.sectionTitleSingle}>Symptoms</Text>
        <View style={styles.symptomGrid}>
          {symptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <TouchableOpacity
                key={symptom.id}
                style={[styles.symptomItem, isSelected && styles.symptomItemSelected]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <MaterialIcons
                  name={symptom.icon}
                  size={22}
                  color={Colors.primary}
                />
                <Text style={styles.symptomLabel}>{symptom.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={styles.sectionTitleSingle}>Personal Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="How was your day? Write down any thoughts..."
          placeholderTextColor="rgba(24, 17, 20, 0.3)"
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
        />

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Daily Entry</Text>
          <MaterialIcons name="check-circle" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: "rgba(253, 248, 250, 0.8)",
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  headerDate: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  sectionHint: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.primary,
  },
  sectionTitleSingle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.3,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.sm,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  moodItem: {
    width: "30%",
    alignItems: "center",
    gap: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
  },
  moodItemSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "rgba(249, 6, 128, 0.05)",
  },
  moodLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  moodLabelSelected: {
    color: Colors.text,
  },
  flowCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xxl,
    marginVertical: Spacing.lg,
  },
  flowTrack: {
    height: 8,
    backgroundColor: "rgba(249, 6, 128, 0.1)",
    borderRadius: 4,
    position: "relative",
    marginBottom: Spacing.xxxl,
  },
  flowFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  flowThumb: {
    position: "absolute",
    top: -9,
    marginLeft: -13,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
    borderWidth: 4,
    borderColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  flowLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flowLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: "rgba(0,0,0,0.3)",
    letterSpacing: 2,
  },
  flowLabelActive: {
    color: Colors.primary,
  },
  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  symptomItem: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  symptomItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(249, 6, 128, 0.05)",
  },
  symptomLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  notesInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    height: 128,
    fontSize: FontSize.md,
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.xxl,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: FontSize.base,
    fontWeight: FontWeight.extrabold,
  },
});
