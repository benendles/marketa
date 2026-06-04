import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = ["Electronics", "Fashion", "Home & Garden", "Sports", "Vehicles", "Services", "Real Estate", "Other"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];

const STEP_LABELS = ["Details", "Photos", "Publish"];

export default function CreateListingScreen() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const reset = () => {
    setStep(1); setTitle(""); setPrice(""); setCategory("");
    setCondition(""); setDescription(""); setLocation("");
  };

  const handleSubmit = () => {
    Alert.alert("Listing posted", "Your item is now live on Marketa.", [{ text: "Done", onPress: reset }]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Progress bar */}
      <View style={styles.progressBar}>
        {STEP_LABELS.map((label, idx) => {
          const s = idx + 1;
          const active = step === s;
          const done = step > s;
          return (
            <View key={label} style={styles.stepWrap}>
              <View style={[styles.stepDot, done && styles.stepDone, active && styles.stepActive]}>
                {done
                  ? <Ionicons name="checkmark" size={14} color="#fff" />
                  : <Text style={[styles.stepNum, (active || done) && styles.stepNumActive]}>{s}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
              {idx < STEP_LABELS.length - 1 && (
                <View style={[styles.stepLine, done && styles.stepLineDone]} />
              )}
            </View>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Step 1: Details */}
        {step === 1 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Basic details</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Title *</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="What are you selling?"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Price (USD) *</Text>
              <View style={styles.priceWrap}>
                <Text style={styles.priceDollar}>$</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                  style={[styles.input, styles.priceInput]}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the item — condition, features, included accessories..."
                multiline
                numberOfLines={5}
                placeholderTextColor="#999"
                style={[styles.input, styles.textarea]}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}

        {/* Step 2: Photos & Category */}
        {step === 2 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Photos &amp; category</Text>

            <TouchableOpacity style={styles.photoBox}>
              <View style={styles.photoIconWrap}>
                <Ionicons name="camera-outline" size={28} color="#565959" />
              </View>
              <Text style={styles.photoLabel}>Add photos</Text>
              <Text style={styles.photoSub}>Up to 8 photos · JPG or PNG</Text>
            </TouchableOpacity>

            <View style={styles.field}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.pillGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.pill, category === cat && styles.pillActive]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[styles.pillText, category === cat && styles.pillTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Condition *</Text>
              <View style={styles.pillGrid}>
                {CONDITIONS.map((cond) => (
                  <TouchableOpacity
                    key={cond}
                    style={[styles.pill, condition === cond && styles.pillActive]}
                    onPress={() => setCondition(cond)}
                  >
                    <Text style={[styles.pillText, condition === cond && styles.pillTextActive]}>{cond}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Location & Review */}
        {step === 3 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Location &amp; review</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Location *</Text>
              <View style={styles.locationInput}>
                <Ionicons name="location-outline" size={16} color="#565959" />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="City, State or Remote"
                  placeholderTextColor="#999"
                  style={[styles.input, styles.locationField]}
                />
              </View>
            </View>

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Listing summary</Text>
              {[
                { k: "Title", v: title || "—" },
                { k: "Price", v: price ? `$${price}` : "—" },
                { k: "Category", v: category || "—" },
                { k: "Condition", v: condition || "—" },
                { k: "Location", v: location || "—" },
              ].map(({ k, v }) => (
                <View key={k} style={styles.summaryRow}>
                  <Text style={styles.summaryKey}>{k}</Text>
                  <Text style={styles.summaryVal}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Navigation */}
        <View style={styles.navRow}>
          {step > 1 && (
            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
              <Ionicons name="arrow-back" size={16} color="#565959" />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextBtn, step === 1 && styles.nextBtnFull]}
            onPress={step < 3 ? () => setStep(step + 1) : handleSubmit}
          >
            <Text style={styles.nextBtnText}>{step < 3 ? "Continue" : "Post listing"}</Text>
            {step < 3
              ? <Ionicons name="arrow-forward" size={16} color="#0F1111" />
              : <Ionicons name="checkmark" size={16} color="#0F1111" />
            }
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#EAEDED" },

  progressBar: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#D5D9D9", paddingVertical: 14, paddingHorizontal: 20 },
  stepWrap: { flexDirection: "row", alignItems: "center" },
  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#EAEDED", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#D5D9D9" },
  stepActive: { backgroundColor: "#131921", borderColor: "#131921" },
  stepDone: { backgroundColor: "#10b981", borderColor: "#10b981" },
  stepNum: { fontSize: 12, fontWeight: "700", color: "#565959" },
  stepNumActive: { color: "#fff" },
  stepLabel: { fontSize: 11, color: "#565959", marginLeft: 6, marginRight: 4 },
  stepLabelActive: { color: "#0F1111", fontWeight: "700" },
  stepLine: { width: 28, height: 2, backgroundColor: "#D5D9D9", marginHorizontal: 4 },
  stepLineDone: { backgroundColor: "#10b981" },

  content: { padding: 14, paddingBottom: 40 },
  form: { gap: 18 },
  stepTitle: { fontSize: 18, fontWeight: "800", color: "#0F1111", marginBottom: 4 },

  field: { gap: 6 },
  label: { fontSize: 12, fontWeight: "700", color: "#565959", textTransform: "uppercase", letterSpacing: 0.4 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", borderRadius: 4, paddingHorizontal: 12, paddingVertical: 11, fontSize: 14, color: "#0F1111" },
  textarea: { height: 110, paddingTop: 11 },

  priceWrap: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", borderRadius: 4, overflow: "hidden" },
  priceDollar: { paddingHorizontal: 12, fontSize: 16, color: "#0F1111", fontWeight: "600" },
  priceInput: { flex: 1, borderWidth: 0, borderLeftWidth: 1, borderLeftColor: "#D5D9D9", borderRadius: 0 },

  photoBox: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#D5D9D9", borderStyle: "dashed", borderRadius: 4, height: 120, alignItems: "center", justifyContent: "center", gap: 6 },
  photoIconWrap: { width: 48, height: 48, backgroundColor: "#EAEDED", borderRadius: 24, alignItems: "center", justifyContent: "center" },
  photoLabel: { fontSize: 14, fontWeight: "700", color: "#0F1111" },
  photoSub: { fontSize: 11, color: "#565959" },

  pillGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9" },
  pillActive: { backgroundColor: "#131921", borderColor: "#131921" },
  pillText: { fontSize: 12, fontWeight: "600", color: "#565959" },
  pillTextActive: { color: "#FF9900" },

  locationInput: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", borderRadius: 4, paddingLeft: 10, gap: 6 },
  locationField: { flex: 1, borderWidth: 0, borderRadius: 0 },

  summary: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#D5D9D9", borderRadius: 4, padding: 14, gap: 10 },
  summaryTitle: { fontSize: 13, fontWeight: "800", color: "#0F1111", marginBottom: 2, borderBottomWidth: 1, borderBottomColor: "#f3f3f3", paddingBottom: 8 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryKey: { fontSize: 13, color: "#565959" },
  summaryVal: { fontSize: 13, fontWeight: "600", color: "#0F1111", maxWidth: "60%", textAlign: "right" },

  navRow: { flexDirection: "row", gap: 10, marginTop: 24 },
  backBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderWidth: 1, borderColor: "#D5D9D9", backgroundColor: "#fff", borderRadius: 20, paddingVertical: 13 },
  backBtnText: { fontSize: 14, fontWeight: "600", color: "#565959" },
  nextBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#FFD814", borderRadius: 20, paddingVertical: 13, borderWidth: 1, borderColor: "#FCD200" },
  nextBtnFull: { flex: 1 },
  nextBtnText: { fontSize: 14, fontWeight: "700", color: "#0F1111" },
});
