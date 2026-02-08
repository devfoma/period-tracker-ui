export type OnboardingData = {
  goal: "track_cycle" | "plan_pregnancy" | "health_insights" | null;
  lastPeriodDate: string | null;
  cycleLength: number;
  notificationsEnabled: boolean;
};

export type CyclePhase =
  | "menstrual"
  | "follicular"
  | "ovulation"
  | "luteal"
  | "late_luteal";

export type MoodType =
  | "happy"
  | "sensitive"
  | "tired"
  | "anxious"
  | "calm"
  | "other";

export type SymptomType =
  | "bloating"
  | "headache"
  | "acne"
  | "cramps"
  | "backache"
  | "spotting";

export type FlowIntensity = "none" | "light" | "medium" | "heavy";

export type DailyLog = {
  date: string;
  mood: MoodType | null;
  flow: FlowIntensity;
  symptoms: SymptomType[];
  notes: string;
  waterIntake: number;
  sleepHours: number;
};

export type CravingCategory = "sweet" | "salty" | "cool" | "savory";

export type Craving = {
  id: string;
  name: string;
  description: string;
  category: CravingCategory;
  imageUrl?: string;
  addedToList: boolean;
};

export type Partner = {
  id: string;
  name: string;
  role: "partner" | "friend" | "family";
  moodSharing: boolean;
  periodAlerts: boolean;
  avatarUrl?: string;
};

export type Gift = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "flowers" | "chocolates" | "wellness";
  imageUrl?: string;
};
