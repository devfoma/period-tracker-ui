import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from "@/constants/theme";
import { useApp } from "@/context/AppContext";

type MenuItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  route?: string;
  color?: string;
};

const menuItems: MenuItem[] = [
  { icon: "person-outline", label: "Edit Profile" },
  { icon: "share", label: "Share My Cycle", route: "/share-cycle" },
  { icon: "restaurant", label: "My Cravings", route: "/cravings" },
  { icon: "people-outline", label: "Partner Dashboard", route: "/partner-dashboard" },
  { icon: "card-giftcard", label: "Gift Selection", route: "/gift-selection" },
  { icon: "notifications-none", label: "Notification Settings" },
  { icon: "lock-outline", label: "Privacy & Security" },
  { icon: "help-outline", label: "Help & Support" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { userName, onboardingData, dailyLogs } = useApp();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.goalLabel}>
            Goal: {onboardingData.goal?.replace("_", " ") || "Track Cycle"}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{onboardingData.cycleLength}</Text>
            <Text style={styles.statLabel}>Cycle</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dailyLogs.length}</Text>
            <Text style={styles.statLabel}>Logged</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Period</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconBox}>
                  <MaterialIcons
                    name={item.icon}
                    size={22}
                    color={item.color || Colors.primary}
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="rgba(0,0,0,0.2)" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.version}>Her Circle v1.0.0</Text>

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
  scrollContent: {
    paddingTop: 80,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  goalLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
    textTransform: "capitalize",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  menuSection: {
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  version: {
    textAlign: "center",
    fontSize: FontSize.xs,
    color: "rgba(0,0,0,0.2)",
    marginTop: Spacing.xxxl,
  },
});
