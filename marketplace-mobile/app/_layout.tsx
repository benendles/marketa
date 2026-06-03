import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/login" options={{ presentation: "modal" }} />
          <Stack.Screen name="auth/register" options={{ presentation: "modal" }} />
          <Stack.Screen name="listings/[id]" options={{ headerShown: true, title: "Listing" }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
