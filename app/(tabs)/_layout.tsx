import { Ionicons } from "@expo/vector-icons"; // Importa os ícones
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAppContext } from "../context/AppContext";

export default function TabLayout() {
  const { openModal } = useAppContext();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF" }}>
      <Tabs.Screen
        name="Agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Reports"
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="NewAppointment"
        options={{
          title: "Marcar",
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
                shadowColor: "transparent",
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 50,
                marginBottom: 0,
              }}
              activeOpacity={0.7}
              onPress={() => {
                openModal();
              }}
            >
              <Ionicons name="add-circle" size={70} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Services"
        options={{
          title: "Serviços",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cut" : "cut-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Definições",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cog" : "cog-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
