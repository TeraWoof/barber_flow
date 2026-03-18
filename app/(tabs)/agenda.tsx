import { AppointmentForm } from "@/components/appointmentForm";
import Card from "@/components/card";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Agenda() {
  const [appointments, setAppointments] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const appointmentsMockup = [
    {
      id: "1",
      title: "Corte Dêgrade",
      hour: "10:30",
      price: 15,
      date: "20/03/2026",
      contact: "(+351) 991 199 992",
      name: "John Doe",
      status: "pending",
    },
    {
      id: "2",
      title: "Corte Simples",
      hour: "09:00",
      date: "20/02/2026",
      price: 12.99,
      contact: "(+351) 991 199 992",
      name: "John Doe",
      status: "paid",
    },
    {
      id: "3",
      title: "Corte Dêgrade com Barba",
      hour: "09:00",
      date: "20/04/2026",
      price: 15,
      contact: "(+351) 991 199 992",
      name: "John Crist",
      status: "pending",
    },
    {
      id: "4",
      title: "Corte Dêgrade + barba + lavagem",
      hour: "10:30",
      date: "20/04/2026",
      price: 40,
      contact: "(+351) 991 199 992",
      name: "John Doe",
      status: "canceled",
    },
    {
      id: "5",
      title: "Corte Dêgrade",
      hour: "10:30",
      date: "20/04/2026",
      price: 15,
      contact: "(+351) 991 199 992",
      name: "John Doe",
      status: "confirmed",
    },
  ];

  useEffect(() => {
    // Code to fetch appointments from an API or database can be added here

    setPickedDate(new Date()); // Set the default date to today
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    setPickedDate(date);
    const filtered: any = appointmentsMockup.filter((appointment) => {
      const appointmentDate = new Date(
        appointment.date.split("/").reverse().join("-"),
      );
      return appointmentDate.toDateString() === date.toDateString();
    });
    setFilteredAppointments(filtered);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View
        style={{
          padding: 20,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => showDatePicker()}
          style={{
            backgroundColor: "#fefefe",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 5,

            alignItems: "center",
            gap: 5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {pickedDate.toLocaleDateString("pt-PT")}
            </Text>

            <Ionicons name={"calendar"} size={24} color={"#007AFF"} />
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => {
              Alert.alert("Funcionalidade de filtros ainda não implementada.");
            }}
          >
            <Ionicons name="filter" size={16} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 16 }}>Filtros</Text>
          </TouchableOpacity>
        </View>
        <AppointmentForm />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display={"default"}
        />
      </View>
      {filteredAppointments.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#888", textAlign: "center" }}>
            Não há agendamentos para esta data.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAppointments}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            gap: 2,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <Card
              title={item.title}
              hour={item.hour}
              price={item.price}
              contact={item.contact}
              name={item.name}
              status={item.status}
            />
          )}
        />
      )}
    </View>
  );
}
