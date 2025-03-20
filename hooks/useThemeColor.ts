import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { Colors } from "@/constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light | keyof typeof Colors.dark
) {
  const context = useContext(TaskContext);
  if (!context) {
    return props.light ?? Colors.light[colorName];
  }

  const { darkMode } = context; 
  const theme = darkMode ? "dark" : "light";
  
  return props[theme] ?? Colors[theme][colorName];
}
