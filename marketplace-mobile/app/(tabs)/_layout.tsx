import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ORANGE = "#FF9900";
const INACTIVE = "#8d8d8d";
const TAB_BG = "#131921";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, focused }: { name: IconName; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons name={name} size={22} color={focused ? ORANGE : INACTIVE} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: TAB_BG,
          borderTopWidth: 0,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarActiveLabelStyle: { color: ORANGE },
        tabBarInactiveLabelStyle: { color: INACTIVE },
        headerStyle: { backgroundColor: TAB_BG },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "700", color: "#ffffff" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "home" : "home-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "search" : "search-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Sell",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "add-circle" : "add-circle-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarBadge: 2,
          tabBarBadgeStyle: { backgroundColor: "#CC0C39", fontSize: 10 },
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "chatbubbles" : "chatbubbles-outline"} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => <TabIcon name={focused ? "person" : "person-outline"} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 28,
    borderRadius: 6,
  },
  iconWrapActive: {
    backgroundColor: "rgba(255,153,0,0.12)",
  },
});
