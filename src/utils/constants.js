import { Plus, Filter, TrendingUp } from "lucide-react";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Utilities",
  "Education",
  "Travel",
  "Other",
];

export const categorySelectData = CATEGORIES.map((cat) => ({ value: cat, label: cat }));

export const COLORS = [
  "#357e48ff",
  "#82ca9d",
  "#c99325ff",
  "#ff7c7c",
  "#8dd1e1",
  "#d084d0",
  "#ffb347",
  "#87ceeb",
  "#98fb98",
];

// New exports for DRY optimization
export const INITIAL_FORM_DATA = {
  description: "",
  amount: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  type: "expense",
};

export const TAB_CONFIG = [
  { value: "add", label: "Add Details", icon: Plus },
  { value: "list", label: "Statement", icon: Filter },
  { value: "charts", label: "Analytics", icon: TrendingUp }
];