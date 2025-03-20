import { useContext } from "react";
import {
  StyleSheet
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/enums";

export default function TaskScreen() {

  const { id: taskId } = useLocalSearchParams<{ id: string }>();
  const context = useContext(TaskContext);
    if (!context) return null;
  const { getTaskById } = context

  const task = taskId ? getTaskById(taskId) : undefined;

  if (!task) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText style={{ fontSize: 18, color: "red" }}>Task not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText style={styles.title}>{task.title}</ThemedText>
      <ThemedText style={styles.description}>{task.description}</ThemedText>
      <ThemedText style={styles.status}>
        Status: {task.status === TaskStatus.DONE ? "Completed ✅" : "Pending ⏳"}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});