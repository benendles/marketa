import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONVERSATIONS = [
  { id: "c1", name: "Alex Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", lastMsg: "Sure, I can do Saturday morning. Does 10am work?", time: "2h ago", unread: 2, online: true, listing: "Sony Alpha A7 III" },
  { id: "c2", name: "Sam Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", lastMsg: "Is the MacBook still available?", time: "1d ago", unread: 0, online: false, listing: "MacBook Pro 14\"" },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
      </View>
      <ScrollView>
        {CONVERSATIONS.map((convo) => (
          <TouchableOpacity key={convo.id} style={styles.row}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: convo.avatar }} style={styles.avatar} />
              {convo.online && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.content}>
              <View style={styles.top}>
                <Text style={styles.name}>{convo.name}</Text>
                <Text style={styles.time}>{convo.time}</Text>
              </View>
              <Text style={styles.listing} numberOfLines={1}>📦 {convo.listing}</Text>
              <View style={styles.bottom}>
                <Text style={[styles.lastMsg, convo.unread > 0 && styles.unreadMsg]} numberOfLines={1}>{convo.lastMsg}</Text>
                {convo.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{convo.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { flexDirection: "row", alignItems: "center", gap: 8, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  badge: { backgroundColor: "#ef4444", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  row: { flexDirection: "row", gap: 12, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  avatarWrap: { position: "relative" },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#e2e8f0" },
  onlineDot: { position: "absolute", bottom: 1, right: 1, width: 12, height: 12, backgroundColor: "#10b981", borderRadius: 6, borderWidth: 2, borderColor: "#fff" },
  content: { flex: 1 },
  top: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  name: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  time: { fontSize: 11, color: "#94a3b8" },
  listing: { fontSize: 11, color: "#6366f1", marginBottom: 3 },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  lastMsg: { fontSize: 13, color: "#64748b", flex: 1 },
  unreadMsg: { fontWeight: "600", color: "#0f172a" },
  unreadBadge: { backgroundColor: "#6366f1", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2, marginLeft: 8 },
  unreadCount: { color: "#fff", fontSize: 11, fontWeight: "700" },
});
