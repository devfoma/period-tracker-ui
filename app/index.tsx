import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useApp } from "@/context/AppContext";
import { Colors } from "@/constants/theme";

export default function Index() {
  const router = useRouter();
  const { onboardingComplete } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onboardingComplete) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding/welcome");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [onboardingComplete]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});
