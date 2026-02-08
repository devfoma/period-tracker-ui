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
import { Header } from "@/components/ui/Header";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export default function ShareCycleScreen() {
  const router = useRouter();
  const { partners, updatePartner } = useApp();

  return (
    <View style={styles.container}>
      <Header title="Share My Cycle" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Shared Partners</Text>
        <Text style={styles.subtitle}>
          Keep your loved ones in the loop with your cycle updates.
        </Text>

        {/* Partner Cards */}
        {partners.map((partner) => (
          <View key={partner.id} style={styles.partnerCard}>
            <View style={styles.partnerHeader}>
              <View style={styles.partnerAvatar}>
                <Text style={styles.avatarText}>
                  {partner.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                <Text style={styles.partnerRole}>
                  {partner.role.toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="settings" size={22} color="rgba(0,0,0,0.3)" />
              </TouchableOpacity>
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.toggleIcon, { backgroundColor: "rgba(249, 6, 128, 0.1)" }]}>
                  <MaterialIcons name="favorite" size={18} color={Colors.primary} />
                </View>
                <Text style={styles.toggleLabel}>Mood Sharing</Text>
              </View>
              <ToggleSwitch
                value={partner.moodSharing}
                onToggle={(v) => updatePartner(partner.id, { moodSharing: v })}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.toggleIcon, { backgroundColor: "rgba(249, 6, 128, 0.1)" }]}>
                  <MaterialIcons name="notifications" size={18} color={Colors.primary} />
                </View>
                <Text style={styles.toggleLabel}>Period Alerts</Text>
              </View>
              <ToggleSwitch
                value={partner.periodAlerts}
                onToggle={(v) => updatePartner(partner.id, { periodAlerts: v })}
              />
            </View>
          </View>
        ))}

        {/* Empty Slots */}
        {[1, 2].map((_, i) => (
          <TouchableOpacity key={i} style={styles.emptySlot}>
            <MaterialIcons name="person-add" size={36} color={Colors.primaryMuted} />
            <Text style={styles.emptySlotTitle}>Empty Slot</Text>
            <Text style={styles.emptySlotSubtitle}>
              {i === 0
                ? "Invite another close friend or family member"
                : "Invite another person"}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Invite Button */}
        <Button
          title="Invite New Person"
          onPress={() => {}}
          icon={<MaterialIcons name="add-circle" size={22} color={Colors.white} />}
          style={{ marginTop: Spacing.xxl }}
        />

        <Text style={styles.privacyNote}>
          Your health data is private. Partners can only see what you choose to share and you can revoke access at any time.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    marginBottom: Spacing.xxl,
    lineHeight: 20,
  },
  partnerCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  partnerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  partnerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.softPink,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  partnerRole: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: 2,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  toggleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  emptySlot: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.border,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  emptySlotTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  emptySlotSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: Spacing.xxl,
  },
  privacyNote: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.xxl,
    lineHeight: 18,
    paddingHorizontal: Spacing.xl,
  },
});
