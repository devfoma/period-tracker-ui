import React, { useState } from "react";
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
import { Header } from "@/components/ui/Header";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { CravingCategory } from "@/constants/types";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48 - 16) / 2;

type CategoryItem = {
  id: CravingCategory;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const categories: CategoryItem[] = [
  { id: "sweet", label: "Sweet", icon: "cake" },
  { id: "salty", label: "Salty", icon: "bakery-dining" },
  { id: "cool", label: "Cool", icon: "local-cafe" },
  { id: "savory", label: "Savory", icon: "local-pizza" },
];

type CravingItem = {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  addedToList: boolean;
};

const cravingsData: CravingItem[] = [
  { id: "1", name: "Double Burger", description: "Juicy & Cheesy", icon: "lunch-dining", addedToList: false },
  { id: "2", name: "Dark Chocolate", description: "Rich & Velvety", icon: "cookie", addedToList: false },
  { id: "3", name: "Boba Tea", description: "Extra Pearls", icon: "local-cafe", addedToList: false },
  { id: "4", name: "Soft Blanket", description: "Warm & Cozy", icon: "nights-stay", addedToList: false },
];

export default function CravingsScreen() {
  const router = useRouter();
  const [notifyPartners, setNotifyPartners] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CravingCategory>("sweet");
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const toggleAddToList = (id: string) => {
    setAddedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    if (notifyPartners) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Cravings" showBack rightAction={
        <TouchableOpacity>
          <MaterialIcons name="favorite" size={24} color={Colors.primary} />
        </TouchableOpacity>
      } />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notify Partners Card */}
        <View style={styles.notifyCard}>
          <View>
            <View style={styles.notifyHeader}>
              <Text style={styles.notifyTitle}>Notify Partners</Text>
              <MaterialIcons name="auto-awesome" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.notifySubtitle}>
              Instantly share your desires with loved ones
            </Text>
          </View>
          <ToggleSwitch value={notifyPartners} onToggle={setNotifyPartners} />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>{"Feeling..."}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <View style={[styles.categoryCircle, isSelected && styles.categoryCircleSelected]}>
                  <MaterialIcons name={cat.icon} size={28} color={isSelected ? Colors.primary : Colors.textSecondary} />
                </View>
                <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Cravings Grid */}
        <View style={styles.cravingsHeader}>
          <Text style={styles.sectionTitle}>{"Today's Desires"}</Text>
          <TouchableOpacity>
            <Text style={styles.clearAll}>Clear all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cravingsGrid}>
          {cravingsData.map((item) => {
            const isAdded = addedItems.includes(item.id);
            return (
              <View key={item.id} style={styles.cravingCard}>
                <View style={styles.cravingImagePlaceholder}>
                  <MaterialIcons name={item.icon} size={48} color={Colors.primary} />
                  <View style={styles.cravingBadge}>
                    <MaterialIcons name={item.icon} size={14} color={Colors.primary} />
                  </View>
                </View>
                <Text style={styles.cravingName}>{item.name}</Text>
                <Text style={styles.cravingDesc}>{item.description}</Text>
                <TouchableOpacity
                  style={[styles.addButton, isAdded && styles.addButtonActive]}
                  onPress={() => toggleAddToList(item.id)}
                >
                  <MaterialIcons
                    name={isAdded ? "check" : "add"}
                    size={16}
                    color={isAdded ? Colors.white : Colors.white}
                  />
                  <Text style={styles.addButtonText}>
                    {isAdded ? "Added" : "Add to List"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Add Custom */}
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => router.push("/add-craving")}
        >
          <MaterialIcons name="add-circle-outline" size={22} color={Colors.primary} />
          <Text style={styles.customButtonText}>Add Custom Craving</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Toast Notification */}
      {showNotification && (
        <View style={styles.toast}>
          <MaterialIcons name="check-circle" size={20} color={Colors.green} />
          <Text style={styles.toastText}>Partner notified!</Text>
          <TouchableOpacity onPress={() => setShowNotification(false)}>
            <MaterialIcons name="close" size={18} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  notifyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notifyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  notifyTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  notifySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.3,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },
  categoriesRow: {
    gap: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  categoryItem: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  categoryItemSelected: {},
  categoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.border,
  },
  categoryCircleSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  categoryLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  categoryLabelSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  cravingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  clearAll: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  cravingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  cravingCard: {
    width: cardWidth,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cravingImagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: Colors.softPink,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cravingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cravingName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  cravingDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
  },
  addButtonActive: {
    backgroundColor: Colors.green,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.xxl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.primary,
  },
  customButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  toast: {
    position: "absolute",
    bottom: 30,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: "rgba(24, 17, 20, 0.9)",
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  toastText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
