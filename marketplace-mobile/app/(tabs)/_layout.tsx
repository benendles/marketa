import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: { borderTopWidth: 1, borderTopColor: "#e2e8f0", backgroundColor: "#fff", height: 60, paddingBottom: 8 },
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#0f172a",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} /> }} />
      <Tabs.Screen name="marketplace" options={{ title: "Browse", tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" focused={focused} /> }} />
      <Tabs.Screen name="create" options={{ title: "Sell", tabBarIcon: ({ focused }) => <TabIcon emoji="➕" focused={focused} /> }} />
      <Tabs.Screen name="messages" options={{ title: "Messages", tabBarIcon: ({ focused }) => <TabIcon emoji="💬" focused={focused} />, tabBarBadge: 2 }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: "center", justifyContent: "center", padding: 4, borderRadius: 8 },
  tabIconActive: { backgroundColor: "#eef2ff" },
  emoji: { fontSize: 20 },
});
