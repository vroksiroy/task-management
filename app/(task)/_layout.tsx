import { ThemedView } from "@/components/ThemedView";
import { Theme } from "@/constants/Colors";
import { TaskContext } from "@/context/TaskContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";

export default function TasksLayout() {
  const context = useContext(TaskContext);
  if (!context) return null;
  const { setFilterModalVisible, darkMode, toggleDarkMode } = context

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "All Tasks",
          headerRight: () => (
            <ThemedView style={{ flexDirection: "row", backgroundColor: 'transparent' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleDarkMode}>
                <Ionicons name={darkMode ? "moon" : "sunny"} size={24} color={darkMode ? Theme.brand.white : Theme.brand.black} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                <Ionicons name="filter-circle-outline" size={24} color={darkMode ? Theme.brand.white : Theme.brand.black} />
              </TouchableOpacity>
            </ThemedView>
          ),
        }} />
      <Stack.Screen
        name="[id]/index"
        options={({ route }) => {
          const { id } = route.params || {};
          return {
            title: "Task Details",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  if (id) {
                    router.push({
                      pathname: "/(task)/create-task",
                      params: { id },
                    });
                  }
                }}
              >
                <Ionicons name="create-outline" size={26} color={darkMode ? Theme.brand.white : Theme.brand.black} />
              </TouchableOpacity>
            ),
          };
        }} />
      <Stack.Screen
        name="create-task"
        options={({ route }) => {
          const { id } = route.params || {};
          return {
            title: id ? "Edit Task" : "Create a Task", // Change title dynamically
          };
        }}
      />
    </Stack>
  );
}

