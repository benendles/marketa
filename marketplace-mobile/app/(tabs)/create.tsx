import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = ["Electronics", "Fashion", "Home & Garden", "Sports", "Vehicles", "Services", "Real Estate", "Others"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];

export default function CreateListingScreen() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    Alert.alert("Listing Created!", "Your listing has been posted successfully.", [{ text: "OK", onPress: () => { setStep(1); setTitle(""); setPrice(""); setCategory(""); setCondition(""); setDescription(""); setLocation(""); } }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress */}
      <View style={styles.progressWrap}>
        {[1, 2, 3].map((s) => (
          <View key={s} style={styles.progressItem}>
            <View style={[styles.progressDot, step >= s && styles.progressDotActive]}>
              <Text style={[styles.progressNum, step >= s && styles.progressNumActive]}>{s}</Text>
            </View>
            {s < 3 && <View style={[styles.progressLine, step > s && styles.progressLineActive]} />}
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepTitle}>
          {step === 1 ? "📋 Basic Details" : step === 2 ? "📸 Photos & Category" : "📍 Location & Publish"}
        </Text>

        {step === 1 && (
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Title *</Text>
              <TextInput value={title} onChangeText={setTitle} placeholder="What are you selling?" style={styles.input} placeholderTextColor="#94a3b8" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Price (USD) *</Text>
              <TextInput value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="decimal-pad" style={styles.input} placeholderTextColor="#94a3b8" />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Description *</Text>
              <TextInput value={description} onChangeText={setDescription} placeholder="Describe the item condition, features, etc." multiline numberOfLines={5} style={[styles.input, styles.textarea]} placeholderTextColor="#94a3b8" textAlignVertical="top" />
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.form}>
            {/* Photo upload placeholder */}
            <TouchableOpacity style={styles.photoBox}>
              <Text style={styles.photoEmoji}>📷</Text>
              <Text style={styles.photoLabel}>Tap to add photos</Text>
              <Text style={styles.photoSub}>Up to 8 photos · JPG, PNG</Text>
            </TouchableOpacity>

            <View style={styles.field}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.pillGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity key={cat} style={[styles.pill, category === cat && styles.pillActive]} onPress={() => setCategory(cat)}>
                    <Text style={[styles.pillText, category === cat && styles.pillTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Condition *</Text>
              <View style={styles.pillGrid}>
                {CONDITIONS.map((cond) => (
                  <TouchableOpacity key={cond} style={[styles.pill, condition === cond && styles.pillActive]} onPress={() => setCondition(cond)}>
                    <Text style={[styles.pillText, condition === cond && styles.pillTextActive]}>{cond}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Location *</Text>
              <TextInput value={location} onChangeText={setLocation} placeholder="City, State or Remote" style={styles.input} placeholderTextColor="#94a3b8" />
            </View>

            {/* Summary */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>📋 Listing Summary</Text>
              {[["Title", title || "—"], ["Price", price ? `$${price}` : "—"], ["Category", category || "—"], ["Condition", condition || "—"]].map(([k, v]) => (
                <View key={k} style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>{k}</Text>
                  <Text style={styles.summaryVal}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Nav buttons */}
        <View style={styles.navRow}>
          {step > 1 && (
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextBtn, step === 1 && { marginLeft: "auto" }]}
            onPress={step < 3 ? () => setStep(step + 1) : handleSubmit}
          >
            <Text style={styles.nextBtnText}>{step < 3 ? "Continue →" : "Publish Listing 🚀"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  progressWrap: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 16 },
  progressItem: { flexDirection: "row", alignItems: "center" },
  progressDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#e2e8f0", alignItems: "center", justifyContent: "center" },
  progressDotActive: { backgroundColor: "#6366f1" },
  progressNum: { fontWeight: "700", fontSize: 13, color: "#94a3b8" },
  progressNumActive: { color: "#fff" },
  progressLine: { width: 40, height: 2, backgroundColor: "#e2e8f0" },
  progressLineActive: { backgroundColor: "#6366f1" },
  content: { padding: 16 },
  stepTitle: { fontSize: 20, fontWeight: "800", color: "#0f172a", marginBottom: 20 },
  form: { gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: "700", color: "#475569" },
  input: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#e2e8f0", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0f172a" },
  textarea: { height: 120, paddingTop: 12 },
  photoBox: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#e2e8f0", borderStyle: "dashed", borderRadius: 16, height: 140, alignItems: "center", justifyContent: "center", gap: 6 },
  photoEmoji: { fontSize: 36 },
  photoLabel: { fontSize: 14, fontWeight: "700", color: "#475569" },
  photoSub: { fontSize: 11, color: "#94a3b8" },
  pillGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#e2e8f0" },
  pillActive: { backgroundColor: "#6366f1", borderColor: "#6366f1" },
  pillText: { fontSize: 12, fontWeight: "600", color: "#64748b" },
  pillTextActive: { color: "#fff" },
  summary: { backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#e2e8f0", gap: 10 },
  summaryTitle: { fontSize: 14, fontWeight: "800", color: "#0f172a", marginBottom: 4 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryKey: { fontSize: 13, color: "#64748b" },
  summaryVal: { fontSize: 13, fontWeight: "600", color: "#0f172a" },
  navRow: { flexDirection: "row", gap: 12, marginTop: 24 },
  backBtn: { flex: 1, borderWidth: 1.5, borderColor: "#e2e8f0", backgroundColor: "#fff", borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  backBtnText: { fontSize: 14, fontWeight: "700", color: "#475569" },
  nextBtn: { flex: 1, backgroundColor: "#6366f1", borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  nextBtnText: { fontSize: 14, fontWeight: "700", color: "#fff" },
});
