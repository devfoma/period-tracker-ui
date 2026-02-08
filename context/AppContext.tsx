import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  OnboardingData,
  DailyLog,
  Craving,
  Partner,
  MoodType,
  FlowIntensity,
  SymptomType,
} from "@/constants/types";

type AppState = {
  onboardingComplete: boolean;
  onboardingData: OnboardingData;
  dailyLogs: DailyLog[];
  cravings: Craving[];
  partners: Partner[];
  userName: string;
};

type AppContextType = AppState & {
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  saveDailyLog: (log: DailyLog) => void;
  getTodayLog: () => DailyLog | undefined;
  addCraving: (craving: Craving) => void;
  removeCraving: (id: string) => void;
  addPartner: (partner: Partner) => void;
  updatePartner: (id: string, data: Partial<Partner>) => void;
  removePartner: (id: string) => void;
};

const defaultOnboarding: OnboardingData = {
  goal: null,
  lastPeriodDate: null,
  cycleLength: 28,
  notificationsEnabled: false,
};

const defaultState: AppState = {
  onboardingComplete: false,
  onboardingData: defaultOnboarding,
  dailyLogs: [],
  cravings: [],
  partners: [
    {
      id: "1",
      name: "John Doe",
      role: "partner",
      moodSharing: true,
      periodAlerts: true,
    },
  ],
  userName: "Sarah",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    saveState();
  }, [state]);

  const loadState = async () => {
    try {
      const stored = await AsyncStorage.getItem("hercircle_state");
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch (e) {
      // Use defaults
    }
  };

  const saveState = async () => {
    try {
      await AsyncStorage.setItem("hercircle_state", JSON.stringify(state));
    } catch (e) {
      // Silent fail
    }
  };

  const setOnboardingData = (data: Partial<OnboardingData>) => {
    setState((prev) => ({
      ...prev,
      onboardingData: { ...prev.onboardingData, ...data },
    }));
  };

  const completeOnboarding = () => {
    setState((prev) => ({
      ...prev,
      onboardingComplete: true,
      onboardingData: {
        ...prev.onboardingData,
        lastPeriodDate:
          prev.onboardingData.lastPeriodDate ||
          new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    }));
  };

  const saveDailyLog = (log: DailyLog) => {
    setState((prev) => {
      const existingIndex = prev.dailyLogs.findIndex((l) => l.date === log.date);
      const newLogs = [...prev.dailyLogs];
      if (existingIndex >= 0) {
        newLogs[existingIndex] = log;
      } else {
        newLogs.push(log);
      }
      return { ...prev, dailyLogs: newLogs };
    });
  };

  const getTodayLog = (): DailyLog | undefined => {
    const today = new Date().toISOString().split("T")[0];
    return state.dailyLogs.find((l) => l.date === today);
  };

  const addCraving = (craving: Craving) => {
    setState((prev) => ({
      ...prev,
      cravings: [...prev.cravings, craving],
    }));
  };

  const removeCraving = (id: string) => {
    setState((prev) => ({
      ...prev,
      cravings: prev.cravings.filter((c) => c.id !== id),
    }));
  };

  const addPartner = (partner: Partner) => {
    setState((prev) => ({
      ...prev,
      partners: [...prev.partners, partner],
    }));
  };

  const updatePartner = (id: string, data: Partial<Partner>) => {
    setState((prev) => ({
      ...prev,
      partners: prev.partners.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  };

  const removePartner = (id: string) => {
    setState((prev) => ({
      ...prev,
      partners: prev.partners.filter((p) => p.id !== id),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setOnboardingData,
        completeOnboarding,
        saveDailyLog,
        getTodayLog,
        addCraving,
        removeCraving,
        addPartner,
        updatePartner,
        removePartner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
