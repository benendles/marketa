import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const MENU_ITEMS = [
  { icon: "📅", label: "My Bookings", screen: "/dashboard/bookings" },
  { icon: "📦", label: "My Listings", screen: "/dashboard/listings" },
  { icon: "💬", label: "Messages", screen: "/(tabs)/messages" },
  { icon: "💳", label: "Payments", screen: "/payments" },
  { icon: "⭐", label: "Reviews", screen: "/reviews" },
  { icon: "🔔", label: "Notifications", screen: "/notifications" },
  { icon: "⚙️", label: "Settings", screen: "/settings" },
  { icon: "🆘", label: "Help & Support", screen: "/help" },
];

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile card */}
        <View style={styles.card}>
          <Image source={{ uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" }} style={styles.avatar} />
          <Text style={styles.name}>Jordan Kim</Text>
          <Text style={styles.email}>jordan@example.com</Text>
          <View style={styles.stats}>
            <View style={styles.stat}><Text style={styles.statVal}>4.7 ★</Text><Text style={styles.statLbl}>Rating</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.stat}><Text style={styles.statVal}>43</Text><Text style={styles.statLbl}>Reviews</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.stat}><Text style={styles.statVal}>15</Text><Text style={styles.statLbl}>Listings</Text></View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Verified badge */}
        <View style={styles.verifiedBanner}>
          <Text style={styles.verifiedEmoji}>✅</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.verifiedTitle}>Verified Account</Text>
            <Text style={styles.verifiedSub}>Your identity has been verified</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={item.label} style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn}>
          <Text style={styles.signOutText}>🚪 Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  card: { margin: 16, backgroundColor: "#fff", borderRadius: 20, padding: 20, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#e2e8f0", marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  email: { fontSize: 13, color: "#64748b", marginTop: 2, marginBottom: 16 },
  stats: { flexDirection: "row", width: "100%", borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 16, marginBottom: 16 },
  stat: { flex: 1, alignItems: "center" },
  statVal: { fontSize: 16, fontWeight: "800", color: "#6366f1" },
  statLbl: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#e2e8f0" },
  editBtn: { width: "100%", borderWidth: 1.5, borderColor: "#6366f1", borderRadius: 12, paddingVertical: 10, alignItems: "center" },
  editBtnText: { color: "#6366f1", fontWeight: "700", fontSize: 14 },
  verifiedBanner: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#f0fdf4", marginHorizontal: 16, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#bbf7d0" },
  verifiedEmoji: { fontSize: 24 },
  verifiedTitle: { fontSize: 14, fontWeight: "700", color: "#065f46" },
  verifiedSub: { fontSize: 11, color: "#059669", marginTop: 1 },
  menu: { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  menuIcon: { fontSize: 20, width: 28, textAlign: "center" },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#334155" },
  menuChevron: { fontSize: 20, color: "#cbd5e1" },
  signOutBtn: { marginHorizontal: 16, marginTop: 12, backgroundColor: "#fff", borderRadius: 14, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "#fecaca" },
  signOutText: { fontSize: 14, fontWeight: "700", color: "#ef4444" },
});
