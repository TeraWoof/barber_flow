import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppContext } from "@/app/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "react-native";

export const AppointmentForm = () => {
  const { modalVisible, closeModal } = useAppContext();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<"date" | "time" | null>(null);

  const [formData, setFormData] = useState({
    servico: "",
    nome: "",
    contacto: "",
  });

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(null);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.fullScreenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => closeModal()}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Marcação</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nome */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome do Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: João Silva"
              value={formData.nome}
              onChangeText={(val) => setFormData({ ...formData, nome: val })}
            />
          </View>

          {/* Contacto */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contacto</Text>
            <TextInput
              style={styles.input}
              placeholder="912 345 678"
              keyboardType="phone-pad"
              value={formData.contacto}
              onChangeText={(val) =>
                setFormData({ ...formData, contacto: val })
              }
            />
          </View>

          {/* Serviço */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Serviço</Text>
            <TextInput
              style={styles.input}
              placeholder="Corte Degradê, Barba..."
              value={formData.servico}
              onChangeText={(val) => setFormData({ ...formData, servico: val })}
            />
          </View>

          {/* Data e Hora */}
          <Text style={styles.label}>Data e Hora</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowPicker("date")}
            >
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.selectorText}>
                {date.toLocaleDateString("pt-PT")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selector}
              onPress={() => setShowPicker("time")}
            >
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.selectorText}>
                {date.toLocaleTimeString("pt-PT", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={showPicker}
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}

          {/* Botão Confirmar */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              console.log("A enviar:", { ...formData, dataHora: date });
              closeModal();
            }}
          >
            <Text style={styles.saveButtonText}>Confirmar Marcação</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  scrollContent: { padding: 25 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 8 },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#eee",
    color: "#000",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  selector: {
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },
  selectorText: { fontSize: 15, color: "#333" },
  saveButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
