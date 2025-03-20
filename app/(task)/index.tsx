import { AbsoluteBottomButton } from "@/components/AbsoluteBottomButton";
import { SwipeableElement } from "@/components/SwipeableElement";
import { TaskItem } from "@/components/TaskItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Theme } from "@/constants/Colors";
import { TaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/enums";
import { FilterType, TaskType } from "@/types";
import { router } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity } from "react-native";

const TaskList: React.FC = () => {
  const context = useContext(TaskContext);
  if (!context) return null;

  const { tasks, darkMode, deleteTask, updateTask, filter, setFilter, isFilterModalVisible, setFilterModalVisible } = context;

  const onSelectTask = async (task: TaskType) => {
    if (!task.title || !task.description) {
      return;
    }
    updateTask(task.id, task.title, task.description, task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO);
  };

  const onPressCreateNew = () => {
    router.push("/(task)/create-task?returnPath=task");
  };

  const onDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setFilterModalVisible(false);
  };

  return (
    <ThemedView style={[styles.listContainer, darkMode && styles.darkBackground]}>
      {tasks.length === 0 ? (
        <ThemedText style={styles.emptyText}>No tasks available</ThemedText>
      ) : (
        <ThemedView style={styles.projectsContainer}>
          <FlatList
            data={tasks as TaskType[]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: TaskType }) => {
              const rightActionText = "Delete";
              const onRightAction = () => {
                onDeleteTask(item.id);
              };

              return (
                <SwipeableElement
                  key={`task-${item.id}`}
                  rightActionText={rightActionText}
                  onRightAction={onRightAction}
                  stylesProps={{ borderRadius: 6 }}
                >
                  <TaskItem
                    item={item}
                    onSelectTask={onSelectTask}
                  />
                </SwipeableElement>
              )
            }}
            ListEmptyComponent={() => (
              <ThemedView style={styles.emptyScreen}>
                <ThemedText type="defaultBold">No Tasks</ThemedText>
              </ThemedView>
            )}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
          />

        </ThemedView>
      )}
      <AbsoluteBottomButton
        icon="add-outline"
        size={28}
        onPress={onPressCreateNew}
      />
      <Modal visible={isFilterModalVisible} transparent animationType="fade">
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Filter Tasks</ThemedText>

            <TouchableOpacity
              style={[styles.filterOption, filter === "ALL" && styles.selectedFilter]}
              onPress={() => handleFilterChange("ALL")}
            >
              <ThemedText style={[styles.filterText, filter === "ALL" && styles.selectedFilterText]}>
                📋 All Tasks
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterOption, filter === TaskStatus.DONE && styles.selectedFilter]}
              onPress={() => handleFilterChange(TaskStatus.DONE)}
            >
              <ThemedText style={[styles.filterText, filter === TaskStatus.DONE && styles.selectedFilterText]}>
                ✅ Completed Tasks
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterOption, filter === TaskStatus.TODO && styles.selectedFilter]}
              onPress={() => handleFilterChange(TaskStatus.TODO)}
            >
              <ThemedText style={[styles.filterText, filter === TaskStatus.TODO && styles.selectedFilterText]}>
                ⏳ Pending Tasks
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setFilterModalVisible(false)}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  listContainer: { flex: 1, },
  darkBackground: { backgroundColor: "#222" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
  projectsContainer: {
    gap: 16,
    flex: 1,
  },
  emptyScreen: {
    flex: 1,
    alignItems: "center",
    marginTop: 64,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Theme.brand.white,
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Theme.brand.black
  },
  filterOption: {
    fontSize: 16,
    paddingVertical: 8,
  },
  selectedFilter: {
    backgroundColor: Theme.brand.lightGrey,
    padding: 10,
    borderRadius: 10,
  },
  selectedFilterText: {
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#FF4C4C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.brand.white,
  },
  filterText: {
    fontSize: 16,
    color: Theme.brand.black,
  },
});

export default TaskList;
