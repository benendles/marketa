import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const LISTINGS = [
  { id: "l1", title: "Sony Alpha A7 III Mirrorless Camera", price: 1800, category: "Electronics", condition: "Like New", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", rating: 4.9, reviews: 24 },
  { id: "l2", title: "Vintage Leather Jacket – 1970s Americana", price: 320, category: "Fashion", condition: "Good", location: "New York, NY", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", rating: 4.8, reviews: 18 },
  { id: "l3", title: "Electric Standing Desk – Height Adjustable", price: 450, category: "Home & Garden", condition: "Like New", location: "Austin, TX", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.7, reviews: 11 },
  { id: "l4", title: "Trek FX3 Hybrid Bike – 2022", price: 680, category: "Sports", condition: "Like New", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80", rating: 4.9, reviews: 5 },
  { id: "l5", title: "MacBook Pro 14\" M3 Pro – 2023", price: 1650, category: "Electronics", condition: "Like New", location: "New York, NY", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", rating: 5.0, reviews: 12 },
  { id: "l6", title: "Web Development Service – React & Node.js", price: 85, category: "Services", condition: "N/A", location: "Remote", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80", rating: 4.6, reviews: 290 },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Home & Garden", "Sports", "Services"];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = LISTINGS.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "All" || l.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Search bar */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color="#565959" style={{ marginRight: 6 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Marketa"
            placeholderTextColor="#565959"
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={16} color="#565959" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color="#131921" />
        </TouchableOpacity>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catPill, selectedCat === cat && styles.catPillActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.resultsText}>
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </Text>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/listings/${item.id}`)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= Math.round(item.rating) ? "star" : "star-outline"}
                    size={10}
                    color="#FF9900"
                  />
                ))}
                <Text style={styles.reviewCount}>({item.reviews})</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={10} color="#565959" />
                <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
              </View>
              <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
              <Text style={styles.freeDelivery}>FREE delivery</Text>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View listing</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#131921" },
  searchHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#131921" },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9 },
  searchInput: { flex: 1, fontSize: 14, color: "#0F1111" },
  filterBtn: { width: 40, height: 40, backgroundColor: "#fff", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  catScroll: { backgroundColor: "#232F3E", maxHeight: 46 },
  catContent: { paddingHorizontal: 12, gap: 8, alignItems: "center", paddingVertical: 8 },
  catPill: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 14, backgroundColor: "transparent", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  catPillActive: { backgroundColor: "#FF9900", borderColor: "#FF9900" },
  catText: { fontSize: 12, fontWeight: "600", color: "#ddd" },
  catTextActive: { color: "#131921" },
  resultsText: { fontSize: 12, color: "#565959", paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#EAEDED" },
  row: { gap: 8, paddingHorizontal: 8 },
  grid: { paddingTop: 8, paddingBottom: 24, backgroundColor: "#EAEDED" },
  card: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", marginBottom: 8, overflow: "hidden" },
  cardImage: { width: "100%", height: 140, backgroundColor: "#EAEDED" },
  cardBody: { padding: 8, gap: 3 },
  cardTitle: { fontSize: 12, color: "#0F1111", lineHeight: 16 },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 1, marginTop: 1 },
  reviewCount: { fontSize: 10, color: "#007185", marginLeft: 2 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  cardLocation: { fontSize: 10, color: "#565959", flex: 1 },
  cardPrice: { fontSize: 15, fontWeight: "700", color: "#0F1111", marginTop: 2 },
  freeDelivery: { fontSize: 10, color: "#007185" },
  viewBtn: { marginTop: 6, backgroundColor: "#FFD814", borderRadius: 16, paddingVertical: 5, alignItems: "center", borderWidth: 1, borderColor: "#FCD200" },
  viewBtnText: { fontSize: 11, fontWeight: "700", color: "#0F1111" },
});
