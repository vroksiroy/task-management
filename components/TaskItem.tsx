import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Theme } from "@/constants/Colors";

import { TaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/enums";
import { TaskType } from "@/types/task";

export const TaskItem = ({
  item,
  onSelectTask,
}: {
  item: TaskType;
  onSelectTask: (item: TaskType) => void;
}) => {
    const context = useContext(TaskContext);
    if (!context) return null;
  
    const { darkMode } = context;

  return (
    <Pressable onPress={() => router.push(`/(task)/${item.id}`)} key={item?.id}>
      <ThemedView style={styles.container}>
        <ThemedView
          style={[
            styles.colorView,
          ]}
        />
        <Pressable
          onPress={()=>onSelectTask(item)}
          style={styles.checkboxContainer}
        >
          <Ionicons
            name={
              item?.status == TaskStatus.DONE ? "checkbox" : "square-outline"
            }
            size={26}
            color={darkMode ? Theme.brand.white : Theme.brand.black}
          />
        </Pressable>
        <ThemedView style={styles.titleView}>
          <ThemedText type="default" numberOfLines={1} style={styles.titleText}>
            {item?.title}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.6,
    borderColor: Theme.brand.grey,
    borderRadius: 4,
    gap: 10,
    alignItems: "center",
  },
  checkboxContainer: {
    width: 32,
  },
  titleView: { rowGap: 3, maxWidth: "50%" },
  titleText: { lineHeight: 20 },
  colorView: {
    width: 75,
    height: 9,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    position: "absolute",
    top: 0,
    right: 1,
    backgroundColor:'transparent'
  },
});
