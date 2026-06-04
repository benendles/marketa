import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CONVERSATIONS = [
  {
    id: "c1",
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMsg: "Sure, I can do Saturday morning. Does 10am work?",
    time: "2h ago",
    unread: 2,
    online: true,
    listing: "Sony Alpha A7 III",
  },
  {
    id: "c2",
    name: "Sam Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    lastMsg: "Is the MacBook still available?",
    time: "1d ago",
    unread: 0,
    online: false,
    listing: "MacBook Pro 14\"",
  },
  {
    id: "c3",
    name: "Morgan Taylor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
    lastMsg: "I can offer $580 for the bike, let me know.",
    time: "3d ago",
    unread: 0,
    online: false,
    listing: "Trek FX3 Hybrid Bike",
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        {CONVERSATIONS.some((c) => c.unread > 0) && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0)}
            </Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {CONVERSATIONS.map((convo) => (
          <TouchableOpacity key={convo.id} style={styles.row} activeOpacity={0.7}>
            {/* Avatar */}
            <View style={styles.avatarWrap}>
              <Image source={{ uri: convo.avatar }} style={styles.avatar} />
              {convo.online && <View style={styles.onlineDot} />}
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.top}>
                <Text style={[styles.name, convo.unread > 0 && styles.nameUnread]}>
                  {convo.name}
                </Text>
                <Text style={styles.time}>{convo.time}</Text>
              </View>

              <View style={styles.listingRow}>
                <Ionicons name="cube-outline" size={11} color="#007185" />
                <Text style={styles.listingText} numberOfLines={1}>{convo.listing}</Text>
              </View>

              <View style={styles.bottom}>
                <Text
                  style={[styles.lastMsg, convo.unread > 0 && styles.lastMsgUnread]}
                  numberOfLines={1}
                >
                  {convo.lastMsg}
                </Text>
                {convo.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{convo.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty state hint */}
        <View style={styles.hint}>
          <Ionicons name="chatbubbles-outline" size={32} color="#D5D9D9" />
          <Text style={styles.hintText}>More conversations will appear here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#EAEDED" },
  header: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 14, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#D5D9D9" },
  title: { fontSize: 20, fontWeight: "800", color: "#0F1111" },
  badge: { backgroundColor: "#CC0C39", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  list: { flex: 1 },
  row: { flexDirection: "row", gap: 12, paddingHorizontal: 14, paddingVertical: 14, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f3f3f3" },
  avatarWrap: { position: "relative" },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#EAEDED" },
  onlineDot: { position: "absolute", bottom: 0, right: 0, width: 12, height: 12, backgroundColor: "#10b981", borderRadius: 6, borderWidth: 2, borderColor: "#fff" },
  content: { flex: 1 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  name: { fontSize: 14, fontWeight: "600", color: "#0F1111" },
  nameUnread: { fontWeight: "800" },
  time: { fontSize: 11, color: "#565959" },
  listingRow: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 3 },
  listingText: { fontSize: 11, color: "#007185" },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  lastMsg: { fontSize: 13, color: "#565959", flex: 1 },
  lastMsgUnread: { fontWeight: "600", color: "#0F1111" },
  unreadBadge: { backgroundColor: "#131921", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2, marginLeft: 8 },
  unreadCount: { color: "#FF9900", fontSize: 11, fontWeight: "700" },
  hint: { alignItems: "center", paddingTop: 40, gap: 8 },
  hintText: { fontSize: 13, color: "#565959" },
});
