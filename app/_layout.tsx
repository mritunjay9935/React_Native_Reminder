import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-reminder"
            options={{
              title: "Add Reminder",
              headerBackTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#fff" },
              headerLeft: () => (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name="arrow-back" size={34} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="edit/[id]"
            options={{
              title: "Edit Reminder",
              headerBackTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#fff" },
              headerLeft: () => (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name="arrow-back" size={34} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
