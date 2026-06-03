import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏡" },
  { name: "Sports", icon: "⚽" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Services", icon: "🛠️" },
];

const FEATURED = [
  { id: "l1", title: "Sony Alpha A7 III", price: 1800, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", location: "San Francisco" },
  { id: "l2", title: "Vintage Leather Jacket", price: 320, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", location: "New York" },
  { id: "l4", title: "Trek FX3 Hybrid Bike", price: 680, image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80", location: "San Francisco" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.subGreeting}>Find your next great deal</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifEmoji}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search listings..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            onFocus={() => router.push("/(tabs)/marketplace")}
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>48,000+ Listings</Text>
            <Text style={styles.bannerSub}>Find anything, anywhere</Text>
            <TouchableOpacity style={styles.bannerBtn} onPress={() => router.push("/(tabs)/marketplace")}>
              <Text style={styles.bannerBtnText}>Browse Now →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🛍️</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.name} style={styles.categoryCard} onPress={() => router.push("/(tabs)/marketplace")}>
              <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Listings</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/marketplace")}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>
        {FEATURED.map((item) => (
          <TouchableOpacity key={item.id} style={styles.listingCard} onPress={() => router.push(`/listings/${item.id}`)}>
            <Image source={{ uri: item.image }} style={styles.listingImage} />
            <View style={styles.listingInfo}>
              <Text style={styles.listingTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.listingLocation}>📍 {item.location}</Text>
              <Text style={styles.listingPrice}>${item.price.toLocaleString()}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  greeting: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  subGreeting: { fontSize: 13, color: "#64748b", marginTop: 2 },
  notifBtn: { position: "relative", width: 40, height: 40, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  notifEmoji: { fontSize: 18 },
  notifDot: { position: "absolute", top: 8, right: 8, width: 8, height: 8, backgroundColor: "#ef4444", borderRadius: 4, borderWidth: 1.5, borderColor: "#fff" },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#0f172a" },
  banner: { marginHorizontal: 16, backgroundColor: "#6366f1", borderRadius: 20, padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  bannerText: { flex: 1 },
  bannerTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  bannerSub: { color: "#c7d2fe", fontSize: 12, marginTop: 4, marginBottom: 12 },
  bannerBtn: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7, alignSelf: "flex-start" },
  bannerBtnText: { color: "#6366f1", fontWeight: "700", fontSize: 12 },
  bannerEmoji: { fontSize: 48, marginLeft: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0f172a", paddingHorizontal: 16, marginBottom: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 16, marginTop: 4 },
  seeAll: { fontSize: 13, color: "#6366f1", fontWeight: "600" },
  categoriesScroll: { marginBottom: 20 },
  categoriesContent: { paddingHorizontal: 16, gap: 10 },
  categoryCard: { alignItems: "center", backgroundColor: "#fff", borderRadius: 14, padding: 14, width: 80, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  categoryEmoji: { fontSize: 24, marginBottom: 6 },
  categoryName: { fontSize: 10, fontWeight: "600", color: "#475569", textAlign: "center" },
  listingCard: { flexDirection: "row", backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12, borderRadius: 16, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  listingImage: { width: 100, height: 100, backgroundColor: "#e2e8f0" },
  listingInfo: { flex: 1, padding: 12, justifyContent: "space-between" },
  listingTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  listingLocation: { fontSize: 11, color: "#64748b" },
  listingPrice: { fontSize: 16, fontWeight: "800", color: "#6366f1" },
});
