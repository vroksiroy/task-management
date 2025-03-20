import { TaskContext, TaskProvider } from "@/context/TaskContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading message until fonts load
  }

  return (
    <TaskProvider>
      <RootLayoutWithContext />
    </TaskProvider>
  );
}

function RootLayoutWithContext() {
  const context = useContext(TaskContext);
  if (!context) return <Text>Error: Context not found</Text>;

  const { darkMode } = context;

  return (
    <ThemeProvider value={!darkMode ? DefaultTheme : DarkTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(task)" />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
