import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const MENU_ITEMS: { icon: IoniconName; label: string; sub?: string }[] = [
  { icon: "calendar-outline", label: "My Bookings", sub: "2 active" },
  { icon: "cube-outline", label: "My Listings", sub: "3 active" },
  { icon: "chatbubbles-outline", label: "Messages", sub: "2 unread" },
  { icon: "card-outline", label: "Payments" },
  { icon: "star-outline", label: "Reviews", sub: "4.7 avg" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "settings-outline", label: "Settings" },
  { icon: "help-circle-outline", label: "Help & Support" },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Jordan Kim</Text>
          <Text style={styles.email}>jordan@example.com</Text>

          <View style={styles.stats}>
            {[
              { val: "4.7", lbl: "Rating" },
              { val: "43", lbl: "Reviews" },
              { val: "15", lbl: "Listings" },
            ].map((s, i, arr) => (
              <View key={s.lbl} style={styles.statGroup}>
                <View style={styles.stat}>
                  <Text style={styles.statVal}>{s.val}</Text>
                  <Text style={styles.statLbl}>{s.lbl}</Text>
                </View>
                {i < arr.length - 1 && <View style={styles.statDivider} />}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        {/* Verified row */}
        <View style={styles.verifiedRow}>
          <View style={styles.verifiedIcon}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.verifiedTitle}>Verified account</Text>
            <Text style={styles.verifiedSub}>Identity confirmed</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#D5D9D9" />
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={18} color="#565959" />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.sub && <Text style={styles.menuSub}>{item.sub}</Text>}
              <Ionicons name="chevron-forward" size={15} color="#D5D9D9" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={() => router.push("/auth/login")}>
          <Ionicons name="log-out-outline" size={18} color="#CC0C39" />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#EAEDED" },

  profileCard: { margin: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", padding: 20, alignItems: "center" },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#EAEDED", marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "800", color: "#0F1111" },
  email: { fontSize: 12, color: "#565959", marginTop: 2, marginBottom: 14 },
  stats: { flexDirection: "row", width: "100%", borderTopWidth: 1, borderTopColor: "#f3f3f3", paddingTop: 14, marginBottom: 14 },
  statGroup: { flex: 1, flexDirection: "row", alignItems: "center" },
  stat: { flex: 1, alignItems: "center" },
  statVal: { fontSize: 16, fontWeight: "800", color: "#0F1111" },
  statLbl: { fontSize: 10, color: "#565959", marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: "#D5D9D9" },
  editBtn: { width: "100%", backgroundColor: "#FFD814", borderRadius: 20, paddingVertical: 9, alignItems: "center", borderWidth: 1, borderColor: "#FCD200" },
  editBtnText: { fontSize: 13, fontWeight: "700", color: "#0F1111" },

  verifiedRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", marginHorizontal: 10, marginTop: 8, borderWidth: 1, borderColor: "#D5D9D9", padding: 14 },
  verifiedIcon: { width: 36, height: 36, backgroundColor: "#f0fdf4", borderRadius: 18, alignItems: "center", justifyContent: "center" },
  verifiedTitle: { fontSize: 13, fontWeight: "700", color: "#065f46" },
  verifiedSub: { fontSize: 11, color: "#565959", marginTop: 1 },

  menuSection: { backgroundColor: "#fff", marginHorizontal: 10, marginTop: 8, borderWidth: 1, borderColor: "#D5D9D9" },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#f3f3f3" },
  menuIconWrap: { width: 32, height: 32, backgroundColor: "#EAEDED", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  menuLabel: { flex: 1, fontSize: 14, color: "#0F1111", fontWeight: "500" },
  menuSub: { fontSize: 11, color: "#007185", marginRight: 4 },

  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginHorizontal: 10, marginTop: 8, backgroundColor: "#fff", borderWidth: 1, borderColor: "#fecaca", borderRadius: 4, paddingVertical: 14 },
  signOutText: { fontSize: 14, fontWeight: "700", color: "#CC0C39" },
});
