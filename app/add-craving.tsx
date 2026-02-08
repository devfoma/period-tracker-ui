import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { Button } from "@/components/ui/Button";

const categories = ["Food", "Comfort", "Activity"];
const quickSuggestions = [
  { label: "Ice Cream", icon: "icecream" },
  { label: "Hugs", icon: "favorite" },
  { label: "Movie Night", icon: "movie" },
  { label: "Chocolate", icon: "cookie" },
];

export default function AddCravingScreen() {
  const router = useRouter();
  const [cravingText, setCravingText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Food");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Custom Craving</Text>
        <TouchableOpacity>
          <MaterialIcons name="check" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{"What's on your mind?"}</Text>
        <Text style={styles.subtitle}>
          Let us know what would make you feel better today.
        </Text>

        {/* Text Input */}
        <Text style={styles.label}>{"I'm really craving..."}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Double fudge brownies, a weighted blanket, or maybe just a nap..."
          placeholderTextColor="rgba(249, 6, 128, 0.4)"
          value={cravingText}
          onChangeText={setCravingText}
          multiline
          textAlignVertical="top"
        />

        {/* Category Tabs */}
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryTabs}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === cat && styles.categoryTabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Photo Upload */}
        <Text style={styles.sectionLabel}>{"Show us what you're dreaming of"}</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <MaterialIcons name="add-a-photo" size={36} color={Colors.primary} />
          <Text style={styles.uploadTitle}>Snap a pic or upload</Text>
          <Text style={styles.uploadSubtitle}>Help your partner get it right!</Text>
        </TouchableOpacity>

        {/* Quick Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsRow}
        >
          {quickSuggestions.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.suggestionChip}
              onPress={() => setCravingText(item.label)}
            >
              <Text style={styles.suggestionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.footer}>
        <Button
          title="Share with Partners"
          onPress={() => router.back()}
          icon={<MaterialIcons name="favorite" size={20} color={Colors.white} />}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginTop: Spacing.xxl,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.softPink,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    height: 120,
    fontSize: FontSize.base,
    color: Colors.text,
  },
  sectionLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },
  categoryTabs: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  categoryTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  categoryTabActive: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
  },
  categoryTabText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.huge,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.softPink,
  },
  uploadTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  uploadSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  suggestionsRow: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  footer: {
    padding: Spacing.xxl,
    paddingBottom: 40,
  },
});
