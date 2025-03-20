import { TaskStatus } from "@/enums";
import { FilterType, TaskType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface TaskContextProps {
  tasks: TaskType[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string, status?: TaskStatus) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => TaskType | undefined;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isFilterModalVisible: boolean;
  setFilterModalVisible: (visible: boolean) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadStorage = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) setTasks(JSON.parse(storedTasks));

      const storedMode = await AsyncStorage.getItem("darkMode");
      if (storedMode) setDarkMode(JSON.parse(storedMode));
    };
    loadStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const addTask = (title: string, description: string) => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title, description, status: TaskStatus.TODO }]);
  };

  const updateTask = (id: string, title: string, description: string, status?: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, ...(status !== undefined ? { status } : {}) }
          : task
      )
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === TaskStatus.DONE) return task.status === TaskStatus.DONE;
    if (filter === TaskStatus.TODO) return task.status === TaskStatus.TODO;
    return true;
  });

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, addTask, updateTask, toggleTask, deleteTask, getTaskById, filter, setFilter, darkMode, toggleDarkMode, isFilterModalVisible, setFilterModalVisible, }}>
      {children}
    </TaskContext.Provider>
  );
};
