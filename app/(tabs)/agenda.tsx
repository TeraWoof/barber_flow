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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Code to fetch appointments from an API or database can be added here
    setPickedDate(new Date());
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const dateString = pickedDate.toISOString().split("T")[0].trim();
    setLoading(true);

    try {
      const response = await fetch(
        `http://192.168.1.151:5000/api/barber/appointments/1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ data: dateString }),
        },
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res;
      });

      const result = await response.json();

      if (result.appointments && result.appointments.length > 0) {
        setAppointments(result.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const ConfirmPickedDate = (data: any) => {
    setPickedDate(data);
    hideDatePicker();
  };

  useEffect(() => {
    fetchAppointments();
  }, [pickedDate]);

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
          date={pickedDate}
          onConfirm={(event) => ConfirmPickedDate(event)}
          onCancel={() => hideDatePicker()}
          display={"default"}
        />
      </View>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#888", textAlign: "center" }}>
            A carregar marcações...
          </Text>
        </View>
      )}

      {!loading && appointments.length == 0 && (
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
      )}
      {!loading && appointments.length > 0 && (
        <FlatList
          data={appointments}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            gap: 2,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) => (
            <Card
              title={item.services.service_name}
              hour={item.hour.slice(0, 5)}
              price={item.services.price}
              contact={item.client_contact}
              name={item.client_name}
              status={item.status}
            />
          )}
        />
      )}
    </View>
  );
}
