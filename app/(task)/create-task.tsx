import React, { useContext, useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";

import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Colors";
import { TaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/enums";
import { TaskType } from "@/types";
import { router, useLocalSearchParams } from "expo-router";

const defaultValueState: TaskType = {
    id: "",
    title: "",
    description: "",
    status: TaskStatus.TODO,
};

const defaultErrorState: {
    title?: string | null;
    description?: string | null;
} = {
    title: null,
    description: null,
};

export default function TasksScreen() {
    const { id } = useLocalSearchParams();
    const context = useContext(TaskContext);
    if (!context) return null;

    const { addTask, updateTask, tasks, darkMode } = context;
    const [values, setValues] = useState<TaskType>(defaultValueState);
    const [errors, setErrors] = useState(defaultErrorState);

    const handleInputChange = (key: string, value: string) => {
        setErrors((prev) => ({ ...prev, [key]: null }));
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (!values.title) {
            setErrors((prev) => ({ ...prev, title: "Title is required" }));
            return;
        }
        if (!values.description) {
            setErrors((prev) => ({ ...prev, description: "Description is required" }));
            return;
        }
        if (id) {
            updateTask(id as string, values.title, values.description);
            router.back();
        } else {
            addTask(values.title, values.description);
            router.back();
        }
    };

    useEffect(() => {
        if (id && tasks) {
            const existingTask = tasks.find((task) => task.id === id);
            if (existingTask) {
                setValues(existingTask);
            }
        }
    }, [id, tasks]);
    return (
        <SafeAreaView
            style={[
                styles.container,
            ]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={98}
                style={[styles.keyboardAvoidingContainer, { backgroundColor: darkMode ? Theme.brand.black : Theme.brand.white }]}
            >
                <ThemedView style={styles.container}>
                    <TextInput
                        style={[styles.input, { color: darkMode ? Theme.brand.white : Theme.brand.black }]}
                        placeholder="Title"
                        numberOfLines={1}
                        value={values.title}
                        onChangeText={(text) => handleInputChange("title", text)}
                        placeholderTextColor={Theme.brand.grey}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                        }}
                    />
                    {errors.title && <ThemedText style={{ color: "red" }}>{errors.title}</ThemedText>}
                    <TextInput
                        style={[styles.input, { color: darkMode ? Theme.brand.white : Theme.brand.black }]}
                        placeholder="Description"
                        value={values.description}
                        onChangeText={(text) => handleInputChange("description", text)}
                        placeholderTextColor={Theme.brand.grey}
                        returnKeyType="done"
                        multiline
                        numberOfLines={5}
                    />
                    {errors.description && <ThemedText style={{ color: "red" }}>{errors.description}</ThemedText>}

                    <Button title={id ? "Update a Task" : "Create a Task"} onPress={handleSubmit} />
                </ThemedView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
        padding: 15,
    },
    container: {
        flex: 1,
    },
    input: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: Theme.brand.grey[100],
        borderWidth: 0.5,
        borderColor: Theme.brand.grey,
    },
});
