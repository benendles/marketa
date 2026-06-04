import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  { name: "Electronics", icon: "hardware-chip-outline" as const },
  { name: "Fashion", icon: "shirt-outline" as const },
  { name: "Home", icon: "home-outline" as const },
  { name: "Sports", icon: "fitness-outline" as const },
  { name: "Vehicles", icon: "car-outline" as const },
  { name: "Services", icon: "construct-outline" as const },
];

const DEALS = [
  { label: "Up to 40% off", sub: "Electronics", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80" },
  { label: "New arrivals", sub: "Fashion", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  { label: "Best sellers", sub: "Home & Garden", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
];

const FEATURED = [
  { id: "l1", title: "Sony Alpha A7 III Mirrorless Camera", price: 1800, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", location: "San Francisco, CA", rating: 4.9 },
  { id: "l2", title: "Vintage Leather Jacket – 1970s Americana", price: 320, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", location: "New York, NY", rating: 4.8 },
  { id: "l4", title: "Trek FX3 Hybrid Bike – 2022", price: 680, image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80", location: "San Francisco, CA", rating: 4.9 },
  { id: "l5", title: "MacBook Pro 14\" M3 Pro – 2023", price: 1650, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", location: "New York, NY", rating: 5.0 },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* ── Amazon-style header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>
            <Text style={styles.logoText}>marketa</Text>
            <Text style={styles.logoDot}>.com</Text>
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#ccc" />
            <Text style={styles.locationText}>Deliver to United States</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* ── Search bar ── */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => router.push("/(tabs)/marketplace")}
        activeOpacity={0.8}
      >
        <Ionicons name="search-outline" size={18} color="#131921" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search Marketa</Text>
        <View style={styles.searchBtn}>
          <Ionicons name="search" size={18} color="#131921" />
        </View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* ── Deals strip ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsScroll} contentContainerStyle={styles.dealsContent}>
          {DEALS.map((d) => (
            <TouchableOpacity key={d.label} style={styles.dealCard} onPress={() => router.push("/(tabs)/marketplace")}>
              <Image source={{ uri: d.img }} style={styles.dealImage} />
              <Text style={styles.dealLabel}>{d.label}</Text>
              <Text style={styles.dealSub}>{d.sub}</Text>
              <Text style={styles.dealLink}>See all deals</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Sign in prompt ── */}
        <View style={styles.signinBanner}>
          <Text style={styles.signinText}>Sign in for the best experience</Text>
          <TouchableOpacity style={styles.signinBtn} onPress={() => router.push("/auth/login")}>
            <Text style={styles.signinBtnText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* ── Categories ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by category</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/marketplace")}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catContent}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.name} style={styles.catCard} onPress={() => router.push("/(tabs)/marketplace")}>
                <View style={styles.catIconWrap}>
                  <Ionicons name={cat.icon} size={22} color="#131921" />
                </View>
                <Text style={styles.catName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Featured listings ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's deals</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/marketplace")}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredContent}>
            {FEATURED.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() => router.push(`/listings/${item.id}`)}
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productBody}>
                  <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Ionicons key={s} name={s <= Math.round(item.rating) ? "star" : "star-outline"} size={11} color="#FF9900" />
                    ))}
                    <Text style={styles.ratingCount}>({item.rating})</Text>
                  </View>
                  <Text style={styles.productPrice}>${item.price.toLocaleString()}</Text>
                  <Text style={styles.freeDelivery}>FREE delivery</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>View listing</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Sell banner ── */}
        <TouchableOpacity style={styles.sellBanner} onPress={() => router.push("/(tabs)/create")}>
          <View style={styles.sellBannerText}>
            <Text style={styles.sellBannerTitle}>Start selling today</Text>
            <Text style={styles.sellBannerSub}>Post your first listing in 2 minutes</Text>
          </View>
          <View style={styles.sellBannerArrow}>
            <Ionicons name="chevron-forward" size={20} color="#131921" />
          </View>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#131921" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingTop: 6, paddingBottom: 10, backgroundColor: "#131921" },
  headerLeft: { flex: 1 },
  logo: {},
  logoText: { color: "#fff", fontWeight: "900", fontSize: 20, letterSpacing: -0.5 },
  logoDot: { color: "#FF9900", fontWeight: "900", fontSize: 20 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 },
  locationText: { color: "#ccc", fontSize: 11 },
  notifBtn: { position: "relative", padding: 4 },
  notifDot: { position: "absolute", top: 4, right: 4, width: 8, height: 8, backgroundColor: "#CC0C39", borderRadius: 4, borderWidth: 1.5, borderColor: "#131921" },

  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 10, marginBottom: 8, borderRadius: 8, overflow: "hidden" },
  searchIcon: { paddingHorizontal: 10 },
  searchPlaceholder: { flex: 1, fontSize: 14, color: "#565959", paddingVertical: 10 },
  searchBtn: { backgroundColor: "#FF9900", paddingHorizontal: 14, paddingVertical: 11 },

  scroll: { flex: 1, backgroundColor: "#EAEDED" },

  dealsScroll: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#D5D9D9" },
  dealsContent: { padding: 12, gap: 10 },
  dealCard: { width: 130, backgroundColor: "#fff" },
  dealImage: { width: 130, height: 90, borderRadius: 4, backgroundColor: "#EAEDED", marginBottom: 6 },
  dealLabel: { fontSize: 12, fontWeight: "700", color: "#0F1111" },
  dealSub: { fontSize: 11, color: "#565959" },
  dealLink: { fontSize: 11, color: "#007185", marginTop: 2 },

  signinBanner: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", marginTop: 8, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#D5D9D9" },
  signinText: { fontSize: 13, color: "#0F1111", fontWeight: "600", flex: 1 },
  signinBtn: { backgroundColor: "#FFD814", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7, borderWidth: 1, borderColor: "#FCD200" },
  signinBtnText: { fontSize: 13, fontWeight: "700", color: "#0F1111" },

  section: { backgroundColor: "#fff", marginTop: 8, paddingTop: 14, paddingBottom: 4 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#0F1111" },
  seeAll: { fontSize: 13, color: "#007185" },

  catContent: { paddingHorizontal: 14, gap: 12, paddingBottom: 14 },
  catCard: { alignItems: "center", width: 72 },
  catIconWrap: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#EAEDED", alignItems: "center", justifyContent: "center", marginBottom: 6 },
  catName: { fontSize: 10, fontWeight: "600", color: "#0F1111", textAlign: "center" },

  featuredContent: { paddingHorizontal: 14, gap: 10, paddingBottom: 14 },
  productCard: { width: 150, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", borderRadius: 4, overflow: "hidden" },
  productImage: { width: "100%", height: 130, backgroundColor: "#EAEDED" },
  productBody: { padding: 8, gap: 3 },
  productTitle: { fontSize: 12, color: "#0F1111", lineHeight: 16 },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 1 },
  ratingCount: { fontSize: 10, color: "#007185", marginLeft: 3 },
  productPrice: { fontSize: 15, fontWeight: "700", color: "#0F1111" },
  freeDelivery: { fontSize: 10, color: "#007185" },
  addBtn: { margin: 8, backgroundColor: "#FFD814", borderRadius: 20, paddingVertical: 6, alignItems: "center", borderWidth: 1, borderColor: "#FCD200" },
  addBtnText: { fontSize: 11, fontWeight: "700", color: "#0F1111" },

  sellBanner: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginTop: 8, paddingHorizontal: 14, paddingVertical: 16, borderTopWidth: 1, borderTopColor: "#D5D9D9", borderBottomWidth: 1, borderBottomColor: "#D5D9D9" },
  sellBannerText: { flex: 1 },
  sellBannerTitle: { fontSize: 15, fontWeight: "700", color: "#0F1111" },
  sellBannerSub: { fontSize: 12, color: "#565959", marginTop: 2 },
  sellBannerArrow: { width: 32, height: 32, backgroundColor: "#EAEDED", borderRadius: 16, alignItems: "center", justifyContent: "center" },
});
