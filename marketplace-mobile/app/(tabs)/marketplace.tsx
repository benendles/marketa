import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const LISTINGS = [
  { id: "l1", title: "Sony Alpha A7 III Mirrorless Camera", price: 1800, category: "Electronics", condition: "Like New", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", rating: 4.9, saves: 56 },
  { id: "l2", title: "Vintage Leather Jacket – 1970s", price: 320, category: "Fashion", condition: "Good", location: "New York, NY", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", rating: 4.8, saves: 38 },
  { id: "l3", title: "Electric Standing Desk", price: 450, category: "Home & Garden", condition: "Like New", location: "Austin, TX", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", rating: 4.7, saves: 22 },
  { id: "l4", title: "Trek FX3 Hybrid Bike", price: 680, category: "Sports", condition: "Like New", location: "San Francisco, CA", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80", rating: 4.9, saves: 47 },
  { id: "l5", title: "MacBook Pro 14\" M3 Pro", price: 1650, category: "Electronics", condition: "Like New", location: "New York, NY", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", rating: 5.0, saves: 89 },
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
    <SafeAreaView style={styles.container}>
      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search listings..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterEmoji}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Category pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catPill, selectedCat === cat && styles.catPillActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results header */}
      <Text style={styles.resultsText}>{filtered.length} listings found</Text>

      {/* Listings */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/listings/${item.id}`)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardCondition}>{item.condition}</Text>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardLocation} numberOfLines={1}>📍 {item.location}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
                <Text style={styles.cardRating}>★ {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  searchRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#0f172a" },
  filterBtn: { width: 44, height: 44, backgroundColor: "#fff", borderRadius: 14, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  filterEmoji: { fontSize: 18 },
  catScroll: { maxHeight: 44 },
  catContent: { paddingHorizontal: 16, gap: 8, alignItems: "center" },
  catPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
  catPillActive: { backgroundColor: "#6366f1", borderColor: "#6366f1" },
  catText: { fontSize: 13, fontWeight: "600", color: "#64748b" },
  catTextActive: { color: "#fff" },
  resultsText: { fontSize: 12, color: "#64748b", paddingHorizontal: 16, paddingVertical: 8 },
  row: { gap: 12, paddingHorizontal: 16 },
  grid: { paddingBottom: 20 },
  card: { flex: 1, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardImage: { width: "100%", height: 130, backgroundColor: "#e2e8f0" },
  cardBody: { padding: 10 },
  cardCondition: { fontSize: 10, color: "#059669", fontWeight: "700", backgroundColor: "#d1fae5", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, alignSelf: "flex-start", marginBottom: 4 },
  cardTitle: { fontSize: 12, fontWeight: "600", color: "#0f172a", marginBottom: 3 },
  cardLocation: { fontSize: 10, color: "#94a3b8", marginBottom: 6 },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardPrice: { fontSize: 14, fontWeight: "800", color: "#6366f1" },
  cardRating: { fontSize: 11, color: "#f59e0b", fontWeight: "600" },
});
